import Link from "next/link";

import {
  buttonClassName,
  Eyebrow,
  Heading,
  PageBackground,
  PageContainer,
  Pill,
  SubtleText,
  SurfaceCard,
} from "@/src/components/ui";
import { getDictionary } from "@/src/lib/i18n";

export default function Home() {
  const dictionary = getDictionary("en");

  return (
    <PageBackground>
      <PageContainer className="gap-8 py-8 sm:py-12">
        <SurfaceCard className="overflow-hidden px-6 py-8 sm:px-10 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
            <div className="space-y-6">
              <Eyebrow>{dictionary.landing.eyebrow}</Eyebrow>
              <Heading className="max-w-3xl">{dictionary.landing.title}</Heading>
              <SubtleText className="max-w-2xl text-base sm:text-lg">
                {dictionary.landing.description}
              </SubtleText>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/recover" className={buttonClassName()}>
                  {dictionary.landing.recoverCta}
                </Link>
                <Link
                  href="/admin"
                  className={buttonClassName({ secondary: true })}
                >
                  Admin
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {dictionary.landing.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-[24px] border border-[#ead8ca] bg-[#fffaf6] p-5"
                >
                  <Pill tone="warm">RSVP</Pill>
                  <p className="mt-4 text-sm leading-6 text-[#43342a]">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </SurfaceCard>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <SurfaceCard className="space-y-4">
            <Eyebrow>{dictionary.landing.privacyTitle}</Eyebrow>
            <Heading className="text-3xl sm:text-4xl">
              {dictionary.landing.privacyBody}
            </Heading>
            <SubtleText>
              Guests do not self-register. Organizers preload the invitation list,
              define access for one or both events, and send each invitation link
              directly by email.
            </SubtleText>
          </SurfaceCard>
          <SurfaceCard className="space-y-4">
            <Eyebrow>How it works</Eyebrow>
            <ol className="space-y-3 text-sm leading-6 text-[#4b3a2f]">
              <li>1. Open the secure invitation link you received by email.</li>
              <li>2. Review only the event details that apply to your invitation.</li>
              <li>3. Submit or update your RSVP, dietary needs, and contact details.</li>
            </ol>
          </SurfaceCard>
        </div>
      </PageContainer>
    </PageBackground>
  );
}
