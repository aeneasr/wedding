import { describe, expect, it } from "vitest";

import { validateGuestRsvpPayload, validateRegistrationPayload } from "@/src/lib/validation";

describe("validateGuestRsvpPayload", () => {
  it("accepts attending adult without phone number", () => {
    const result = validateGuestRsvpPayload({
      invitees: [
        {
          inviteeId: "7d5aaf64-fac2-4ed0-b2e2-6771c0b9c749",
          fullName: "Alex Rivera",
          kind: "adult",
          isPrimary: true,
          attending: true,
          dietaryRequirements: "",
        },
      ],
    });

    expect(result.success).toBe(true);
  });

  it("accepts a full household response", () => {
    const result = validateGuestRsvpPayload({
      invitees: [
        {
          inviteeId: "7d5aaf64-fac2-4ed0-b2e2-6771c0b9c749",
          fullName: "Alex Rivera",
          kind: "adult",
          isPrimary: true,
          attending: true,
          dietaryRequirements: "vegetarian",
        },
        {
          inviteeId: "11111111-1111-4111-8111-111111111111",
          fullName: "Sam Rivera",
          kind: "adult",
          isPrimary: false,
          attending: true,
          dietaryRequirements: "",
        },
        {
          inviteeId: "22222222-2222-4222-8222-222222222222",
          fullName: "Max Rivera",
          kind: "child",
          isPrimary: false,
          attending: true,
          dietaryRequirements: "meat",
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});

describe("validateRegistrationPayload", () => {
  it("accepts a solo registration with no phone", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster: [
        {
          fullName: "Alex Rivera",
          kind: "adult",
          attending: true,
          dietaryRequirements: "meat",
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("accepts a household registration with phone and dietary choices", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: " +49 30 1234567 ",
      roster: [
        { fullName: "Alex Rivera", kind: "adult", attending: true, dietaryRequirements: "vegetarian" },
        { fullName: "Sam Rivera", kind: "adult", attending: true, dietaryRequirements: "meat" },
        { fullName: "Mia Rivera", kind: "child", attending: true, dietaryRequirements: "vegetarian" },
      ],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.contactPhone).toBe("+49 30 1234567");
    }
  });

  it("rejects an invalid primary email", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "not-an-email",
      contactPhone: "",
      roster: [{ fullName: "Alex", kind: "adult", attending: true, dietaryRequirements: "meat" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty roster", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects a roster over maxHouseholdMembers", () => {
    const roster = Array.from({ length: 11 }, (_, i) => ({
      fullName: `Person ${i}`,
      kind: "adult" as const,
      attending: true,
      dietaryRequirements: "meat" as const,
    }));
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster,
    });
    expect(result.success).toBe(false);
  });

  it("rejects when the first roster row is not an adult", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster: [
        { fullName: "Mia Rivera", kind: "child", attending: true, dietaryRequirements: "meat" },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("rejects whitespace-only names", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster: [
        { fullName: "   ", kind: "adult", attending: true, dietaryRequirements: "meat" },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("rejects phone numbers longer than 40 chars", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "x".repeat(41),
      roster: [
        { fullName: "Alex", kind: "adult", attending: true, dietaryRequirements: "meat" },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("rejects an attending entry with no dietary preference", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster: [
        { fullName: "Alex Rivera", kind: "adult", attending: true, dietaryRequirements: "" },
      ],
    });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(
      result.error.issues.some(
        (issue) => issue.path.join(".") === "roster.0.dietaryRequirements",
      ),
    ).toBe(true);
  });

  it("rejects when an attending additional person has no dietary preference", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster: [
        { fullName: "Alex", kind: "adult", attending: true, dietaryRequirements: "meat" },
        { fullName: "Sam", kind: "adult", attending: true, dietaryRequirements: "" },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("accepts a not-attending entry with empty dietary", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster: [
        {
          fullName: "Alex Rivera",
          kind: "adult",
          attending: false,
          dietaryRequirements: "",
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("accepts a mixed roster: primary attending, others declined", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster: [
        { fullName: "Alex", kind: "adult", attending: true, dietaryRequirements: "meat" },
        { fullName: "Sam", kind: "adult", attending: false, dietaryRequirements: "" },
        { fullName: "Mia", kind: "child", attending: false, dietaryRequirements: "" },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("accepts an all-declined roster", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster: [
        { fullName: "Alex", kind: "adult", attending: false, dietaryRequirements: "" },
        { fullName: "Sam", kind: "adult", attending: false, dietaryRequirements: "" },
      ],
    });
    expect(result.success).toBe(true);
  });
});
