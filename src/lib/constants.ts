export const locales = ["en", "de"] as const;
export const invitationModes = ["individual", "household"] as const;
export const inviteeKinds = ["adult", "child"] as const;
export const rsvpStatuses = ["pending", "attending", "declined"] as const;
export const attendeeTypes = ["named_guest", "child"] as const;
export const activityTypes = [
  "invite_sent",
  "invite_resent",
  "recovery_sent",
  "link_opened",
  "rsvp_updated",
  "admin_updated",
] as const;

export type Locale = (typeof locales)[number];
export type InvitationMode = (typeof invitationModes)[number];
export type InviteeKind = (typeof inviteeKinds)[number];
export type RsvpStatus = (typeof rsvpStatuses)[number];
export type AttendeeType = (typeof attendeeTypes)[number];
export type ActivityType = (typeof activityTypes)[number];

export const defaultLocale: Locale = "de";
export const guestCookieName = "wedding_guest_session";
export const adminCookieName = "wedding_admin_session";
export const guestLocaleCookieName = "wedding_locale";

export const recoveryMaxPerEmailPerHour = 3;
export const recoveryMaxPerIpPerHour = 10;
export const maxAdditionalHouseholdMembers = 9;
export const maxHouseholdMembers = maxAdditionalHouseholdMembers + 1;
