import { parse } from "csv-parse/sync";
import { z } from "zod";

import {
  defaultLocale,
  maxChildrenPerInvitation,
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
  locale: z.enum(["en", "de"]).default(defaultLocale),
  person_name: z.string().trim().min(1),
  person_email: z.string().trim().optional(),
  person_type: z.enum(["adult", "child"]).default("adult"),
  is_primary: z.boolean().default(false),
  event_1_invited: z.boolean().default(false),
  event_2_invited: z.boolean().default(false),
  event_2_plus_one_allowed: z.boolean().default(false),
  event_2_children_allowed: z.boolean().default(false),
  event_2_max_children: z.number().int().min(0).max(maxChildrenPerInvitation).default(0),
});

type InvitationCsvGroup = {
  externalId: string;
  primaryEmail: string;
  invitationMode: InvitationMode;
  locale: Locale;
  people: Array<{
    fullName: string;
    email: string | null;
    kind: "adult" | "child";
    isPrimary: boolean;
  }>;
  event1Invited: boolean;
  event2Invited: boolean;
  event2PlusOneAllowed: boolean;
  event2ChildrenAllowed: boolean;
  event2MaxChildren: number;
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
      event_1_invited: parseBooleanCell(record.event_1_invited),
      event_2_invited: parseBooleanCell(record.event_2_invited),
      event_2_plus_one_allowed: parseBooleanCell(record.event_2_plus_one_allowed),
      event_2_children_allowed: parseBooleanCell(record.event_2_children_allowed),
      event_2_max_children: Number(record.event_2_max_children || 0),
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
        people: [],
        event1Invited: row.event_1_invited,
        event2Invited: row.event_2_invited,
        event2PlusOneAllowed: row.event_2_plus_one_allowed,
        event2ChildrenAllowed: row.event_2_children_allowed,
        event2MaxChildren: row.event_2_max_children,
      } satisfies InvitationCsvGroup);

    group.people.push({
      fullName: row.person_name,
      email: row.person_email?.trim() ? row.person_email.trim() : null,
      kind: row.person_type,
      isPrimary: row.is_primary || group.people.length === 0,
    });

    groups.set(row.invitation_external_id, group);
  });

  const preview = [...groups.values()];

  preview.forEach((group) => {
    if (!group.event1Invited && !group.event2Invited) {
      errors.push(`Invitation ${group.externalId} does not include any events.`);
    }
  });

  return {
    groups: preview,
    errors,
    rowCount: records.length,
  };
}
