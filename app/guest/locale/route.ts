import { NextResponse } from "next/server";

import { locales } from "@/src/lib/constants";
import { setGuestLocale } from "@/src/lib/session";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale");
  const redirectTo = url.searchParams.get("redirectTo") || "/guest";

  if (locale && locales.includes(locale as "en" | "de")) {
    await setGuestLocale(locale as "en" | "de");
  }

  return NextResponse.redirect(new URL(redirectTo, request.url));
}
