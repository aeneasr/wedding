"use server";

import { redirect } from "next/navigation";

import { parseInvitationCsv } from "@/src/lib/csv";
import { defaultLocale } from "@/src/lib/constants";
import { isAdminAuthConfigured, isDatabaseConfigured } from "@/src/lib/env";
import { verifyAdminPassword } from "@/src/lib/crypto";
import { clearAdminSession, setAdminSession } from "@/src/lib/session";
import { adminInvitationSchema } from "@/src/lib/validation";
import { requireAdminSession } from "@/src/server/access";
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
    primaryEmail: string;
    invitationMode: string;
    locale: string;
    invitees: Array<{
      fullName: string;
      email: string | null;
      kind: string;
      isPrimary: boolean;
    }>;
  }>;
  errors?: string[];
};

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1" || value === "yes";
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
    const invitees = JSON.parse(
      String(formData.get("inviteesPayload") ?? "[]"),
    ) as Array<{
      fullName: string;
      kind: "adult" | "child";
      isPrimary: boolean;
    }>;
    const validated = adminInvitationSchema.parse({
      primaryEmail: String(formData.get("primaryEmail") ?? ""),
      invitationMode: String(formData.get("invitationMode") ?? "individual"),
      locale: String(formData.get("locale") ?? defaultLocale),
      invitees,
    });

    invitationId = await saveInvitation({
      id: String(formData.get("id") ?? "") || undefined,
      ...validated,
      invitees: validated.invitees.map((invitee) => ({
        ...invitee,
        email: null,
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
      primaryEmail: group.primaryEmail,
      invitationMode: group.invitationMode as "individual" | "household",
      locale: group.locale as "de",
      invitees: group.invitees.map((invitee) => ({
        fullName: invitee.fullName,
        email: invitee.email,
        kind: invitee.kind as "adult" | "child",
        isPrimary: invitee.isPrimary,
      })),
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
  const payload = JSON.parse(String(formData.get("payload") ?? "{}"));

  const result = await saveGuestRsvp({
    invitationId,
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
