import { describe, expect, it } from "vitest";

import { parseInvitationCsv } from "@/src/lib/csv";

describe("parseInvitationCsv", () => {
  it("groups rows by primary_email", () => {
    const csv = [
      "primary_email,invitation_mode,locale,person_name,person_email,person_type,is_primary",
      "alex@example.com,household,de,Alex,alex@example.com,adult,true",
      "alex@example.com,household,de,Sam,sam@example.com,adult,false",
    ].join("\n");

    const result = parseInvitationCsv(csv);

    expect(result.errors).toEqual([]);
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0]?.invitees).toHaveLength(2);
  });

  it("reports inconsistent shared group fields", () => {
    const csv = [
      "primary_email,invitation_mode,locale,person_name,person_email,person_type,is_primary",
      "alex@example.com,household,de,Alex,alex@example.com,adult,true",
      "alex@example.com,individual,de,Sam,sam@example.com,adult,false",
    ].join("\n");

    const result = parseInvitationCsv(csv);

    expect(result.errors[0]).toContain("inconsistent");
  });
});
