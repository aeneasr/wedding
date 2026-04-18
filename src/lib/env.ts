import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  APP_URL: z.string().min(1).optional(),
  APP_SIGNING_SECRET: z.string().min(32).optional(),
  ADMIN_SHARED_PASSWORD_HASH: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  EMAIL_FROM: z.string().min(1).optional(),
  REGISTRATION_CODE: z.string().min(1).optional(),
});

const parsedEnv = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  APP_URL: process.env.APP_URL,
  APP_SIGNING_SECRET: process.env.APP_SIGNING_SECRET,
  ADMIN_SHARED_PASSWORD_HASH: process.env.ADMIN_SHARED_PASSWORD_HASH,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  REGISTRATION_CODE: process.env.REGISTRATION_CODE,
});

export const env = {
  ...parsedEnv,
  APP_URL: parsedEnv.APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000",
};

export function requireConfiguredEnv(key: keyof typeof env): string {
  const value = env[key];

  if (!value) {
    throw new Error(`${key} is not configured.`);
  }

  return value;
}

export function isDatabaseConfigured() {
  return Boolean(env.DATABASE_URL);
}

export function isEmailConfigured() {
  return Boolean(env.RESEND_API_KEY && env.EMAIL_FROM);
}

export function isAdminAuthConfigured() {
  return Boolean(env.ADMIN_SHARED_PASSWORD_HASH && env.APP_SIGNING_SECRET);
}

const DEFAULT_REGISTRATION_CODE = "anna+aeneas";

export function getRegistrationCode() {
  return env.REGISTRATION_CODE ?? DEFAULT_REGISTRATION_CODE;
}
