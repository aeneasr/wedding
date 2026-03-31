import { describe, expect, it } from "vitest";

import { adminInvitationSchema } from "@/src/lib/validation";

function validInvitation(overrides: Record<string, unknown> = {}) {
  return {
    primaryEmail: "test@example.com",
    invitationMode: "household",
    locale: "en",
    namedGuests: [
      { fullName: "Alice", email: "", kind: "adult", isPrimary: true },
    ],
    event1Invited: true,
    event2Invited: true,
    event2PlusOneAllowed: false,
    event2ChildrenAllowed: false,
    event2MaxChildren: 0,
    ...overrides,
  };
}

describe("adminInvitationSchema", () => {
  it("rejects when no event is selected", () => {
    const result = adminInvitationSchema.safeParse(
      validInvitation({ event1Invited: false, event2Invited: false }),
    );

    expect(result.success).toBe(false);
  });

  it("accepts when only event one is selected", () => {
    const result = adminInvitationSchema.safeParse(
      validInvitation({ event1Invited: true, event2Invited: false }),
    );

    expect(result.success).toBe(true);
  });

  it("accepts when only event two is selected", () => {
    const result = adminInvitationSchema.safeParse(
      validInvitation({ event1Invited: false, event2Invited: true }),
    );

    expect(result.success).toBe(true);
  });

  it("rejects maxChildren > 0 when children not allowed for event two", () => {
    const result = adminInvitationSchema.safeParse(
      validInvitation({
        event2Invited: true,
        event2ChildrenAllowed: false,
        event2MaxChildren: 2,
      }),
    );

    expect(result.success).toBe(false);
  });

  it("accepts maxChildren > 0 when children are allowed for event two", () => {
    const result = adminInvitationSchema.safeParse(
      validInvitation({
        event2Invited: true,
        event2ChildrenAllowed: true,
        event2MaxChildren: 2,
      }),
    );

    expect(result.success).toBe(true);
  });

  it("accepts plus-one and children flags when event two is invited", () => {
    const result = adminInvitationSchema.safeParse(
      validInvitation({
        event2Invited: true,
        event2PlusOneAllowed: true,
        event2ChildrenAllowed: true,
        event2MaxChildren: 3,
      }),
    );

    expect(result.success).toBe(true);
  });

  it("silently accepts plus-one flag when event two not invited (UI prevents this)", () => {
    // The schema doesn't reject this — the UI's disabled checkbox prevents it.
    // This test documents that the schema trusts the UI constraint.
    const result = adminInvitationSchema.safeParse(
      validInvitation({
        event1Invited: true,
        event2Invited: false,
        event2PlusOneAllowed: true,
      }),
    );

    expect(result.success).toBe(true);
  });
});
