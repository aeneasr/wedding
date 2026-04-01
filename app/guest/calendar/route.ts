import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { buildCalendarFile } from "@/src/lib/calendar";
import { getGuestSession, getStoredGuestLocale } from "@/src/lib/session";
import { getInvitationFromGuestSession } from "@/src/server/invitations";
import { buildInvitationUrl } from "@/src/lib/urls";

export async function GET(request: NextRequest) {
  const session = await getGuestSession();

  if (!session) {
    return NextResponse.redirect(new URL("/recover", request.url));
  }

  const bundle = await getInvitationFromGuestSession(session);

  if (!bundle) {
    return NextResponse.redirect(new URL("/recover", request.url));
  }

  if (bundle.rsvps[0]?.status !== "attending") {
    return new NextResponse("Not found", { status: 404 });
  }

  const locale = (await getStoredGuestLocale()) ?? bundle.invitation.locale;
  const content = buildCalendarFile(
    locale,
    buildInvitationUrl(bundle.invitation.id, bundle.invitation.tokenVersion),
  );

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="wedding.ics"`,
    },
  });
}
