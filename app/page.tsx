import type { Metadata } from "next";
import Link from "next/link";

import { LandingInvitationCard } from "@/src/components/landing-invitation-card";

export const metadata: Metadata = {
  title: "Aeneas & Anna | Wedding Invitation",
  description:
    "Wedding invitation and private RSVP portal for Aeneas & Anna on August 20 and August 22, 2026.",
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f2ea] text-[#304030]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(223,232,218,0.82),transparent_38%),linear-gradient(180deg,#f8f4ed_0%,#f2ede3_100%)]" />
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#dbe5d5]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#e9dfcf]/78 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 py-10 sm:px-8 sm:py-14">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.34em] text-[#7f8f80] sm:mb-8">
          Wedding invitation
        </p>

        <LandingInvitationCard />

        <div className="mt-8 max-w-xl text-center">
          <p className="text-sm leading-7 text-[#566756] sm:text-base">
            Your personal invitation link holds the event details and RSVP form
            that apply to you. If the email has gone missing, recover it here.
          </p>

          <div className="mt-6 flex justify-center">
            <Link
              href="/recover"
              className="inline-flex items-center justify-center rounded-full border border-[#738373] bg-[#738373] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#fffdf8] transition hover:border-[#607060] hover:bg-[#607060] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#738373]"
            >
              Recover my invitation link
            </Link>
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.26em] text-[#849384]">
            Invitation details are shared privately by email
          </p>
          <Link
            href="/admin"
            className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.26em] text-[#738373] underline decoration-[#a6b3a4] underline-offset-4 transition hover:text-[#5f715f]"
          >
            Admin
          </Link>
        </div>
      </div>
    </main>
  );
}
