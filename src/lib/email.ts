import { Resend } from "resend";

import {
  type EventKey,
  type Locale,
} from "@/src/lib/constants";
import { env, isEmailConfigured } from "@/src/lib/env";
import { getEventContent, localizeEventText } from "@/src/lib/events";
import { getDictionary } from "@/src/lib/i18n";
import { buildCalendarFile } from "@/src/lib/calendar";

function getClient() {
  if (!env.RESEND_API_KEY) {
    return null;
  }

  return new Resend(env.RESEND_API_KEY);
}

function wrapHtml(title: string, body: string) {
  return `<!doctype html>
  <html>
    <body style="margin:0;padding:32px;background:#f6f0ea;font-family:Arial,Helvetica,sans-serif;color:#2d241f;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fffaf4;border-radius:24px;overflow:hidden;">
        <tr>
          <td style="padding:40px 32px;background:linear-gradient(135deg,#ead7c4,#f7efe7);">
            <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#7b6656;">Wedding RSVP</p>
            <h1 style="margin:0;font-size:32px;line-height:1.1;">${title}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">${body}</td>
        </tr>
      </table>
    </body>
  </html>`;
}

function eventListMarkup(eventKeys: EventKey[], locale: Locale) {
  return eventKeys
    .map((eventKey) => {
      const event = getEventContent(eventKey);
      return `<li style="margin:0 0 8px;">${localizeEventText(
        event.name,
        locale,
      )}</li>`;
    })
    .join("");
}

async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
  attachments?: Array<{ filename: string; content: string }>;
}) {
  const client = getClient();

  if (!client || !env.EMAIL_FROM) {
    return { skipped: true as const };
  }

  return client.emails.send({
    from: env.EMAIL_FROM,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
    attachments: input.attachments,
  });
}

export async function sendInvitationEmail(input: {
  to: string;
  locale: Locale;
  guestName: string;
  invitationLink: string;
  invitedEvents: EventKey[];
}) {
  const dictionary = getDictionary(input.locale);
  const body = `
    <p style="margin:0 0 16px;">${dictionary.emails.greeting} ${input.guestName},</p>
    <p style="margin:0 0 16px;">${dictionary.emails.invitationIntro}</p>
    <p style="margin:0 0 8px;font-weight:600;">${dictionary.emails.invitedTo}</p>
    <ul style="padding-left:20px;margin:0 0 20px;">${eventListMarkup(
      input.invitedEvents,
      input.locale,
    )}</ul>
    <p style="margin:0 0 20px;"><a href="${input.invitationLink}" style="display:inline-block;padding:14px 20px;border-radius:999px;background:#2d241f;color:#fffaf4;text-decoration:none;">${dictionary.emails.manageRsvp}</a></p>
    <p style="margin:0;color:#6f5b4f;">${dictionary.emails.reminder}</p>
  `;

  return sendEmail({
    to: input.to,
    subject: dictionary.emails.invitationSubject,
    html: wrapHtml(dictionary.emails.invitationSubject, body),
    text: [
      `${dictionary.emails.greeting} ${input.guestName}`,
      "",
      dictionary.emails.invitationIntro,
      "",
      `${dictionary.emails.manageRsvp}: ${input.invitationLink}`,
    ].join("\n"),
  });
}

export async function sendRecoveryEmail(input: {
  to: string;
  locale: Locale;
  guestName: string;
  invitationLink: string;
}) {
  const dictionary = getDictionary(input.locale);
  const body = `
    <p style="margin:0 0 16px;">${dictionary.emails.greeting} ${input.guestName},</p>
    <p style="margin:0 0 20px;">${dictionary.emails.recoveryIntro}</p>
    <p style="margin:0 0 20px;"><a href="${input.invitationLink}" style="display:inline-block;padding:14px 20px;border-radius:999px;background:#2d241f;color:#fffaf4;text-decoration:none;">${dictionary.emails.manageRsvp}</a></p>
    <p style="margin:0;color:#6f5b4f;">${dictionary.emails.reminder}</p>
  `;

  return sendEmail({
    to: input.to,
    subject: dictionary.emails.recoverySubject,
    html: wrapHtml(dictionary.emails.recoverySubject, body),
    text: [
      `${dictionary.emails.greeting} ${input.guestName}`,
      "",
      dictionary.emails.recoveryIntro,
      "",
      `${dictionary.emails.manageRsvp}: ${input.invitationLink}`,
    ].join("\n"),
  });
}

export async function sendConfirmationEmail(input: {
  to: string;
  locale: Locale;
  guestName: string;
  invitationLink: string;
  eventKey: EventKey;
}) {
  const dictionary = getDictionary(input.locale);
  const event = getEventContent(input.eventKey);
  const eventName = localizeEventText(event.name, input.locale);
  const calendarFile = buildCalendarFile(
    input.eventKey,
    input.locale,
    input.invitationLink,
  );
  const subject = dictionary.emails.confirmationSubject[input.eventKey];
  const body = `
    <p style="margin:0 0 16px;">${dictionary.emails.greeting} ${input.guestName},</p>
    <p style="margin:0 0 16px;">${dictionary.emails.confirmationIntro}</p>
    <p style="margin:0 0 8px;font-weight:600;">${eventName}</p>
    <p style="margin:0 0 20px;">${localizeEventText(event.summary, input.locale)}</p>
    <p style="margin:0 0 20px;"><a href="${input.invitationLink}" style="display:inline-block;padding:14px 20px;border-radius:999px;background:#2d241f;color:#fffaf4;text-decoration:none;">${dictionary.emails.manageRsvp}</a></p>
  `;

  return sendEmail({
    to: input.to,
    subject,
    html: wrapHtml(subject, body),
    text: [
      `${dictionary.emails.greeting} ${input.guestName}`,
      "",
      dictionary.emails.confirmationIntro,
      "",
      `${eventName}`,
      `${dictionary.emails.manageRsvp}: ${input.invitationLink}`,
    ].join("\n"),
    attachments: [
      {
        filename: `${input.eventKey}.ics`,
        content: Buffer.from(calendarFile, "utf8").toString("base64"),
      },
    ],
  });
}

export function emailCapabilities() {
  return {
    configured: isEmailConfigured(),
  };
}
