import Link from "next/link";

import {
  Eyebrow,
  Heading,
  PageBackground,
  PageContainer,
  SubtleText,
  SurfaceCard,
  buttonClassName,
} from "@/src/components/ui";
import { getDictionary } from "@/src/lib/i18n";

export const dynamic = "force-dynamic";

export default async function InviteErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const dictionary = getDictionary("en");
  const isExpired = reason === "expired";

  return (
    <PageBackground>
      <PageContainer className="items-center justify-center py-8 sm:py-14">
        <SurfaceCard className="w-full max-w-3xl space-y-5">
          <Eyebrow>Invitation access</Eyebrow>
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
            <Link href="/recover" className={buttonClassName()}>
              Recover invitation
            </Link>
            <Link href="/" className={buttonClassName({ secondary: true })}>
              Back to home
            </Link>
          </div>
        </SurfaceCard>
      </PageContainer>
    </PageBackground>
  );
}
