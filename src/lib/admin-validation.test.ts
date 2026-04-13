import { describe, expect, it } from "vitest";

import { adminInvitationSchema } from "@/src/lib/validation";

function validInvitation(overrides: Record<string, unknown> = {}) {
  return {
    primaryEmail: "test@example.com",
    invitationMode: "household",
    locale: "de",
    invitees: [
      { fullName: "Alice", email: "", kind: "adult", isPrimary: true },
      { fullName: "", email: "", kind: "adult", isPrimary: false },
    ],
    ...overrides,
  };
}

describe("adminInvitationSchema", () => {
  it("rejects multiple people on an individual invitation", () => {
    const result = adminInvitationSchema.safeParse(
      validInvitation({
        invitationMode: "individual",
        invitees: [
          { fullName: "Alice", email: "", kind: "adult", isPrimary: true },
          { fullName: "Bob", email: "", kind: "adult", isPrimary: false },
        ],
      }),
    );

    expect(result.success).toBe(false);
  });

  it("accepts blank names for non-primary household rows", () => {
    const result = adminInvitationSchema.safeParse(validInvitation());

    expect(result.success).toBe(true);
  });

  it("rejects a non-adult primary person", () => {
    const result = adminInvitationSchema.safeParse(
      validInvitation({
        invitees: [
          { fullName: "Alice", email: "", kind: "child", isPrimary: true },
        ],
      }),
    );

    expect(result.success).toBe(false);
  });
});
