"use server";

import { redirect } from "next/navigation";

import { parseInvitationCsv } from "@/src/lib/csv";
import { isAdminAuthConfigured, isDatabaseConfigured } from "@/src/lib/env";
import { verifyAdminPassword } from "@/src/lib/crypto";
import { clearAdminSession, setAdminSession } from "@/src/lib/session";
import { adminInvitationSchema, namedGuestInputSchema } from "@/src/lib/validation";
import { requireAdminSession } from "@/src/server/access";
import type { EventKey } from "@/src/lib/constants";
import {
  saveGuestRsvp,
  saveInvitation,
  sendInvitationEmailForInvitation,
  upsertInvitationsFromImport,
} from "@/src/server/invitations";

export type AdminActionState = {
  error?: string;
  success?: string;
};

export type ImportPreviewState = {
  error?: string;
  info?: string;
  previewPayload?: string;
  preview?: Array<{
    externalId: string;
    primaryEmail: string;
    invitationMode: string;
    locale: string;
    people: Array<{
      fullName: string;
      email: string | null;
      kind: string;
      isPrimary: boolean;
    }>;
    event1Invited: boolean;
    event2Invited: boolean;
    event2PlusOneAllowed: boolean;
    event2ChildrenAllowed: boolean;
    event2MaxChildren: number;
  }>;
  errors?: string[];
};

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1" || value === "yes";
}

function parseNamedGuests(raw: string) {
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line, index) => {
    const [name, email = "", kind = "adult", primary = ""] = line
      .split("|")
      .map((part) => part.trim());

    return namedGuestInputSchema.parse({
      fullName: name,
      email,
      kind: kind || "adult",
      isPrimary:
        primary.toLowerCase() === "primary" ||
        primary.toLowerCase() === "true" ||
        index === 0,
    });
  });
}

export async function loginAdminAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  if (!isDatabaseConfigured() || !isAdminAuthConfigured()) {
    return {
      error: "Admin authentication is not configured yet.",
    };
  }

  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    return {
      error: "The shared password was not accepted.",
    };
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin");
}

export async function saveInvitationAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdminSession();

  let invitationId: string;

  try {
    const namedGuests = parseNamedGuests(String(formData.get("namedGuests") ?? ""));
    const validated = adminInvitationSchema.parse({
      primaryEmail: String(formData.get("primaryEmail") ?? ""),
      invitationMode: String(formData.get("invitationMode") ?? "individual"),
      locale: String(formData.get("locale") ?? "en"),
      namedGuests,
      event1Invited: parseBoolean(formData.get("event1Invited")),
      event2Invited: parseBoolean(formData.get("event2Invited")),
      event2PlusOneAllowed: parseBoolean(formData.get("event2PlusOneAllowed")),
      event2ChildrenAllowed: parseBoolean(formData.get("event2ChildrenAllowed")),
      event2MaxChildren: Number(formData.get("event2MaxChildren") ?? 0),
    });

    invitationId = await saveInvitation({
      id: String(formData.get("id") ?? "") || undefined,
      externalId: String(formData.get("externalId") ?? "") || null,
      ...validated,
      namedGuests: validated.namedGuests.map((guest) => ({
        ...guest,
        email: guest.email || null,
      })),
    });
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Unable to save the invitation.",
    };
  }

  redirect(`/admin/invitations/${invitationId}?saved=1`);
}

async function loadCsvInput(formData: FormData) {
  const csvText = String(formData.get("csvText") ?? "").trim();
  const csvFile = formData.get("csvFile");

  if (csvText) {
    return csvText;
  }

  if (csvFile instanceof File && csvFile.size > 0) {
    return csvFile.text();
  }

  return "";
}

export async function previewImportAction(
  _state: ImportPreviewState,
  formData: FormData,
): Promise<ImportPreviewState> {
  await requireAdminSession();

  try {
    const csv = await loadCsvInput(formData);

    if (!csv) {
      return {
        error: "Paste CSV content or choose a CSV file.",
      };
    }

    const preview = parseInvitationCsv(csv);

    return {
      info: `Parsed ${preview.rowCount} rows.`,
      errors: preview.errors,
      preview: preview.groups,
      previewPayload: JSON.stringify(preview.groups),
    };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Unable to parse the CSV import.",
    };
  }
}

export async function commitImportAction(formData: FormData) {
  await requireAdminSession();

  const rawPayload = String(formData.get("previewPayload") ?? "");

  if (!rawPayload) {
    redirect("/admin/import?error=missing-preview");
  }

  const payload = JSON.parse(rawPayload) as ImportPreviewState["preview"];

  if (!payload || payload.length === 0) {
    redirect("/admin/import?error=empty-preview");
  }

  await upsertInvitationsFromImport(
    payload.map((group) => ({
      externalId: group.externalId,
      primaryEmail: group.primaryEmail,
      invitationMode: group.invitationMode as "individual" | "household",
      locale: group.locale as "en" | "de",
      namedGuests: group.people.map((person) => ({
        fullName: person.fullName,
        email: person.email,
        kind: person.kind as "adult" | "child",
        isPrimary: person.isPrimary,
      })),
      event1Invited: group.event1Invited,
      event2Invited: group.event2Invited,
      event2PlusOneAllowed: group.event2PlusOneAllowed,
      event2ChildrenAllowed: group.event2ChildrenAllowed,
      event2MaxChildren: group.event2MaxChildren,
    })),
  );

  redirect("/admin?imported=1");
}

export async function sendInvitationAction(formData: FormData) {
  await requireAdminSession();

  const invitationId = String(formData.get("invitationId") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/admin");
  const resend = parseBoolean(formData.get("resend"));

  if (!invitationId) {
    redirect(redirectTo);
  }

  await sendInvitationEmailForInvitation(
    invitationId,
    resend ? "invite_resent" : "invite_sent",
  );

  redirect(redirectTo);
}

export async function saveAdminRsvpAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdminSession();

  const invitationId = String(formData.get("invitationId") ?? "");
  const eventKey = String(formData.get("eventKey") ?? "") as EventKey;
  const payload = JSON.parse(String(formData.get("payload") ?? "{}"));

  const result = await saveGuestRsvp({
    invitationId,
    eventKey,
    payload,
    skipEmail: true,
  });

  if (!result.ok) {
    return {
      error: result.formError ?? "Unable to save the RSVP.",
    };
  }

  return {
    success: `RSVP saved as ${result.status}.`,
  };
}
