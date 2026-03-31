import { NextResponse } from "next/server";

import { setGuestSession } from "@/src/lib/session";
import {
  getInvitationForAccess,
  markInvitationOpened,
} from "@/src/server/invitations";

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ invitationId: string; signature: string }>;
  },
) {
  const { invitationId, signature } = await params;
  const result = await getInvitationForAccess(invitationId, signature);

  if (!result.ok) {
    return NextResponse.redirect(
      new URL(`/invite/error?reason=${result.reason}`, _request.url),
    );
  }

  await setGuestSession(
    result.bundle.invitation.id,
    result.bundle.invitation.tokenVersion,
  );
  await markInvitationOpened(result.bundle.invitation.id);

  return NextResponse.redirect(new URL("/guest", _request.url));
}
