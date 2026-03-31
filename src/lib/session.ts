import { cookies } from "next/headers";

import {
  adminCookieName,
  guestCookieName,
  guestLocaleCookieName,
  type Locale,
} from "@/src/lib/constants";
import { signValue, verifySignedValue } from "@/src/lib/crypto";

type SignedTokenPayload = Record<string, string | number | boolean | null>;

type GuestSession = {
  invitationId: string;
  tokenVersion: number;
  issuedAt: number;
};

type AdminSession = {
  issuedAt: number;
};

function encodePayload(payload: SignedTokenPayload) {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = signValue(body);

  return `${body}.${signature}`;
}

function decodePayload<T extends SignedTokenPayload>(value?: string | null) {
  if (!value) {
    return null;
  }

  const [body, signature] = value.split(".");

  if (!body || !signature || !verifySignedValue(body, signature)) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

function getCookieOptions(httpOnly = true) {
  return {
    httpOnly,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  };
}

export async function setGuestSession(invitationId: string, tokenVersion: number) {
  const store = await cookies();

  store.set(
    guestCookieName,
    encodePayload({
      invitationId,
      tokenVersion,
      issuedAt: Date.now(),
    }),
    getCookieOptions(),
  );
}

export async function clearGuestSession() {
  const store = await cookies();
  store.delete(guestCookieName);
}

export async function getGuestSession() {
  const store = await cookies();
  return decodePayload<GuestSession>(store.get(guestCookieName)?.value);
}

export async function setAdminSession() {
  const store = await cookies();

  store.set(
    adminCookieName,
    encodePayload({
      issuedAt: Date.now(),
    }),
    getCookieOptions(),
  );
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(adminCookieName);
}

export async function getAdminSession() {
  const store = await cookies();
  return decodePayload<AdminSession>(store.get(adminCookieName)?.value);
}

export async function setGuestLocale(locale: Locale) {
  const store = await cookies();

  store.set(
    guestLocaleCookieName,
    locale,
    getCookieOptions(false),
  );
}

export async function getStoredGuestLocale() {
  const store = await cookies();
  return store.get(guestLocaleCookieName)?.value as Locale | undefined;
}
