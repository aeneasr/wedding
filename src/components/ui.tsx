import Link from "next/link";

import { type Locale, type RsvpStatus } from "@/src/lib/constants";
import { getDictionary } from "@/src/lib/i18n";
import { cn } from "@/src/lib/utils";

function buildGuestLocaleUrl(locale: Locale, redirectTo = "/guest") {
  const search = new URLSearchParams({
    locale,
    redirectTo,
  });

  return `/guest/locale?${search.toString()}`;
}

export function PageBackground({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-h-screen bg-[radial-gradient(circle_at_top,_rgba(234,215,196,0.95),_rgba(246,240,234,0.92)_38%,_#f8f3ed_100%)]",
        className,
      )}
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.4),transparent_35%,rgba(91,70,55,0.06))]" />
      {children}
    </div>
  );
}

export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function SurfaceCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-[28px] border border-white/60 bg-white/85 p-5 shadow-[0_24px_80px_rgba(71,50,33,0.08)] backdrop-blur sm:p-6",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8f6e57]">
      {children}
    </p>
  );
}

export function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn("font-serif text-4xl leading-tight text-[#2e2118] sm:text-5xl", className)}>
      {children}
    </h1>
  );
}

export function SubtleText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("text-sm leading-6 text-[#5f4d40] sm:text-base", className)}>{children}</p>;
}

export function buttonClassName({
  secondary = false,
  compact = false,
}: {
  secondary?: boolean;
  compact?: boolean;
} = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-full transition duration-200",
    compact ? "px-4 py-2 text-sm" : "px-5 py-3 text-sm sm:text-base",
    secondary
      ? "border border-[#d7c2b1] bg-white text-[#2f241c] hover:border-[#b4957e] hover:bg-[#faf3ec]"
      : "bg-[#2f241c] text-[#fff7f1] hover:bg-[#4b382b]",
  );
}

export function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "warm" | "success" | "muted";
}) {
  const toneMap = {
    neutral: "bg-[#f3e7da] text-[#6b4d37]",
    warm: "bg-[#f5ddc9] text-[#8b4c22]",
    success: "bg-[#ddebdc] text-[#2d5c32]",
    muted: "bg-[#eee7e0] text-[#68564a]",
  };

  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]", toneMap[tone])}>
      {children}
    </span>
  );
}

export function StatusPill({ status }: { status: RsvpStatus }) {
  const tone =
    status === "attending" ? "success" : status === "declined" ? "muted" : "warm";

  return <Pill tone={tone}>{status}</Pill>;
}

export function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-2">
      <h2 className="font-serif text-2xl text-[#2e2118]">{title}</h2>
      {description ? <SubtleText>{description}</SubtleText> : null}
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-[#3b2d24]">{label}</span>
      {children}
      {hint ? <span className="text-xs text-[#7a685b]">{hint}</span> : null}
    </label>
  );
}

export function inputClassName() {
  return "w-full rounded-2xl border border-[#dbc8bb] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f241c] outline-none transition focus:border-[#ab8566] focus:ring-2 focus:ring-[#edd9c7]";
}

export function textAreaClassName() {
  return `${inputClassName()} min-h-32 resize-y`;
}

export function LanguageSwitcher({
  locale,
  redirectTo,
}: {
  locale: Locale;
  redirectTo?: string;
}) {
  const dictionary = getDictionary(locale);

  return (
    <div className="flex items-center gap-2">
      {(["en", "de"] as const).map((option) => (
        <Link
          key={option}
          href={buildGuestLocaleUrl(option, redirectTo)}
          className={buttonClassName({
            secondary: option !== locale,
            compact: true,
          })}
        >
          {dictionary.switchTo[option]}
        </Link>
      ))}
    </div>
  );
}

export function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-[24px] border border-[#eadbcd] bg-[#fffaf6] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#91705b]">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-[#2f241c]">{value}</p>
    </div>
  );
}

export function DataList({
  items,
}: {
  items: Array<{ label: string; value: React.ReactNode }>;
}) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-[22px] bg-[#faf4ee] p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8f6e57]">
            {item.label}
          </dt>
          <dd className="mt-2 text-sm leading-6 text-[#382b22]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
