import { createHash } from 'crypto';
import { headers } from 'next/headers';
import {
  doc,
  getFirestore,
  runTransaction,
  Timestamp,
} from 'firebase/firestore';

import { firebaseApp } from '@/lib/firebase';

/**
 * Identifies the caller without storing their IP.
 *
 * On Vercel the client IP is the first entry of `x-forwarded-for`; the rest of
 * the chain is proxy hops and must be ignored, otherwise the key changes between
 * requests. Falls back to a shared bucket when no IP is available, which is
 * strict rather than permissive.
 */
const getClientKey = async (): Promise<string> => {
  const headerList = await headers();
  const forwarded = headerList.get('x-forwarded-for');
  const ip =
    forwarded?.split(',')[0]?.trim() ||
    headerList.get('x-real-ip')?.trim() ||
    'unknown';

  return createHash('sha256').update(ip).digest('hex').slice(0, 32);
};

export interface RateLimitOptions {
  /** Firestore collection holding the durable counters. */
  collection: string;
  /** Requests permitted per window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Milliseconds until the window resets; 0 when allowed. */
  retryAfterMs: number;
}

interface Bucket {
  count: number;
  windowStart: number;
}

/**
 * Per-instance counters. Survives only as long as the serverless instance, so it
 * cannot be the whole story, but it needs no permissions and always works.
 */
const memoryBuckets = new Map<string, Bucket>();

const pruneMemory = (now: number, windowMs: number) => {
  for (const [key, bucket] of memoryBuckets) {
    if (now - bucket.windowStart >= windowMs) memoryBuckets.delete(key);
  }
};

const checkMemory = (
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult => {
  const now = Date.now();
  pruneMemory(now, windowMs);

  const bucket = memoryBuckets.get(key);
  if (!bucket || now - bucket.windowStart >= windowMs) {
    memoryBuckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, retryAfterMs: 0 };
  }
  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfterMs: Math.max(0, bucket.windowStart + windowMs - now),
    };
  }
  bucket.count += 1;
  return { allowed: true, retryAfterMs: 0 };
};

/** Logged once per process so a missing rule does not spam the logs. */
let firestoreLimiterWarned = false;

const checkFirestore = async (
  key: string,
  collectionName: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult | undefined> => {
  const db = getFirestore(firebaseApp);
  const ref = doc(db, collectionName, key);

  try {
    return await runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(ref);
      const now = Date.now();

      const data = snapshot.exists() ? snapshot.data() : undefined;
      const windowStart =
        data?.windowStart instanceof Timestamp
          ? data.windowStart.toMillis()
          : undefined;
      const count = typeof data?.count === 'number' ? data.count : 0;

      if (windowStart === undefined || now - windowStart >= windowMs) {
        transaction.set(ref, {
          count: 1,
          windowStart: Timestamp.fromMillis(now),
        });
        return { allowed: true, retryAfterMs: 0 };
      }

      if (count >= limit) {
        return {
          allowed: false,
          retryAfterMs: Math.max(0, windowStart + windowMs - now),
        };
      }

      transaction.set(ref, {
        count: count + 1,
        windowStart: Timestamp.fromMillis(windowStart),
      });
      return { allowed: true, retryAfterMs: 0 };
    });
  } catch (error) {
    if (!firestoreLimiterWarned) {
      firestoreLimiterWarned = true;
      console.warn(
        `[rate-limit] Firestore counter unavailable for "${collectionName}", ` +
          'falling back to the in-memory limiter only. Deploy firestore.rules ' +
          'to enable durable, cross-instance limiting.',
        error,
      );
    }
    return undefined;
  }
};

/**
 * Fixed-window rate limiter, checked in two layers.
 *
 * The in-memory layer always applies and needs no permissions. The Firestore
 * layer adds durability across the short-lived, horizontally scaled instances a
 * server action runs on, where a per-instance counter resets on every cold start
 * and is not shared between concurrent instances.
 *
 * If Firestore is unreachable or its security rules do not grant access to the
 * counter collection, the in-memory verdict stands: reduced protection rather
 * than an unusable contact form.
 */
export const checkRateLimit = async ({
  collection: collectionName,
  limit,
  windowMs,
}: RateLimitOptions): Promise<RateLimitResult> => {
  const key = await getClientKey();

  const memory = checkMemory(key, limit, windowMs);
  if (!memory.allowed) return memory;

  const durable = await checkFirestore(key, collectionName, limit, windowMs);
  return durable ?? memory;
};
