import Link from "next/link";

import { clearGuestSessionAction } from "@/src/app-actions/guest";
import {
  LanguageSwitcher,
  LocaleProvider,
} from "@/src/components/locale-context";
import {
  Eyebrow,
  Heading,
  PageBackground,
  PageContainer,
  Pill,
  SubtleText,
  SurfaceCard,
  buttonClassName,
} from "@/src/components/ui";
import { getStoredGuestLocale } from "@/src/lib/session";
import { getEventContent, localizeEventText } from "@/src/lib/events";
import { getDictionary } from "@/src/lib/i18n";
import { requireGuestBundle } from "@/src/server/access";

export const dynamic = "force-dynamic";

export default async function GuestHubPage() {
  const bundle = await requireGuestBundle();
  const locale = (await getStoredGuestLocale()) ?? bundle.invitation.locale;
  const dictionary = getDictionary(locale);
  const primaryGuest =
    bundle.invitees.find((invitee) => invitee.isPrimary) ?? bundle.invitees[0];

  const statusLabels = {
    pending: dictionary.guest.responsePending,
    attending: dictionary.guest.responseAttending,
    declined: dictionary.guest.responseDeclined,
  } as const;

  return (
    <LocaleProvider initialLocale={locale}>
      <PageBackground>
        <PageContainer className="gap-6 py-6 sm:py-10">
          <SurfaceCard className="space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <Eyebrow>{dictionary.guest.privateAccess}</Eyebrow>
                <Heading>{primaryGuest?.fullName ?? bundle.invitation.primaryEmail}</Heading>
                <SubtleText>{dictionary.guest.summaryLead}</SubtleText>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <LanguageSwitcher />
                <form action={clearGuestSessionAction}>
                  <button
                    type="submit"
                    className={buttonClassName({ secondary: true, compact: true })}
                  >
                    {dictionary.guest.logout}
                  </button>
                </form>
              </div>
            </div>
          </SurfaceCard>

          <div className="grid gap-5">
            {bundle.events.map((eventAccess) => {
              const event = getEventContent(eventAccess.eventKey);
              const rsvp =
                bundle.rsvps.find((entry) => entry.eventKey === eventAccess.eventKey) ??
                null;
              const status = rsvp?.status ?? "pending";

              return (
                <SurfaceCard key={eventAccess.eventKey} className="space-y-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-3">
                      <Pill tone="warm">{localizeEventText(event.hero, locale)}</Pill>
                      <Heading className="text-3xl sm:text-4xl">
                        {localizeEventText(event.name, locale)}
                      </Heading>
                      <SubtleText>{localizeEventText(event.summary, locale)}</SubtleText>
                    </div>
                    <Pill tone={status === "attending" ? "success" : status === "declined" ? "muted" : "warm"}>
                      {statusLabels[status]}
                    </Pill>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                    <SubtleText>
                      {dictionary.guest.securedByLink} {dictionary.guest.updateHint}
                    </SubtleText>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={`/guest/event/${eventAccess.eventKey}`}
                        className={buttonClassName({ secondary: true })}
                      >
                        {dictionary.guest.details}
                      </Link>
                      <Link
                        href={`/guest/event/${eventAccess.eventKey}/rsvp`}
                        className={buttonClassName()}
                      >
                        {status === "pending"
                          ? dictionary.guest.rsvp
                          : dictionary.guest.update}
                      </Link>
                    </div>
                  </div>
                </SurfaceCard>
              );
            })}
          </div>
        </PageContainer>
      </PageBackground>
    </LocaleProvider>
  );
}
