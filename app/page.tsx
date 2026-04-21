import type { Metadata } from "next";

import { LandingInvitationCard } from "@/src/components/landing-invitation-card";
import { GuestLocaleProvider } from "@/src/components/locale-context";
import { RegistrationForm } from "@/src/components/registration-form";
import { AccentLabel, PageContainer, WeddingShell } from "@/src/components/ui";
import { defaultLocale } from "@/src/lib/constants";
import { getDictionary } from "@/src/lib/i18n";
import { getStoredGuestLocale } from "@/src/lib/session";

export const metadata: Metadata = {
  title: "Aeneas & Anna | Wedding Invitation",
  description:
    "Wedding invitation and RSVP details for Aeneas & Anna on August 22, 2026.",
};

export default async function Home() {
  const locale = (await getStoredGuestLocale()) ?? defaultLocale;
  const dictionary = getDictionary(locale);

  return (
    <GuestLocaleProvider initialLocale={locale}>
      <WeddingShell>
        <PageContainer className="gap-6 py-8 sm:py-12">
          <AccentLabel className="mx-auto text-base tracking-wide sm:text-lg">
            {dictionary.landing.eyebrow}
          </AccentLabel>

          <div className="mx-auto w-full max-w-[28rem]">
            <LandingInvitationCard
              imageAlt={dictionary.landing.imageAlt}
              imageLabel={dictionary.landing.imageLabel}
            />
          </div>

          <p className="mx-auto max-w-md text-center text-sm leading-6 text-ink-light sm:text-base sm:leading-7">
            {dictionary.landing.inviteBody}
          </p>

          <RegistrationForm locale={locale} />
        </PageContainer>
      </WeddingShell>
    </GuestLocaleProvider>
  );
}
