import type { Metadata } from "next";
import Link from "next/link";

import { LandingInvitationCard } from "@/src/components/landing-invitation-card";
import { RegistrationForm } from "@/src/components/registration-form";
import { AccentLabel } from "@/src/components/ui";
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
    <main className="relative min-h-screen overflow-hidden bg-cream text-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-sage-light)_0%,transparent_50%)] opacity-30" />

      <svg className="pointer-events-none absolute -left-6 top-12 h-40 w-40 text-sage opacity-[0.08]" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M10 60 C30 20, 90 20, 110 60 C90 100, 30 100, 10 60Z" />
        <circle cx="60" cy="30" r="6" />
        <circle cx="35" cy="80" r="4" />
        <circle cx="85" cy="80" r="4" />
      </svg>
      <svg className="pointer-events-none absolute -right-6 bottom-16 h-40 w-40 text-sage opacity-[0.08]" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20 20 Q60 5 100 20 Q115 60 100 100 Q60 115 20 100 Q5 60 20 20Z" />
        <path d="M45 55 Q60 40 75 55 Q60 70 45 55Z" />
      </svg>

      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col items-center px-5 py-8 sm:px-8 sm:py-10">
        <AccentLabel className="mb-3 text-base tracking-wide sm:mb-4 sm:text-lg">
          {dictionary.landing.eyebrow}
        </AccentLabel>

        <div className="flex w-full max-w-[28rem] flex-col items-stretch">
          <LandingInvitationCard
            imageAlt={dictionary.landing.imageAlt}
            imageLabel={dictionary.landing.imageLabel}
          />

          <p className="mt-6 text-center text-sm leading-6 text-ink-light sm:mt-7 sm:text-base sm:leading-7">
            {dictionary.landing.inviteBody}
          </p>

          <div className="mt-5 sm:mt-6">
            <RegistrationForm />
          </div>
        </div>

        <Link
          href="/recover"
          className="mt-8 inline-flex text-sm font-medium tracking-wide text-sage-muted underline decoration-border underline-offset-4 transition hover:text-sage sm:text-base"
        >
          {dictionary.landing.makeChangesCta}
        </Link>
      </div>
    </main>
  );
}
