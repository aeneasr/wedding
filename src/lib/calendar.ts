import { getDictionary } from "@/src/lib/i18n";
import { getEventContent, localizeEventText } from "@/src/lib/events";
import { type EventKey, type Locale } from "@/src/lib/constants";

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
  eventKey: EventKey,
  locale: Locale,
  invitationLink: string,
) {
  const event = getEventContent(eventKey);
  const dictionary = getDictionary(locale);
  const summary = localizeEventText(event.name, locale);
  const description = [
    localizeEventText(event.summary, locale),
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
    `UID:${eventKey}@wedding-rsvp`,
    `DTSTAMP:${toIcsTimestamp(new Date().toISOString())}`,
    `DTSTART:${toIcsTimestamp(event.startsAt)}`,
    `DTEND:${toIcsTimestamp(event.endsAt)}`,
    `SUMMARY:${escapeIcs(summary)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `LOCATION:${escapeIcs(localizeEventText(event.address, locale))}`,
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
