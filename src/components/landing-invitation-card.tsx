import Image from "next/image";

import invitationImage from "@/invitation.jpeg";

export function LandingInvitationCard({
  imageAlt,
  imageLabel,
}: {
  imageAlt: string;
  imageLabel: string;
}) {
  return (
    <section
      aria-label={imageLabel}
      data-testid="invitation-card"
      className="relative aspect-[1066/1600] w-full max-w-[26rem] overflow-hidden rounded-2xl border border-border bg-paper p-2.5 shadow-[0_8px_30px_rgba(107,124,94,0.1)] sm:p-3"
    >
      <Image
        src={invitationImage}
        alt={imageAlt}
        priority
        sizes="(min-width: 640px) 26rem, calc(100vw - 2.5rem)"
        className="h-full w-full rounded-xl object-cover"
      />
    </section>
  );
}
