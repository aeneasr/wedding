import Link from "next/link";
import { notFound } from "next/navigation";

import {
  LanguageSwitcher,
  LocaleProvider,
} from "@/src/components/locale-context";
import { GuestRsvpForm } from "@/src/components/guest-rsvp-form";
import {
  Eyebrow,
  Heading,
  PageBackground,
  PageContainer,
  SubtleText,
  SurfaceCard,
  buttonClassName,
} from "@/src/components/ui";
import { eventKeys, type EventKey } from "@/src/lib/constants";
import { getEventContent, localizeEventText } from "@/src/lib/events";
import { getDictionary } from "@/src/lib/i18n";
import { getStoredGuestLocale } from "@/src/lib/session";
import { requireGuestBundle } from "@/src/server/access";

export const dynamic = "force-dynamic";

export default async function GuestRsvpPage({
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
    notFound();
  }

  const locale = (await getStoredGuestLocale()) ?? bundle.invitation.locale;
  const dictionary = getDictionary(locale);
  const event = getEventContent(eventKey as EventKey);
  const existingRsvp =
    bundle.rsvps.find((entry) => entry.eventKey === eventKey) ?? null;

  const invitees = bundle.invitees.map((invitee) => {
    const response = existingRsvp?.attendees.find(
      (attendee) => attendee.inviteeId === invitee.id,
    );

    return {
      inviteeId: invitee.id,
      fullName: invitee.fullName,
      kind: invitee.kind,
      attending: response?.isAttending ?? false,
      dietaryRequirements: response?.dietaryRequirements ?? "",
      phoneNumber: response?.phoneNumber ?? "",
    };
  });

  const plusOne = existingRsvp?.attendees.find(
    (attendee) => attendee.attendeeType === "plus_one",
  );
  const extraChildren = existingRsvp?.attendees.filter(
    (attendee) => attendee.attendeeType === "child" && !attendee.inviteeId,
  );

  return (
    <LocaleProvider initialLocale={locale}>
      <PageBackground>
        <PageContainer className="gap-6 py-6 sm:py-10">
          <SurfaceCard className="space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <Eyebrow>{dictionary.guest.rsvp}</Eyebrow>
                <Heading>{localizeEventText(event.name, locale)}</Heading>
                <SubtleText>{dictionary.guest.updateHint}</SubtleText>
              </div>
              <LanguageSwitcher />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`/guest/event/${event.key}`} className={buttonClassName({ secondary: true })}>
                {dictionary.guest.details}
              </Link>
              <Link href="/guest" className={buttonClassName({ secondary: true })}>
                {dictionary.guest.backToOverview}
              </Link>
            </div>
          </SurfaceCard>

          <GuestRsvpForm
            eventKey={event.key}
            invitees={invitees}
            plusOneAllowed={event.key === "event_2" && entitlement.plusOneAllowed}
            childrenAllowed={event.key === "event_2" && entitlement.childrenAllowed}
            maxChildren={event.key === "event_2" ? entitlement.maxChildren : 0}
            initialPlusOne={
              plusOne
                ? {
                    attending: plusOne.isAttending,
                    fullName: plusOne.fullName,
                    dietaryRequirements: plusOne.dietaryRequirements ?? "",
                    phoneNumber: plusOne.phoneNumber ?? "",
                  }
                : undefined
            }
            initialChildren={
              extraChildren?.map((child) => ({
                fullName: child.fullName,
                dietaryRequirements: child.dietaryRequirements ?? "",
              })) ?? []
            }
          />
        </PageContainer>
      </PageBackground>
    </LocaleProvider>
  );
}
