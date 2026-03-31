import { describe, expect, it } from "vitest";

import { parseInvitationCsv } from "@/src/lib/csv";

describe("parseInvitationCsv", () => {
  it("groups rows by invitation_external_id", () => {
    const csv = [
      "invitation_external_id,primary_email,invitation_mode,locale,person_name,person_email,person_type,is_primary,event_1_invited,event_2_invited,event_2_plus_one_allowed,event_2_children_allowed,event_2_max_children",
      "family-one,alex@example.com,household,en,Alex,alex@example.com,adult,true,true,true,false,true,2",
      "family-one,alex@example.com,household,en,Sam,sam@example.com,adult,false,true,true,false,true,2",
    ].join("\n");

    const result = parseInvitationCsv(csv);

    expect(result.errors).toEqual([]);
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0]?.people).toHaveLength(2);
    expect(result.groups[0]?.event2ChildrenAllowed).toBe(true);
  });

  it("reports inconsistent shared group fields", () => {
    const csv = [
      "invitation_external_id,primary_email,invitation_mode,locale,person_name,person_email,person_type,is_primary,event_1_invited,event_2_invited,event_2_plus_one_allowed,event_2_children_allowed,event_2_max_children",
      "family-one,alex@example.com,household,en,Alex,alex@example.com,adult,true,true,false,false,false,0",
      "family-one,other@example.com,household,en,Sam,sam@example.com,adult,false,true,false,false,false,0",
    ].join("\n");

    const result = parseInvitationCsv(csv);

    expect(result.errors[0]).toContain("inconsistent");
  });
});
