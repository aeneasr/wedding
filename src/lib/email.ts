import { Resend } from "resend";

import {
  type Locale,
} from "@/src/lib/constants";
import { env } from "@/src/lib/env";
import { eventContent, localizeEventText, formatEventDateBadge } from "@/src/lib/events";
import { getDictionary } from "@/src/lib/i18n";
import { buildCalendarFile } from "@/src/lib/calendar";

function getClient() {
  if (!env.RESEND_API_KEY) {
    return null;
  }

  return new Resend(env.RESEND_API_KEY);
}

function wrapHtml(locale: Locale, body: string) {
  const dictionary = getDictionary(locale);
  const dateBadge = formatEventDateBadge(locale);
  const venueName = localizeEventText(eventContent.venueName, locale);

  return `<!doctype html>
<html lang="${locale}">
  <head><meta charset="utf-8"></head>
  <body style="margin:0;padding:32px;background:#f6f0ea;font-family:Georgia,'Times New Roman',serif;color:#2d241f;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fffaf4;border-radius:24px;overflow:hidden;">
      <tr>
        <td style="padding:48px 32px 36px;background:linear-gradient(135deg,#ead7c4,#f7efe7);text-align:center;">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#7b6656;">${dictionary.emails.headerLabel}</p>
          <h1 style="margin:0 0 12px;font-size:36px;line-height:1.1;font-family:Georgia,'Times New Roman',serif;font-weight:400;">${dictionary.emails.coupleNames}</h1>
          <p style="margin:0;font-size:14px;color:#7b6656;">${dateBadge} &middot; ${venueName}, M\u00FCnchen</p>
        </td>
      </tr>
      <tr>
        <td style="padding:32px 32px 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;">${body}</td>
      </tr>
      <tr>
        <td style="padding:0 32px;">
          <hr style="border:none;border-top:1px solid #ead7c4;margin:0;">
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px 32px;text-align:center;font-family:Georgia,'Times New Roman',serif;">
          <p style="margin:0 0 4px;font-size:14px;color:#7b6656;">${dictionary.emails.closing}</p>
          <p style="margin:0;font-size:18px;font-style:italic;color:#2d241f;">${dictionary.emails.coupleNames}</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
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
    ...(input.replyTo && { replyTo: input.replyTo }),
    attachments: input.attachments,
  });
}

export async function sendInvitationEmail(input: {
  to: string;
  locale: Locale;
  guestName: string;
  invitationLink: string;
}) {
  const dictionary = getDictionary(input.locale);
  const body = `
    <p style="margin:0 0 16px;">${dictionary.emails.greeting} ${input.guestName},</p>
    <p style="margin:0 0 24px;">${dictionary.emails.invitationIntro}</p>
    <p style="margin:0 0 24px;text-align:center;"><a href="${input.invitationLink}" style="display:inline-block;padding:16px 32px;border-radius:999px;background:#2d241f;color:#fffaf4;text-decoration:none;font-size:16px;font-weight:600;">${dictionary.emails.manageRsvp}</a></p>
    <p style="margin:0;font-size:13px;color:#9b8b7e;">${dictionary.emails.reminder}</p>
  `;

  return sendEmail({
    to: input.to,
    subject: dictionary.emails.invitationSubject,
    html: wrapHtml(input.locale, body),
    text: [
      `${dictionary.emails.coupleNames}`,
      `${formatEventDateBadge(input.locale)} · ${localizeEventText(eventContent.venueName, input.locale)}, München`,
      "",
      `${dictionary.emails.greeting} ${input.guestName},`,
      "",
      dictionary.emails.invitationIntro,
      "",
      `${dictionary.emails.manageRsvp}: ${input.invitationLink}`,
      "",
      dictionary.emails.reminder,
      "",
      `${dictionary.emails.closing} ${dictionary.emails.coupleNames}`,
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
    <p style="margin:0 0 24px;">${dictionary.emails.recoveryIntro}</p>
    <p style="margin:0 0 24px;text-align:center;"><a href="${input.invitationLink}" style="display:inline-block;padding:16px 32px;border-radius:999px;background:#2d241f;color:#fffaf4;text-decoration:none;font-size:16px;font-weight:600;">${dictionary.emails.manageRsvp}</a></p>
    <p style="margin:0;font-size:13px;color:#9b8b7e;">${dictionary.emails.reminder}</p>
  `;

  return sendEmail({
    to: input.to,
    subject: dictionary.emails.recoverySubject,
    html: wrapHtml(input.locale, body),
    text: [
      `${dictionary.emails.coupleNames}`,
      `${formatEventDateBadge(input.locale)} · ${localizeEventText(eventContent.venueName, input.locale)}, München`,
      "",
      `${dictionary.emails.greeting} ${input.guestName},`,
      "",
      dictionary.emails.recoveryIntro,
      "",
      `${dictionary.emails.manageRsvp}: ${input.invitationLink}`,
      "",
      dictionary.emails.reminder,
      "",
      `${dictionary.emails.closing} ${dictionary.emails.coupleNames}`,
    ].join("\n"),
  });
}

export async function sendConfirmationEmail(input: {
  to: string;
  locale: Locale;
  guestName: string;
  invitationLink: string;
}) {
  const dictionary = getDictionary(input.locale);
  const eventName = localizeEventText(eventContent.name, input.locale);
  const eventSummary = localizeEventText(eventContent.summary, input.locale);
  const calendarFile = buildCalendarFile(
    input.locale,
    input.invitationLink,
  );
  const subject = dictionary.emails.confirmationSubject;
  const body = `
    <p style="margin:0 0 16px;">${dictionary.emails.greeting} ${input.guestName},</p>
    <p style="margin:0 0 20px;">${dictionary.emails.confirmationIntro}</p>
    <p style="margin:0 0 4px;font-weight:600;">${eventName}</p>
    <p style="margin:0 0 24px;color:#7b6656;">${eventSummary}</p>
    <p style="margin:0 0 24px;text-align:center;"><a href="${input.invitationLink}" style="display:inline-block;padding:16px 32px;border-radius:999px;background:#2d241f;color:#fffaf4;text-decoration:none;font-size:16px;font-weight:600;">${dictionary.emails.manageRsvp}</a></p>
  `;

  return sendEmail({
    to: input.to,
    subject,
    html: wrapHtml(input.locale, body),
    text: [
      `${dictionary.emails.coupleNames}`,
      `${formatEventDateBadge(input.locale)} · ${localizeEventText(eventContent.venueName, input.locale)}, München`,
      "",
      `${dictionary.emails.greeting} ${input.guestName},`,
      "",
      dictionary.emails.confirmationIntro,
      "",
      `${eventName}`,
      eventSummary,
      "",
      `${dictionary.emails.manageRsvp}: ${input.invitationLink}`,
      "",
      `${dictionary.emails.closing} ${dictionary.emails.coupleNames}`,
    ].join("\n"),
    attachments: [
      {
        filename: `wedding.ics`,
        content: Buffer.from(calendarFile, "utf8").toString("base64"),
      },
    ],
  });
}
