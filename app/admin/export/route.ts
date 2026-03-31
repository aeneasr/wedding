import { NextResponse } from "next/server";

import { getAdminSession } from "@/src/lib/session";
import { toCsv } from "@/src/lib/csv-export";
import {
  buildAttendeeExportRows,
  buildInvitationStatusExportRows,
} from "@/src/server/invitations";

export async function GET(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const rows =
    type === "status"
      ? await buildInvitationStatusExportRows()
      : await buildAttendeeExportRows();

  return new NextResponse(toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${type === "status" ? "invitation-status" : "attendees"}.csv"`,
    },
  });
}
