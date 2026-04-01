import { describe, expect, it } from "vitest";

import { parseInvitationCsv } from "@/src/lib/csv";

describe("parseInvitationCsv", () => {
  it("groups rows by invitation_external_id", () => {
    const csv = [
      "invitation_external_id,primary_email,invitation_mode,locale,person_name,person_email,person_type,is_primary",
      "family-one,alex@example.com,household,en,Alex,alex@example.com,adult,true",
      "family-one,alex@example.com,household,en,Sam,sam@example.com,adult,false",
    ].join("\n");

    const result = parseInvitationCsv(csv);

    expect(result.errors).toEqual([]);
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0]?.invitees).toHaveLength(2);
  });

  it("reports inconsistent shared group fields", () => {
    const csv = [
      "invitation_external_id,primary_email,invitation_mode,locale,person_name,person_email,person_type,is_primary",
      "family-one,alex@example.com,household,en,Alex,alex@example.com,adult,true",
      "family-one,other@example.com,household,en,Sam,sam@example.com,adult,false",
    ].join("\n");

    const result = parseInvitationCsv(csv);

    expect(result.errors[0]).toContain("inconsistent");
  });
});
