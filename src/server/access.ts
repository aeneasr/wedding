import { redirect } from "next/navigation";

import { getInvitationFromGuestSession } from "@/src/server/invitations";
import {
  getAdminSession,
  getGuestSession,
} from "@/src/lib/session";
import { isAdminAuthConfigured, isDatabaseConfigured } from "@/src/lib/env";

export async function requireAdminSession() {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const session = await getAdminSession();

  if (!session || !isAdminAuthConfigured()) {
    redirect("/admin");
  }

  return session;
}

export async function getOptionalAdminSession() {
  if (!isDatabaseConfigured() || !isAdminAuthConfigured()) {
    return null;
  }

  return getAdminSession();
}

export async function requireGuestBundle() {
  const session = await getGuestSession();

  if (!session) {
    redirect("/recover");
  }

  const invitation = await getInvitationFromGuestSession(session);

  if (!invitation) {
    redirect("/recover");
  }

  return invitation;
}
