import { describe, expect, it } from "vitest";

import {
  buildInvitationSignature,
  verifyInvitationSignature,
} from "@/src/lib/urls";

describe("invitation signatures", () => {
  it("validates the current invitation signature", () => {
    const signature = buildInvitationSignature("invitation-123", 1);

    expect(
      verifyInvitationSignature("invitation-123", 1, signature),
    ).toBe(true);
    expect(
      verifyInvitationSignature("invitation-123", 2, signature),
    ).toBe(false);
  });
});
