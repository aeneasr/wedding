import Link from "next/link";

import { clearGuestSessionAction } from "@/src/app-actions/guest";
import { LandingInvitationCard } from "@/src/components/landing-invitation-card";
import { GuestLocaleProvider } from "@/src/components/locale-context";
import { GuestRsvpForm } from "@/src/components/guest-rsvp-form";
import {
  DataList,
  Eyebrow,
  Heading,
  InkBadge,
  PageContainer,
  PaperPanel,
  SectionTitle,
  SubtleText,
  WeddingShell,
  inkButtonClassName,
} from "@/src/components/ui";
import {
  eventContent,
  formatEventDateBadge,
  localizeEventText,
} from "@/src/lib/events";
import { mapAttendeesToInvitees } from "@/src/lib/household";
import { getDictionary } from "@/src/lib/i18n";
import { getStoredGuestLocale } from "@/src/lib/session";
import { formatDateTime } from "@/src/lib/utils";
import { requireGuestBundle } from "@/src/server/access";

export const dynamic = "force-dynamic";

export default async function GuestPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const bundle = await requireGuestBundle();
  const { saved } = await searchParams;
  const locale = (await getStoredGuestLocale()) ?? bundle.invitation.locale;
  const dictionary = getDictionary(locale);
  const primaryGuest =
    bundle.invitees.find((invitee) => invitee.isPrimary) ?? bundle.invitees[0];

  const existingRsvp = bundle.rsvps[0] ?? null;
  const invitees = mapAttendeesToInvitees(
    bundle.invitees,
    existingRsvp?.attendees ?? [],
  );
  const status = existingRsvp?.status ?? "pending";
  const statusLabel =
    status === "attending"
      ? dictionary.guest.responseAttending
      : status === "declined"
        ? dictionary.guest.responseDeclined
        : dictionary.guest.responsePending;

  return (
    <GuestLocaleProvider initialLocale={locale}>
      <WeddingShell>
        <PageContainer className="gap-6 py-8 sm:py-12">
          {/* Section 1: Invitation Card */}
          <PaperPanel className="space-y-5">
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-10">
              <div className="w-full max-w-[16rem] shrink-0">
                <LandingInvitationCard
                  imageAlt={dictionary.landing.imageAlt}
                  imageLabel={dictionary.landing.imageLabel}
                />
              </div>
              <div className="flex flex-col gap-5">
                <div className="space-y-3">
                  <Eyebrow>{dictionary.guest.privateAccess}</Eyebrow>
                  <Heading>
                    {primaryGuest?.fullName ?? bundle.invitation.primaryEmail}
                  </Heading>
                  <SubtleText>{dictionary.guest.summaryLead}</SubtleText>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a href="#rsvp" className={inkButtonClassName()}>
                    {status === "pending"
                      ? dictionary.guest.rsvp
                      : dictionary.guest.update}
                  </a>
                  <form action={clearGuestSessionAction}>
                    <button
                      type="submit"
                      className={inkButtonClassName({
                        variant: "secondary",
                        compact: true,
                      })}
                    >
                      {dictionary.guest.logout}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </PaperPanel>

          {/* Section 2: Event Details */}
          <PaperPanel className="space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <Eyebrow>{formatEventDateBadge(locale)}</Eyebrow>
                <Heading>{localizeEventText(eventContent.name, locale)}</Heading>
                <SubtleText>{localizeEventText(eventContent.hero, locale)}</SubtleText>
              </div>
              <InkBadge
                tone={
                  status === "attending"
                    ? "success"
                    : status === "declined"
                      ? "muted"
                      : "warm"
                }
              >
                {statusLabel}
              </InkBadge>
            </div>
            <DataList
              items={[
                {
                  label: dictionary.guest.venue,
                  value: localizeEventText(eventContent.venueName, locale),
                },
                {
                  label: dictionary.guest.address,
                  value: (
                    <a
                      href={eventContent.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      {localizeEventText(eventContent.address, locale)}
                    </a>
                  ),
                },
                {
                  label: dictionary.guest.timing,
                  value: `${formatDateTime(eventContent.startsAt, locale)} \u2013 ${formatDateTime(eventContent.endsAt, locale)}`,
                },
              ]}
            />
          </PaperPanel>

          <PaperPanel className="space-y-5">
            <SectionTitle title={dictionary.guest.schedule} />
            <div className="grid gap-3">
              {eventContent.schedule.map((item) => (
                <div
                  key={item.time}
                  className="grid gap-2 rounded-xl bg-cream p-4 sm:grid-cols-[120px_1fr]"
                >
                  <p className="text-sm font-medium uppercase tracking-wide text-sage">
                    {item.time}
                  </p>
                  <div>
                    <p className="font-medium text-ink">
                      {localizeEventText(item.title, locale)}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-light">
                      {localizeEventText(item.note, locale)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </PaperPanel>

          <PaperPanel className="space-y-5">
            <SectionTitle title={dictionary.guest.logistics} />
            <div className="grid gap-3">
              {eventContent.logistics.map((item) => (
                <div
                  key={localizeEventText(item.label, locale)}
                  className="rounded-xl bg-cream p-4"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-sage-muted">
                    {localizeEventText(item.label, locale)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink">
                    {localizeEventText(item.value, locale)}
                  </p>
                </div>
              ))}
            </div>
          </PaperPanel>

          {/* Section 3: RSVP */}
          <div id="rsvp" className="space-y-5">
            {saved === "1" ? (
              <p className="rounded-xl bg-success-bg px-4 py-3 text-sm text-success-text">
                {dictionary.guest.saved}
              </p>
            ) : null}

            <GuestRsvpForm
              invitationMode={bundle.invitation.invitationMode}
              invitees={invitees}
            />

            {status === "attending" ? (
              <Link
                href="/guest/calendar"
                className={inkButtonClassName({ variant: "secondary" })}
              >
                {dictionary.guest.addToCalendar}
              </Link>
            ) : null}
          </div>
        </PageContainer>
      </WeddingShell>
    </GuestLocaleProvider>
  );
}
