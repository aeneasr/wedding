import Link from "next/link";

import { logoutAdminAction, sendInvitationAction } from "@/src/app-actions/admin";
import { AdminLoginForm } from "@/src/components/admin-login-form";
import {
  AdminPanel,
  AdminShell,
  Eyebrow,
  Heading,
  InkBadge,
  PageContainer,
  StatCard,
  SubtleText,
  buttonClassName,
  inputClassName,
} from "@/src/components/ui";
import { getDictionary } from "@/src/lib/i18n";
import { isAdminAuthConfigured, isDatabaseConfigured } from "@/src/lib/env";
import { getOptionalAdminSession } from "@/src/server/access";
import { listDashboardData } from "@/src/server/invitations";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: "all" | "pending" | "responded" | "opened";
    search?: string;
  }>;
}) {
  const dictionary = getDictionary("de");

  if (!isDatabaseConfigured() || !isAdminAuthConfigured()) {
    return (
      <AdminShell>
        <PageContainer className="items-center justify-center py-8 sm:py-14">
          <AdminPanel className="w-full max-w-3xl space-y-4">
            <Eyebrow>Setup</Eyebrow>
            <Heading className="text-4xl">{dictionary.errors.setupTitle}</Heading>
            <SubtleText>{dictionary.errors.setupBody}</SubtleText>
          </AdminPanel>
        </PageContainer>
      </AdminShell>
    );
  }

  const session = await getOptionalAdminSession();

  if (!session) {
    return (
      <AdminShell>
        <PageContainer className="items-center justify-center py-8 sm:py-14">
          <AdminPanel className="w-full max-w-2xl space-y-5">
            <Eyebrow>{dictionary.admin.loginTitle}</Eyebrow>
            <Heading className="text-4xl">{dictionary.admin.loginDescription}</Heading>
            <AdminLoginForm />
          </AdminPanel>
        </PageContainer>
      </AdminShell>
    );
  }

  const filters = await searchParams;
  const { rows, stats } = await listDashboardData(filters);

  return (
    <AdminShell>
      <PageContainer className="gap-6 py-6 sm:py-10">
        <AdminPanel className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <Eyebrow>Admin dashboard</Eyebrow>
              <Heading>Invitation state at a glance</Heading>
              <SubtleText>
                See who has opened their invitation, replied, and still needs a
                follow-up.
              </SubtleText>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/invitations/new" className={buttonClassName()}>
                New invitation
              </Link>
              <Link
                href="/admin/import"
                className={buttonClassName({ secondary: true })}
              >
                Import CSV
              </Link>
              <Link
                href="/admin/export?type=attendees"
                className={buttonClassName({ secondary: true })}
              >
                Export attendees
              </Link>
              <form action={logoutAdminAction}>
                <button
                  type="submit"
                  className={buttonClassName({ secondary: true })}
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </AdminPanel>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Invitations" value={stats.invitations} />
          <StatCard label="People" value={stats.guests} />
          <StatCard label="Opened" value={stats.opened} />
          <StatCard label="Waiting" value={stats.waiting} />
        </div>

        <AdminPanel className="space-y-4">
          <form className="grid gap-4 md:grid-cols-[1.2fr_0.6fr_auto]">
            <input
              type="search"
              name="search"
              defaultValue={filters.search ?? ""}
              placeholder="Search guest, email, or external ID"
              className={inputClassName()}
            />
            <select
              name="status"
              defaultValue={filters.status ?? "all"}
              className={inputClassName()}
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="responded">Fully responded</option>
              <option value="opened">Opened</option>
            </select>
            <button type="submit" className={buttonClassName()}>
              Filter
            </button>
          </form>
        </AdminPanel>

        <div className="grid gap-4">
          {rows.map((row) => (
            <AdminPanel key={row.id} className="space-y-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <Heading className="text-3xl">{row.primaryGuestName}</Heading>
                  <SubtleText>
                    {row.primaryEmail}
                    {row.externalId ? ` | ${row.externalId}` : ""}
                  </SubtleText>
                  <div className="flex flex-wrap gap-2">
                    <InkBadge tone={row.rsvpStatus === "attending" ? "success" : row.rsvpStatus === "declined" ? "muted" : "neutral"}>{row.rsvpStatus}</InkBadge>
                  </div>
                </div>
                <div className="grid gap-2 text-sm text-ink-light">
                  <p>Access count: {row.accessCount}</p>
                  <p>Sent: {row.sentAt ? row.sentAt.toLocaleString() : "Not yet"}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/admin/invitations/${row.id}`}
                  className={buttonClassName({ secondary: true })}
                >
                  Manage invitation
                </Link>
                <form action={sendInvitationAction}>
                  <input type="hidden" name="invitationId" value={row.id} />
                  <input type="hidden" name="redirectTo" value="/admin" />
                  <input
                    type="hidden"
                    name="resend"
                    value={row.sentAt ? "true" : "false"}
                  />
                  <button type="submit" className={buttonClassName()}>
                    {row.sentAt ? "Resend link" : "Send link"}
                  </button>
                </form>
              </div>
            </AdminPanel>
          ))}
        </div>
      </PageContainer>
    </AdminShell>
  );
}
