'use server';

import { addDoc, collection, getFirestore } from 'firebase/firestore';

import { firebaseApp } from '@/lib/firebase';
import { checkRateLimit } from '@/lib/rate-limit';
import { ContactFormDataType, contactSchema } from '@/schemas/contactSchema';

/** 3 submissions per 10 minutes from the same client. */
const RATE_LIMIT = { limit: 3, windowMs: 10 * 60 * 1000 };

export interface SaveContactResult {
  success: boolean;
  /** Translation key describing the failure, absent on success. */
  error?: string;
}

/**
 * Persists a contact submission.
 *
 * Returns a result object rather than throwing: Next.js redacts server action
 * error messages in production, so a thrown `Error('rate_limit_error')` would
 * reach the client as an opaque digest and the form could only ever show a
 * generic failure.
 */
const saveContact = async (
  data: ContactFormDataType,
): Promise<SaveContactResult> => {
  // A server action is a public HTTP endpoint, so the client-side resolver can
  // be bypassed entirely. Validate again here.
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: 'global_error' };
  }

  const { allowed } = await checkRateLimit({
    collection: 'contact_rate_limits',
    ...RATE_LIMIT,
  });
  if (!allowed) {
    return { success: false, error: 'rate_limit_error' };
  }

  try {
    const db = getFirestore(firebaseApp);
    // A single addDoc is enough. This previously ran addDoc followed by setDoc
    // on the same ref, which wrote the identical document twice.
    await addDoc(collection(db, 'contacts'), {
      ...parsed.data,
      createdAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error('[saveContact] failed to persist submission:', error);
    return { success: false, error: 'global_error' };
  }
};

export default saveContact;
