import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const invitationModeEnum = pgEnum("invitation_mode", [
  "individual",
  "household",
]);
export const localeEnum = pgEnum("locale", ["de"]);
export const inviteeKindEnum = pgEnum("invitee_kind", ["adult", "child"]);
export const rsvpStatusEnum = pgEnum("rsvp_status", [
  "pending",
  "attending",
  "declined",
]);
export const attendeeTypeEnum = pgEnum("attendee_type", [
  "named_guest",
  "child",
]);
export const activityTypeEnum = pgEnum("activity_type", [
  "invite_sent",
  "invite_resent",
  "recovery_sent",
  "link_opened",
  "rsvp_updated",
  "admin_updated",
]);

export const invitations = pgTable(
  "invitations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    externalId: text("external_id").unique(),
    primaryEmail: text("primary_email").notNull(),
    invitationMode: invitationModeEnum("invitation_mode").notNull(),
    locale: localeEnum("locale").notNull().default("de"),
    tokenVersion: integer("token_version").notNull().default(1),
    sentAt: timestamp("sent_at", { withTimezone: true }),
    lastSentAt: timestamp("last_sent_at", { withTimezone: true }),
    firstOpenedAt: timestamp("first_opened_at", { withTimezone: true }),
    lastOpenedAt: timestamp("last_opened_at", { withTimezone: true }),
    accessCount: integer("access_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("invitations_primary_email_idx").on(table.primaryEmail)],
);

export const invitees = pgTable(
  "invitees",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    invitationId: uuid("invitation_id")
      .notNull()
      .references(() => invitations.id, { onDelete: "cascade" }),
    fullName: text("full_name").notNull(),
    email: text("email"),
    kind: inviteeKindEnum("kind").notNull().default("adult"),
    isPrimary: boolean("is_primary").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("invitees_invitation_idx").on(table.invitationId),
    index("invitees_email_idx").on(table.email),
  ],
);

export const rsvps = pgTable(
  "rsvps",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    invitationId: uuid("invitation_id")
      .notNull()
      .references(() => invitations.id, { onDelete: "cascade" }),
    status: rsvpStatusEnum("status").notNull().default("pending"),
    submittedAt: timestamp("submitted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("rsvps_invitation_idx").on(table.invitationId),
  ],
);

export const attendeeResponses = pgTable(
  "attendee_responses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    rsvpId: uuid("rsvp_id")
      .notNull()
      .references(() => rsvps.id, { onDelete: "cascade" }),
    inviteeId: uuid("invitee_id").references(() => invitees.id, {
      onDelete: "set null",
    }),
    attendeeType: attendeeTypeEnum("attendee_type").notNull(),
    fullName: text("full_name").notNull(),
    isAttending: boolean("is_attending").notNull().default(false),
    dietaryRequirements: text("dietary_requirements"),
    phoneNumber: text("phone_number"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("attendee_responses_rsvp_idx").on(table.rsvpId)],
);

export const invitationActivity = pgTable(
  "invitation_activity",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    invitationId: uuid("invitation_id")
      .notNull()
      .references(() => invitations.id, { onDelete: "cascade" }),
    type: activityTypeEnum("type").notNull(),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("invitation_activity_invitation_idx").on(table.invitationId)],
);

export const recoveryRequests = pgTable(
  "recovery_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    ipAddress: text("ip_address"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("recovery_requests_email_idx").on(table.email),
    index("recovery_requests_ip_idx").on(table.ipAddress),
  ],
);

export const invitationRelations = relations(invitations, ({ many }) => ({
  invitees: many(invitees),
  rsvps: many(rsvps),
  activity: many(invitationActivity),
}));

export const inviteeRelations = relations(invitees, ({ one }) => ({
  invitation: one(invitations, {
    fields: [invitees.invitationId],
    references: [invitations.id],
  }),
}));

export const rsvpRelations = relations(rsvps, ({ one, many }) => ({
  invitation: one(invitations, {
    fields: [rsvps.invitationId],
    references: [invitations.id],
  }),
  attendees: many(attendeeResponses),
}));

export const attendeeResponseRelations = relations(attendeeResponses, ({ one }) => ({
  rsvp: one(rsvps, {
    fields: [attendeeResponses.rsvpId],
    references: [rsvps.id],
  }),
  invitee: one(invitees, {
    fields: [attendeeResponses.inviteeId],
    references: [invitees.id],
  }),
}));
