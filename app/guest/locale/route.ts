import { NextResponse } from "next/server";

import { locales } from "@/src/lib/constants";
import { setGuestLocale } from "@/src/lib/session";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale");
  const redirectTo = url.searchParams.get("redirectTo");

  if (locale && locales.includes(locale as "de")) {
    await setGuestLocale(locale as "de");
  }

  if (redirectTo) {
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return new NextResponse(null, { status: 204 });
}
