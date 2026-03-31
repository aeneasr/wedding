import { type EventKey } from "@/src/lib/constants";
import { env } from "@/src/lib/env";
import { verifySignedValue, signValue } from "@/src/lib/crypto";

export function buildInvitationSignature(
  invitationId: string,
  tokenVersion: number,
) {
  return signValue(`invite:${invitationId}:${tokenVersion}`);
}

export function verifyInvitationSignature(
  invitationId: string,
  tokenVersion: number,
  signature: string,
) {
  return verifySignedValue(
    `invite:${invitationId}:${tokenVersion}`,
    signature,
  );
}

export function buildInvitationPath(
  invitationId: string,
  tokenVersion: number,
) {
  return `/invite/${invitationId}/${buildInvitationSignature(
    invitationId,
    tokenVersion,
  )}`;
}

export function buildInvitationUrl(
  invitationId: string,
  tokenVersion: number,
) {
  return `${env.APP_URL}${buildInvitationPath(invitationId, tokenVersion)}`;
}

export function buildGuestHubUrl() {
  return `${env.APP_URL}/guest`;
}

export function buildGuestEventUrl(eventKey: EventKey) {
  return `${env.APP_URL}/guest/event/${eventKey}`;
}

export function buildGuestCalendarUrl(eventKey: EventKey) {
  return `${env.APP_URL}/guest/calendar/${eventKey}`;
}
