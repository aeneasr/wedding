import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { buildCalendarFile } from "@/src/lib/calendar";
import { eventKeys, type EventKey } from "@/src/lib/constants";
import { getGuestSession, getStoredGuestLocale } from "@/src/lib/session";
import { getInvitationFromGuestSession } from "@/src/server/invitations";
import { buildInvitationUrl } from "@/src/lib/urls";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ eventKey: string }>;
  },
) {
  const { eventKey } = await params;

  if (!eventKeys.includes(eventKey as EventKey)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const session = await getGuestSession();

  if (!session) {
    return NextResponse.redirect(new URL("/recover", request.url));
  }

  const bundle = await getInvitationFromGuestSession(session);

  if (!bundle || !bundle.events.some((event) => event.eventKey === eventKey)) {
    return NextResponse.redirect(new URL("/recover", request.url));
  }

  const locale = (await getStoredGuestLocale()) ?? bundle.invitation.locale;
  const content = buildCalendarFile(
    eventKey as EventKey,
    locale,
    buildInvitationUrl(bundle.invitation.id, bundle.invitation.tokenVersion),
  );

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${eventKey}.ics"`,
    },
  });
}
