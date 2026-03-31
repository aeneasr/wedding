import Link from "next/link";
import { notFound } from "next/navigation";

import {
  LanguageSwitcher,
  LocaleProvider,
} from "@/src/components/locale-context";
import {
  DataList,
  Eyebrow,
  Heading,
  PageBackground,
  PageContainer,
  Pill,
  SectionTitle,
  SubtleText,
  SurfaceCard,
  buttonClassName,
} from "@/src/components/ui";
import { eventKeys, type EventKey } from "@/src/lib/constants";
import {
  formatEventDateBadge,
  getEventContent,
  localizeEventText,
} from "@/src/lib/events";
import { getDictionary } from "@/src/lib/i18n";
import { getStoredGuestLocale } from "@/src/lib/session";
import { formatDateTime } from "@/src/lib/utils";
import { requireGuestBundle } from "@/src/server/access";

export const dynamic = "force-dynamic";

export default async function GuestEventPage({
  params,
}: {
  params: Promise<{ eventKey: string }>;
}) {
  const { eventKey } = await params;

  if (!eventKeys.includes(eventKey as EventKey)) {
    notFound();
  }

  const bundle = await requireGuestBundle();
  const entitlement = bundle.events.find((event) => event.eventKey === eventKey);

  if (!entitlement) {
    return notFound();
  }

  const locale = (await getStoredGuestLocale()) ?? bundle.invitation.locale;
  const dictionary = getDictionary(locale);
  const event = getEventContent(eventKey as EventKey);
  const rsvp =
    bundle.rsvps.find((entry) => entry.eventKey === eventKey) ?? null;
  const status = rsvp?.status ?? "pending";
  const statusLabel =
    status === "attending"
      ? dictionary.guest.responseAttending
      : status === "declined"
        ? dictionary.guest.responseDeclined
        : dictionary.guest.responsePending;

  return (
    <LocaleProvider initialLocale={locale}>
      <PageBackground>
        <PageContainer className="gap-6 py-6 sm:py-10">
          <SurfaceCard className="space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <Eyebrow>{formatEventDateBadge(event.key)}</Eyebrow>
                <Heading>{localizeEventText(event.name, locale)}</Heading>
                <SubtleText>{localizeEventText(event.hero, locale)}</SubtleText>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Pill tone={status === "attending" ? "success" : status === "declined" ? "muted" : "warm"}>
                  {statusLabel}
                </Pill>
                <LanguageSwitcher />
              </div>
            </div>
            <DataList
              items={[
                {
                  label: "Venue",
                  value: localizeEventText(event.venueName, locale),
                },
                {
                  label: "Address",
                  value: localizeEventText(event.address, locale),
                },
                {
                  label: "Timing",
                  value: `${formatDateTime(event.startsAt)} - ${formatDateTime(event.endsAt)}`,
                },
                {
                  label: dictionary.guest.status,
                  value: statusLabel,
                },
              ]}
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/guest/event/${event.key}/rsvp`}
                className={buttonClassName()}
              >
                {status === "pending" ? dictionary.guest.rsvp : dictionary.guest.update}
              </Link>
              {status === "attending" ? (
                <Link
                  href={`/guest/calendar/${event.key}`}
                  className={buttonClassName({ secondary: true })}
                >
                  {dictionary.guest.addToCalendar}
                </Link>
              ) : null}
              <Link href="/guest" className={buttonClassName({ secondary: true })}>
                {dictionary.guest.backToOverview}
              </Link>
            </div>
          </SurfaceCard>

          <SurfaceCard className="space-y-5">
            <SectionTitle title={dictionary.guest.schedule} />
            <div className="grid gap-4">
              {event.schedule.map((item) => (
                <div key={`${event.key}-${item.time}`} className="grid gap-2 rounded-[24px] bg-[#faf4ee] p-4 sm:grid-cols-[120px_1fr]">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8f6e57]">
                    {item.time}
                  </p>
                  <div>
                    <p className="font-semibold text-[#2f241c]">
                      {localizeEventText(item.title, locale)}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#645245]">
                      {localizeEventText(item.note, locale)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard className="space-y-5">
            <SectionTitle title={dictionary.guest.logistics} />
            <div className="grid gap-4">
              {event.logistics.map((item) => (
                <div key={`${event.key}-${localizeEventText(item.label, locale)}`} className="rounded-[24px] bg-[#faf4ee] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6e57]">
                    {localizeEventText(item.label, locale)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#423329]">
                    {localizeEventText(item.value, locale)}
                  </p>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </PageContainer>
      </PageBackground>
    </LocaleProvider>
  );
}
