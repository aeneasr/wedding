import { parse } from "csv-parse/sync";
import { z } from "zod";

import {
  defaultLocale,
  type InvitationMode,
  type Locale,
} from "@/src/lib/constants";

function parseBooleanCell(value: string | undefined) {
  const normalized = (value ?? "").trim().toLowerCase();

  if (!normalized) {
    return false;
  }

  return ["1", "true", "yes", "y"].includes(normalized);
}

const csvRowSchema = z.object({
  invitation_external_id: z.string().trim().min(1),
  primary_email: z.email(),
  invitation_mode: z.enum(["individual", "household"]).default("individual"),
  locale: z.enum(["de"]).default(defaultLocale),
  person_name: z.string().trim().min(1),
  person_email: z.string().trim().optional(),
  person_type: z.enum(["adult", "child"]).default("adult"),
  is_primary: z.boolean().default(false),
});

type InvitationCsvGroup = {
  externalId: string;
  primaryEmail: string;
  invitationMode: InvitationMode;
  locale: Locale;
  invitees: Array<{
    fullName: string;
    email: string | null;
    kind: "adult" | "child";
    isPrimary: boolean;
  }>;
};

export function parseInvitationCsv(content: string) {
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Array<Record<string, string>>;

  const errors: string[] = [];
  const groups = new Map<string, InvitationCsvGroup>();

  records.forEach((record, index) => {
    const parsedRow = csvRowSchema.safeParse({
      invitation_external_id: record.invitation_external_id,
      primary_email: record.primary_email,
      invitation_mode: record.invitation_mode,
      locale: record.locale || defaultLocale,
      person_name: record.person_name,
      person_email: record.person_email,
      person_type: record.person_type || "adult",
      is_primary: parseBooleanCell(record.is_primary),
    });

    if (!parsedRow.success) {
      errors.push(
        `Row ${index + 2}: ${parsedRow.error.issues
          .map((issue) => issue.message)
          .join(", ")}`,
      );
      return;
    }

    const row = parsedRow.data;
    const existing = groups.get(row.invitation_external_id);

    if (
      existing &&
      (existing.primaryEmail !== row.primary_email ||
        existing.invitationMode !== row.invitation_mode ||
        existing.locale !== row.locale)
    ) {
      errors.push(
        `Row ${index + 2}: invitation group ${row.invitation_external_id} has inconsistent shared fields.`,
      );
      return;
    }

    const group =
      existing ??
      ({
        externalId: row.invitation_external_id,
        primaryEmail: row.primary_email,
        invitationMode: row.invitation_mode,
        locale: row.locale,
        invitees: [],
      } satisfies InvitationCsvGroup);

    group.invitees.push({
      fullName: row.person_name,
      email: row.person_email?.trim() ? row.person_email.trim() : null,
      kind: row.person_type,
      isPrimary: row.is_primary || group.invitees.length === 0,
    });

    groups.set(row.invitation_external_id, group);
  });

  const preview = [...groups.values()];

  return {
    groups: preview,
    errors,
    rowCount: records.length,
  };
}
