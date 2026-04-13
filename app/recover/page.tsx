import Link from "next/link";

import { RecoverForm } from "@/src/components/recover-form";
import { AccentLabel, Heading, PaperPanel } from "@/src/components/ui";
import { defaultLocale } from "@/src/lib/constants";
import { getDictionary } from "@/src/lib/i18n";
import { getStoredGuestLocale } from "@/src/lib/session";

export const dynamic = "force-dynamic";

export default async function RecoverPage() {
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

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-5 py-12 sm:px-8 sm:py-16">
        <AccentLabel className="mb-4 text-base tracking-wide sm:mb-6 sm:text-lg">
          {dictionary.guest.recoverLink}
        </AccentLabel>

        <Heading className="text-center text-3xl sm:text-4xl">
          {dictionary.recover.title}
        </Heading>

        <p className="mt-4 max-w-md text-center text-sm leading-7 text-ink-light sm:text-base">
          {dictionary.recover.description}
        </p>

        <PaperPanel className="mt-8 w-full max-w-md sm:mt-10">
          <RecoverForm
            label={dictionary.recover.emailLabel}
            submitLabel={dictionary.recover.submit}
          />
        </PaperPanel>

        <p className="mt-5 max-w-md text-center text-xs tracking-wide text-sage-muted">
          {dictionary.recover.helpBody}
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex text-xs font-medium tracking-wide text-sage-muted underline decoration-border underline-offset-4 transition hover:text-sage"
        >
          {dictionary.guest.backToOverview}
        </Link>
      </div>
    </main>
  );
}
