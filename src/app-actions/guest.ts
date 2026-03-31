"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { clearGuestSession } from "@/src/lib/session";
import { isDatabaseConfigured } from "@/src/lib/env";
import { requireGuestBundle } from "@/src/server/access";
import { saveGuestRsvp, sendRecoveryLinks } from "@/src/server/invitations";

export type GuestActionState = {
  error?: string;
  success?: string;
};

function getClientIp(headersList: Headers) {
  const forwardedFor = headersList.get("x-forwarded-for");
  return forwardedFor?.split(",").at(0)?.trim() ?? null;
}

export async function submitRecoveryAction(
  _state: GuestActionState,
  formData: FormData,
): Promise<GuestActionState> {
  if (!isDatabaseConfigured()) {
    return {
      error: "The database is not configured yet.",
    };
  }

  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return {
      error: "Enter the email address associated with your invitation.",
    };
  }

  const headersList = await headers();
  await sendRecoveryLinks(email, getClientIp(headersList));

  return {
    success:
      "If that email address matches an existing invitation, a recovery message has been sent.",
  };
}

export async function saveGuestRsvpAction(
  _state: GuestActionState,
  formData: FormData,
): Promise<GuestActionState> {
  const bundle = await requireGuestBundle();
  const eventKey = String(formData.get("eventKey") ?? "") as "event_1" | "event_2";
  const payload = JSON.parse(String(formData.get("payload") ?? "{}"));

  const result = await saveGuestRsvp({
    invitationId: bundle.invitation.id,
    eventKey,
    payload,
  });

  if (!result.ok) {
    return {
      error: result.formError ?? "Unable to save your RSVP right now.",
    };
  }

  return {
    success: "Your RSVP has been saved.",
  };
}

export async function clearGuestSessionAction() {
  await clearGuestSession();
  redirect("/");
}
