"use server";

import { timingSafeEqual } from "node:crypto";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { getDb } from "@/src/db";
import { invitations } from "@/src/db/schema";
import { isDatabaseConfigured, getRegistrationCode } from "@/src/lib/env";
import { getDictionary } from "@/src/lib/i18n";
import { clearGuestSession, getStoredGuestLocale } from "@/src/lib/session";
import { validateRegistrationPayload } from "@/src/lib/validation";
import { requireGuestBundle } from "@/src/server/access";
import {
  createInvitationFromRegistration,
  normalizeEmail,
  saveGuestRsvp,
  sendInvitationEmailForInvitation,
  sendRecoveryLinks,
} from "@/src/server/invitations";

export type GuestActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string[]>;
};

function getClientIp(headersList: Headers) {
  const forwardedFor = headersList.get("x-forwarded-for");
  return forwardedFor?.split(",").at(0)?.trim() ?? null;
}

export async function submitRecoveryAction(
  _state: GuestActionState,
  formData: FormData,
): Promise<GuestActionState> {
  const locale = await getStoredGuestLocale();
  const dictionary = getDictionary(locale);

  if (!isDatabaseConfigured()) {
    return {
      error: dictionary.errors.setupBody,
    };
  }

  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return {
      error: dictionary.recover.missingEmail,
    };
  }

  const headersList = await headers();
  await sendRecoveryLinks(email, getClientIp(headersList));

  return {
    success: dictionary.recover.neutralSuccess,
  };
}

export async function saveGuestRsvpAction(
  _state: GuestActionState,
  formData: FormData,
): Promise<GuestActionState> {
  const bundle = await requireGuestBundle();
  const locale = (await getStoredGuestLocale()) ?? bundle.invitation.locale;
  const dictionary = getDictionary(locale);

  const payloadText = String(formData.get("payload") ?? "{}");
  let payloadJson: Record<string, unknown>;
  try {
    payloadJson = JSON.parse(payloadText);
  } catch {
    return { error: "Invalid form payload." };
  }

  const contactPhoneProvided = Object.prototype.hasOwnProperty.call(
    payloadJson,
    "contactPhone",
  );

  const contactPhone = contactPhoneProvided
    ? typeof payloadJson.contactPhone === "string"
      ? payloadJson.contactPhone
      : null
    : undefined;

  const result = await saveGuestRsvp({
    invitationId: bundle.invitation.id,
    payload: payloadJson,
    contactPhone,
  });

  if (!result.ok) {
    return {
      error: result.formError ?? dictionary.guest.saveError,
      fieldErrors: result.fieldErrors,
    };
  }

  return {
    success: dictionary.guest.saved,
  };
}

export async function clearGuestSessionAction() {
  await clearGuestSession();
  redirect("/");
}

export type RegisterActionState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function codesMatch(input: string, expected: string) {
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function registerGuestAction(
  _state: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const code = String(formData.get("code") ?? "");
  if (!codesMatch(code, getRegistrationCode())) {
    return { error: "Invalid code." };
  }

  const payloadText = String(formData.get("payload") ?? "{}");
  let payloadJson: unknown;
  try {
    payloadJson = JSON.parse(payloadText);
  } catch {
    return { error: "Invalid form payload." };
  }

  const validation = validateRegistrationPayload(payloadJson);

  if (!validation.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of validation.error.issues) {
      if (issue.path.length > 0) {
        const key = issue.path.join(".");
        (fieldErrors[key] ??= []).push(issue.message);
      }
    }
    return { error: "Please review the highlighted fields.", fieldErrors };
  }

  const parsed = validation.data;
  const normalizedEmail = normalizeEmail(parsed.primaryEmail);

  const existing = await getDb().query.invitations.findFirst({
    where: eq(invitations.primaryEmail, normalizedEmail),
  });

  const headersList = await headers();
  const clientIp = getClientIp(headersList);

  if (existing) {
    await sendRecoveryLinks(normalizedEmail, clientIp);
    redirect("/register/thanks");
  }

  const { invitationId } = await createInvitationFromRegistration({
    primaryEmail: normalizedEmail,
    contactPhone: parsed.contactPhone,
    roster: parsed.roster,
  });

  await sendInvitationEmailForInvitation(invitationId, "invite_sent");

  redirect("/register/thanks");
}
