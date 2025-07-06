import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']),
    API_URL: z.string().min(1),
    APP_URL: z.string().min(1),
    FIREBASE_API_KEY: z.string().min(1),
    FIREBASE_AUTH_DOMAIN: z.string().min(1),
    FIREBASE_DATABASE_URL: z.string().min(1),
    FIREBASE_PROJECT_ID: z.string().min(1),
    FIREBASE_STORAGE_BUCKET: z.string().min(1),
    FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
    FIREBASE_APP_ID: z.string().min(1),
    FIREBASE_MEASUREMENT_ID: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url().min(1),
    NEXT_PUBLIC_APP_URL: z.string().url().min(1),
    NEXT_PUBLIC_PERSONAL_EMAIL: z.string().email().min(1),
    NEXT_PUBLIC_PERSONAL_LOCATION_EN: z.string().min(1),
    NEXT_PUBLIC_PERSONAL_LOCATION_BR: z.string().min(1),
    NEXT_PUBLIC_SITE_URL: z.string().url().min(1),
    NEXT_PUBLIC_GITHUB_URL: z.string().url().min(1),
    NEXT_PUBLIC_LINKEDIN_URL: z.string().url().min(1),
    NEXT_PUBLIC_INSTAGRAM_URL: z.string().url().min(1),
    NEXT_PUBLIC_INSPIRATION_FIGMA_URL: z.string().url().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_PERSONAL_EMAIL: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
    NEXT_PUBLIC_PERSONAL_LOCATION_EN:
      process.env.NEXT_PUBLIC_PERSONAL_LOCATION_EN,
    NEXT_PUBLIC_PERSONAL_LOCATION_BR:
      process.env.NEXT_PUBLIC_PERSONAL_LOCATION_BR,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
    NEXT_PUBLIC_LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    NEXT_PUBLIC_INSTAGRAM_URL: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    NEXT_PUBLIC_INSPIRATION_FIGMA_URL:
      process.env.NEXT_PUBLIC_INSPIRATION_FIGMA_URL,
  },
});
