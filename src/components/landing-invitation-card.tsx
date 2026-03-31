type IconProps = {
  className?: string;
};

export function LandingInvitationCard() {
  return (
    <section
      aria-labelledby="landing-title"
      data-testid="invitation-card"
      className="relative aspect-[10/16] w-full max-w-[27rem] overflow-hidden rounded-[2.75rem] border border-[#d9d4c9] bg-[#fffdf8] p-5 shadow-[0_30px_90px_rgba(97,116,98,0.16)] sm:p-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),transparent_42%),radial-gradient(circle_at_bottom,_rgba(222,231,217,0.42),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-4 rounded-[2.1rem] border border-[#ece7dc]" />

      <DiscoBall className="absolute right-8 top-7 h-24 w-24 text-[#738373] sm:h-28 sm:w-28" />
      <Sparkles className="absolute right-24 top-11 h-9 w-9 text-[#c3cdc0]" />
      <Sparkles className="absolute left-10 top-[53%] h-8 w-8 text-[#cbd4c6]" />
      <Dice className="absolute left-4 top-[56%] h-16 w-16 -rotate-[12deg] text-[#738373]/80" />
      <ToastGlass className="absolute -left-1 bottom-[5.5rem] h-24 w-24 -rotate-[16deg] text-[#738373]" />
      <ToastGlass className="absolute -right-1 top-[58%] h-24 w-24 rotate-[12deg] text-[#738373]" />
      <ToastGlass className="absolute right-4 bottom-14 h-24 w-24 rotate-[18deg] text-[#738373]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-between text-[#738373]">
        <div className="pt-16 text-center sm:pt-20">
          <h1
            id="landing-title"
            className="font-sans text-[2rem] font-semibold uppercase leading-[0.9] tracking-[0.18em] sm:text-[2.45rem]"
          >
            <span className="block -rotate-[2deg]">We&apos;re</span>
            <span className="mt-1 block rotate-[1deg]">Getting</span>
            <span className="mt-1 block -rotate-[1deg]">Married!</span>
          </h1>
          <WeddingRings className="mx-auto mt-4 h-14 w-14 text-[#738373]" />
        </div>

        <CouplePortrait className="w-[86%] max-w-[18.5rem] text-[#738373]" />

        <div className="pb-4 text-center">
          <div className="flex items-center justify-center gap-3 font-sans text-xs font-semibold tracking-[0.28em] sm:text-sm">
            <time dateTime="2026-08-20">20.08.2026</time>
            <span aria-hidden="true">/</span>
            <time dateTime="2026-08-22">22.08.2026</time>
          </div>
          <p className="mt-2 font-serif text-[1.8rem] italic sm:text-[2rem]">
            Aeneas &amp; Anna
          </p>
        </div>
      </div>
    </section>
  );
}

function DiscoBall({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 120 140"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.8"
    >
      <path d="M60 8v18" />
      <ellipse cx="60" cy="68" rx="37" ry="40" />
      <path d="M24 68h72" />
      <path d="M31 47c10 6 20 9 29 9s19-3 29-9" />
      <path d="M31 90c10-6 20-9 29-9s19 3 29 9" />
      <path d="M39 34c-7 10-11 22-11 34 0 13 4 25 11 35" />
      <path d="M50 28c-4 12-6 26-6 40s2 28 6 40" />
      <path d="M70 28c4 12 6 26 6 40s-2 28-6 40" />
      <path d="M81 34c7 10 11 22 11 34 0 13-4 25-11 35" />
    </svg>
  );
}

function Sparkles({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.6"
    >
      <path d="M24 5l4 15 15 4-15 4-4 15-4-15-15-4 15-4 4-15z" />
      <path d="M10 10l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5 2.5-6z" />
    </svg>
  );
}

function WeddingRings({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.2"
    >
      <circle cx="28" cy="45" r="18" />
      <circle cx="48" cy="45" r="18" />
      <path d="M55 15l4 4 7-7" />
      <path d="M62 8l2.5 5.5L70 16l-5.5 2.5L62 24l-2.5-5.5L54 16l5.5-2.5L62 8z" />
    </svg>
  );
}

function ToastGlass({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.8"
    >
      <path d="M26 12h34l-5 30c-2 10-8 17-14 17s-12-7-14-17l-5-30z" />
      <path d="M40 59v16" />
      <path d="M31 82h18" />
      <path d="M17 24c8 6 14 12 18 18" />
      <path d="M61 21c6 4 11 9 16 16" />
      <path d="M70 11l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5 1.5-4z" />
    </svg>
  );
}

function Dice({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.8"
    >
      <rect x="18" y="18" width="42" height="42" rx="10" />
      <circle cx="30" cy="31" r="2.8" fill="currentColor" stroke="none" />
      <circle cx="48" cy="49" r="2.8" fill="currentColor" stroke="none" />
      <circle cx="31" cy="49" r="2.8" fill="currentColor" stroke="none" />
      <circle cx="49" cy="31" r="2.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CouplePortrait({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 300 240"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.2"
    >
      <path d="M34 226c11-38 31-65 59-81 19-11 41-14 64-11 33 4 60 19 81 43 12 14 22 31 28 49" />
      <path d="M84 150c-12-14-18-31-17-50 1-25 13-48 31-63 15-12 35-16 51-10 14 5 25 19 30 38" />
      <path d="M103 102c-5 18-4 37 4 54 7 15 18 26 33 35" />
      <path d="M71 111c-6 14-8 30-5 46 3 20 13 37 29 49" />
      <path d="M152 81c17 2 33 13 43 29 11 17 13 39 5 58-5 13-13 23-25 31" />
      <path d="M169 102c12 8 20 21 22 36 2 16-3 32-13 44" />
      <path d="M212 161c-18-14-36-22-55-25-24-3-46 2-67 17" />
      <path d="M229 161c-10-18-27-31-50-36" />
      <path d="M100 132c5 0 9 2 13 6" />
      <path d="M167 126c5 1 9 4 12 8" />
      <path d="M126 145c4 4 9 6 15 6" />
      <path d="M172 148c4 2 8 3 12 2" />
      <path d="M150 110c1 11 0 22-4 32" />
      <path d="M184 160c4 8 12 14 22 18" />
      <path d="M68 188c12-7 27-10 42-8" />
    </svg>
  );
}
