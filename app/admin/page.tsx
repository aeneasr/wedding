import Link from "next/link";

import { logoutAdminAction, sendInvitationAction } from "@/src/app-actions/admin";
import { AdminLoginForm } from "@/src/components/admin-login-form";
import {
  Eyebrow,
  Heading,
  PageBackground,
  PageContainer,
  Pill,
  StatCard,
  SubtleText,
  SurfaceCard,
  buttonClassName,
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
    event?: "all" | "event_1" | "event_2";
    search?: string;
  }>;
}) {
  const dictionary = getDictionary("en");

  if (!isDatabaseConfigured() || !isAdminAuthConfigured()) {
    return (
      <PageBackground>
        <PageContainer className="items-center justify-center py-8 sm:py-14">
          <SurfaceCard className="w-full max-w-3xl space-y-4">
            <Eyebrow>Setup</Eyebrow>
            <Heading className="text-4xl">{dictionary.errors.setupTitle}</Heading>
            <SubtleText>{dictionary.errors.setupBody}</SubtleText>
          </SurfaceCard>
        </PageContainer>
      </PageBackground>
    );
  }

  const session = await getOptionalAdminSession();

  if (!session) {
    return (
      <PageBackground>
        <PageContainer className="items-center justify-center py-8 sm:py-14">
          <SurfaceCard className="w-full max-w-2xl space-y-5">
            <Eyebrow>{dictionary.admin.loginTitle}</Eyebrow>
            <Heading className="text-4xl">{dictionary.admin.loginDescription}</Heading>
            <AdminLoginForm />
          </SurfaceCard>
        </PageContainer>
      </PageBackground>
    );
  }

  const filters = await searchParams;
  const { rows, stats } = await listDashboardData(filters);

  return (
    <PageBackground>
      <PageContainer className="gap-6 py-6 sm:py-10">
        <SurfaceCard className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <Eyebrow>Admin dashboard</Eyebrow>
              <Heading>Invitation state at a glance</Heading>
              <SubtleText>
                Manage invitation links, track RSVP progress, and export attendee data.
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
        </SurfaceCard>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Invitations" value={stats.invitations} />
          <StatCard label="Named guests" value={stats.guests} />
          <StatCard label="Opened" value={stats.opened} />
          <StatCard label="Waiting" value={stats.waiting} />
        </div>

        <SurfaceCard className="space-y-4">
          <form className="grid gap-4 md:grid-cols-[1.2fr_0.6fr_0.6fr_auto]">
            <input
              type="search"
              name="search"
              defaultValue={filters.search ?? ""}
              placeholder="Search guest, email, or external ID"
              className="rounded-2xl border border-[#dbc8bb] bg-[#fffdfa] px-4 py-3 text-sm"
            />
            <select
              name="status"
              defaultValue={filters.status ?? "all"}
              className="rounded-2xl border border-[#dbc8bb] bg-[#fffdfa] px-4 py-3 text-sm"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="responded">Fully responded</option>
              <option value="opened">Opened</option>
            </select>
            <select
              name="event"
              defaultValue={filters.event ?? "all"}
              className="rounded-2xl border border-[#dbc8bb] bg-[#fffdfa] px-4 py-3 text-sm"
            >
              <option value="all">All events</option>
              <option value="event_1">Event One</option>
              <option value="event_2">Event Two</option>
            </select>
            <button type="submit" className={buttonClassName()}>
              Filter
            </button>
          </form>
        </SurfaceCard>

        <div className="grid gap-4">
          {rows.map((row) => (
            <SurfaceCard key={row.id} className="space-y-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <Heading className="text-3xl">{row.primaryGuestName}</Heading>
                  <SubtleText>
                    {row.primaryEmail}
                    {row.externalId ? ` | ${row.externalId}` : ""}
                  </SubtleText>
                  <div className="flex flex-wrap gap-2">
                    {row.invitedEvents.map((event) => (
                      <Pill key={event} tone="warm">
                        {event}
                      </Pill>
                    ))}
                    {Object.entries(row.eventStatuses).map(([event, status]) => (
                      <Pill
                        key={`${row.id}-${event}`}
                        tone={
                          status === "attending"
                            ? "success"
                            : status === "declined"
                              ? "muted"
                              : "neutral"
                        }
                      >
                        {event}: {status}
                      </Pill>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2 text-sm text-[#57463b]">
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
            </SurfaceCard>
          ))}
        </div>
      </PageContainer>
    </PageBackground>
  );
}
