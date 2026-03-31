import Link from "next/link";

import { RecoverForm } from "@/src/components/recover-form";
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

export default function RecoverPage() {
  const dictionary = getDictionary("en");

  return (
    <PageBackground>
      <PageContainer className="justify-center py-8 sm:py-14">
        <div className="mx-auto grid w-full max-w-4xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <SurfaceCard className="space-y-5">
            <Eyebrow>{dictionary.guest.recoverLink}</Eyebrow>
            <Heading className="text-4xl">{dictionary.recover.title}</Heading>
            <SubtleText>{dictionary.recover.description}</SubtleText>
            <RecoverForm label={dictionary.recover.emailLabel} />
            <Link href="/" className={buttonClassName({ secondary: true })}>
              Back to home
            </Link>
          </SurfaceCard>
          <SurfaceCard className="space-y-4">
            <Eyebrow>Private access</Eyebrow>
            <Heading className="text-3xl">{dictionary.guest.informationHidden}</Heading>
            <SubtleText>
              Recovery works only for email addresses that already belong to an
              invitation on file. No new guest records are created here.
            </SubtleText>
          </SurfaceCard>
        </div>
      </PageContainer>
    </PageBackground>
  );
}
