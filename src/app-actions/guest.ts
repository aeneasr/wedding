"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { clearGuestSession } from "@/src/lib/session";
import { isDatabaseConfigured } from "@/src/lib/env";
import { getDictionary } from "@/src/lib/i18n";
import { getStoredGuestLocale } from "@/src/lib/session";
import { requireGuestBundle } from "@/src/server/access";
import { saveGuestRsvp, sendRecoveryLinks } from "@/src/server/invitations";

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
