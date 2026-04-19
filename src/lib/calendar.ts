import { getDictionary } from "@/src/lib/i18n";
import { eventContent, localizeEventText } from "@/src/lib/events";
import { type Locale } from "@/src/lib/constants";

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function toIcsTimestamp(value: string) {
  return new Date(value)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

export function buildCalendarFile(
  locale: Locale,
  invitationLink: string,
) {
  const dictionary = getDictionary(locale);
  const summary = localizeEventText(eventContent.name, locale);
  const description = [
    localizeEventText(eventContent.summary, locale),
    "",
    `${dictionary.emails.manageRsvp}: ${invitationLink}`,
  ].join("\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding RSVP//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:wedding@wedding-rsvp`,
    `DTSTAMP:${toIcsTimestamp(new Date().toISOString())}`,
    `DTSTART:${toIcsTimestamp(eventContent.startsAt)}`,
    `DTEND:${toIcsTimestamp(eventContent.endsAt)}`,
    `SUMMARY:${escapeIcs(summary)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `LOCATION:${escapeIcs(localizeEventText(eventContent.addresses[eventContent.addresses.length - 1].label, locale))}`,
    `URL:${escapeIcs(invitationLink)}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcs(summary)}`,
    "TRIGGER:-P1M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
