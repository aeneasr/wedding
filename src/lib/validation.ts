import { z } from "zod";

import {
  maxChildrenPerInvitation,
  type EventKey,
  type InviteeKind,
  type InvitationMode,
  type Locale,
} from "@/src/lib/constants";

export const namedGuestInputSchema = z.object({
  fullName: z.string().trim().min(1, "Guest name is required."),
  email: z.email().optional().or(z.literal("")),
  kind: z.enum(["adult", "child"]).default("adult"),
  isPrimary: z.boolean().default(false),
});

export const adminInvitationSchema = z
  .object({
    primaryEmail: z.email("A valid primary email is required."),
    invitationMode: z.enum(["individual", "household"] satisfies [InvitationMode, ...InvitationMode[]]),
    locale: z.enum(["en", "de"] satisfies [Locale, ...Locale[]]),
    namedGuests: z.array(namedGuestInputSchema).min(1, "Add at least one named guest."),
    event1Invited: z.boolean(),
    event2Invited: z.boolean(),
    event2PlusOneAllowed: z.boolean(),
    event2ChildrenAllowed: z.boolean(),
    event2MaxChildren: z.number().int().min(0).max(maxChildrenPerInvitation),
  })
  .superRefine((value, ctx) => {
    if (!value.event1Invited && !value.event2Invited) {
      ctx.addIssue({
        code: "custom",
        message: "At least one event must be selected.",
        path: ["event1Invited"],
      });
    }

    if (!value.event2Invited) {
      return;
    }

    if (!value.event2ChildrenAllowed && value.event2MaxChildren > 0) {
      ctx.addIssue({
        code: "custom",
        message: "Child count cannot be greater than zero when children are not allowed.",
        path: ["event2MaxChildren"],
      });
    }
  });

const guestResponseSchema = z.object({
  inviteeId: z.string().uuid(),
  fullName: z.string().trim().min(1),
  kind: z.enum(["adult", "child"] satisfies [InviteeKind, ...InviteeKind[]]),
  attending: z.boolean(),
  dietaryRequirements: z.string().trim().max(500).optional(),
  phoneNumber: z.string().trim().max(50).optional(),
});

const plusOneSchema = z.object({
  attending: z.boolean(),
  fullName: z.string().trim().max(120).optional(),
  dietaryRequirements: z.string().trim().max(500).optional(),
  phoneNumber: z.string().trim().max(50).optional(),
});

const childSchema = z.object({
  fullName: z.string().trim().max(120),
  dietaryRequirements: z.string().trim().max(500).optional(),
});

export const guestRsvpSchema = z.object({
  eventKey: z.enum(["event_1", "event_2"] satisfies [EventKey, ...EventKey[]]),
  invitees: z.array(guestResponseSchema).min(1),
  plusOne: plusOneSchema.nullable().optional(),
  children: z.array(childSchema).max(maxChildrenPerInvitation).default([]),
});

export type GuestRsvpPayload = z.infer<typeof guestRsvpSchema>;

export function validateGuestRsvpPayload(payload: unknown) {
  return guestRsvpSchema.superRefine((value, ctx) => {
    value.invitees.forEach((invitee, index) => {
      if (invitee.attending && invitee.kind === "adult") {
        if (!invitee.phoneNumber?.trim()) {
          ctx.addIssue({
            code: "custom",
            path: ["invitees", index, "phoneNumber"],
            message: "Phone number is required for attending adults.",
          });
        }
      }
    });

    if (value.plusOne?.attending) {
      if (!value.plusOne.fullName?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["plusOne", "fullName"],
          message: "Plus-one name is required.",
        });
      }

      if (!value.plusOne.phoneNumber?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["plusOne", "phoneNumber"],
          message: "Phone number is required for an attending plus one.",
        });
      }
    }

    value.children.forEach((child, index) => {
      if (!child.fullName.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["children", index, "fullName"],
          message: "Child name is required.",
        });
      }
    });
  }).safeParse(payload);
}
