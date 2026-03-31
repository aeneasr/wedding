import { createHash, createHmac, timingSafeEqual } from "node:crypto";

import { requireConfiguredEnv } from "@/src/lib/env";

function encodeText(value: string) {
  return Buffer.from(value, "utf8");
}

export function hashSha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function safeEqual(left: string, right: string) {
  const leftBuffer = encodeText(left);
  const rightBuffer = encodeText(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function signValue(value: string) {
  return createHmac("sha256", requireConfiguredEnv("APP_SIGNING_SECRET"))
    .update(value)
    .digest("base64url");
}

export function verifySignedValue(value: string, signature: string) {
  return safeEqual(signValue(value), signature);
}

export function hashAdminPassword(password: string) {
  return `sha256:${hashSha256(password)}`;
}

export function verifyAdminPassword(password: string) {
  const expected = requireConfiguredEnv("ADMIN_SHARED_PASSWORD_HASH");

  if (expected.startsWith("sha256:")) {
    return safeEqual(expected, hashAdminPassword(password));
  }

  return safeEqual(expected, password);
}
