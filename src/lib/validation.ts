import { z } from "zod";

import {
  maxAdditionalHouseholdMembers,
  maxHouseholdMembers,
  type InviteeKind,
  type InvitationMode,
  type Locale,
} from "@/src/lib/constants";

export const inviteeInputSchema = z.object({
  fullName: z.string().trim().max(120),
  kind: z.enum(["adult", "child"]).default("adult"),
  isPrimary: z.boolean().default(false),
});

export const adminInvitationSchema = z
  .object({
    primaryEmail: z.email("A valid primary email is required."),
    invitationMode: z.enum(["individual", "household"] satisfies [InvitationMode, ...InvitationMode[]]),
    locale: z.enum(["de"] satisfies [Locale, ...Locale[]]),
    invitees: z
      .array(inviteeInputSchema)
      .min(1, "Add at least one person.")
      .max(maxHouseholdMembers, `A household can include up to ${maxHouseholdMembers} people.`),
  })
  .superRefine((value, ctx) => {
    if (value.invitationMode === "individual" && value.invitees.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "Individual invitations can only include one person.",
        path: ["invitees"],
      });
    }

    if (value.invitationMode === "household" && value.invitees.length > maxAdditionalHouseholdMembers + 1) {
      ctx.addIssue({
        code: "custom",
        message: `A household can include up to ${maxHouseholdMembers} people.`,
        path: ["invitees"],
      });
    }

    if (value.invitees.length === 0) {
      return;
    }

    const primaryInvitees = value.invitees.filter((invitee) => invitee.isPrimary);

    if (primaryInvitees.length !== 1 || !value.invitees[0]?.isPrimary) {
      ctx.addIssue({
        code: "custom",
        message: "Exactly one primary person is required, and it must be the first row.",
        path: ["invitees"],
      });
    }

    value.invitees.forEach((invitee, index) => {
      if (index === 0) {
        if (!invitee.fullName.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "Primary person name is required.",
            path: ["invitees", index, "fullName"],
          });
        }

        if (invitee.kind !== "adult") {
          ctx.addIssue({
            code: "custom",
            message: "The primary person must be an adult.",
            path: ["invitees", index, "kind"],
          });
        }
      }
    });
  });

const guestResponseSchema = z.object({
  inviteeId: z.string().uuid(),
  fullName: z.string().trim().min(1).max(120),
  kind: z.enum(["adult", "child"] satisfies [InviteeKind, ...InviteeKind[]]),
  isPrimary: z.boolean(),
  attending: z.boolean(),
  dietaryRequirements: z.enum(["", "meat", "vegetarian"]).optional(),
});

export const guestRsvpSchema = z.object({
  invitees: z.array(guestResponseSchema).min(1),
  contactPhone: z.string().max(40).optional(),
});

export type GuestRsvpPayload = z.infer<typeof guestRsvpSchema>;

export function validateGuestRsvpPayload(payload: unknown) {
  return guestRsvpSchema.superRefine((value, ctx) => {
    value.invitees.forEach((invitee, index) => {
      if (invitee.isPrimary && invitee.kind !== "adult") {
        ctx.addIssue({
          code: "custom",
          path: ["invitees", index, "kind"],
          message: "The primary person must remain an adult.",
        });
      }

      if (!invitee.fullName.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["invitees", index, "fullName"],
          message: "Name is required.",
        });
      }
    });
  }).safeParse(payload);
}

const rosterEntrySchema = z.object({
  fullName: z.string().trim().min(1, "Name is required.").max(120),
  kind: z.enum(["adult", "child"] satisfies [InviteeKind, ...InviteeKind[]]),
  dietaryRequirements: z.enum(["meat", "vegetarian"], {
    message: "Please choose a meal preference.",
  }),
});

export const registrationSchema = z
  .object({
    primaryEmail: z.email("A valid email is required."),
    contactPhone: z
      .string()
      .max(40, "Phone number is too long.")
      .transform((value) => value.trim())
      .default(""),
    roster: z
      .array(rosterEntrySchema)
      .min(1, "Add at least one person.")
      .max(maxHouseholdMembers, `A household can include up to ${maxHouseholdMembers} people.`),
  })
  .superRefine((value, ctx) => {
    const first = value.roster[0];
    if (first && first.kind !== "adult") {
      ctx.addIssue({
        code: "custom",
        path: ["roster", 0, "kind"],
        message: "The first person must be an adult.",
      });
    }
  });

export type RegistrationPayload = z.infer<typeof registrationSchema>;

export function validateRegistrationPayload(payload: unknown) {
  return registrationSchema.safeParse(payload);
}
