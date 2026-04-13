import Link from "next/link";

import { RecoverForm } from "@/src/components/recover-form";
import {
  Eyebrow,
  Heading,
  PageContainer,
  PaperPanel,
  SubtleText,
  WeddingShell,
  inkButtonClassName,
} from "@/src/components/ui";
import { defaultLocale } from "@/src/lib/constants";
import { getDictionary } from "@/src/lib/i18n";
import { getStoredGuestLocale } from "@/src/lib/session";

export const dynamic = "force-dynamic";

export default async function RecoverPage() {
  const locale = (await getStoredGuestLocale()) ?? defaultLocale;
  const dictionary = getDictionary(locale);

  return (
    <WeddingShell>
      <PageContainer className="items-center justify-center py-10 sm:py-16">
        <div className="mx-auto grid w-full max-w-4xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <PaperPanel className="space-y-5">
            <Eyebrow>{dictionary.guest.recoverLink}</Eyebrow>
            <Heading className="text-2xl sm:text-3xl">{dictionary.recover.title}</Heading>
            <SubtleText>{dictionary.recover.description}</SubtleText>
            <RecoverForm
              label={dictionary.recover.emailLabel}
              submitLabel={dictionary.recover.submit}
            />
            <Link href="/" className={inkButtonClassName({ variant: "ghost" })}>
              {dictionary.guest.backToOverview}
            </Link>
          </PaperPanel>
          <PaperPanel className="space-y-4 bg-cream">
            <Eyebrow>{dictionary.recover.helpEyebrow}</Eyebrow>
            <Heading className="text-2xl sm:text-3xl">{dictionary.recover.helpTitle}</Heading>
            <SubtleText>{dictionary.recover.helpBody}</SubtleText>
          </PaperPanel>
        </div>
      </PageContainer>
    </WeddingShell>
  );
}
