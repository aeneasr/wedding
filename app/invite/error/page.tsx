import Link from "next/link";

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

export default async function InviteErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const locale = (await getStoredGuestLocale()) ?? defaultLocale;
  const dictionary = getDictionary(locale);
  const isExpired = reason === "expired";

  return (
    <WeddingShell>
      <PageContainer className="items-center justify-center py-10 sm:py-16">
        <PaperPanel className="w-full max-w-3xl space-y-5">
          <Eyebrow>{dictionary.errors.linkEyebrow}</Eyebrow>
          <Heading className="text-4xl">
            {isExpired
              ? dictionary.errors.expiredLinkTitle
              : dictionary.errors.invalidLinkTitle}
          </Heading>
          <SubtleText>
            {isExpired
              ? dictionary.errors.expiredLinkBody
              : dictionary.errors.invalidLinkBody}
          </SubtleText>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/recover" className={inkButtonClassName()}>
              {dictionary.guest.recoverLink}
            </Link>
            <Link href="/" className={inkButtonClassName({ variant: "secondary" })}>
              {dictionary.guest.backToOverview}
            </Link>
          </div>
        </PaperPanel>
      </PageContainer>
    </WeddingShell>
  );
}
