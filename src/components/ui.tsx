import { cn } from "@/src/lib/utils";

// ---------------------------------------------------------------------------
// Wedding / Public primitives
// ---------------------------------------------------------------------------

export function WeddingShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "relative min-h-screen bg-cream text-ink",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-sage-light)_0%,transparent_50%)] opacity-40" />
      {children}
    </main>
  );
}

export function PaperPanel({
  children,
  className,
  as: Element = "section",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
}) {
  return (
    <Element
      className={cn(
        "rounded-2xl border border-border bg-paper p-5 shadow-[0_2px_12px_rgba(107,124,94,0.06)] sm:p-6",
        className,
      )}
    >
      {children}
    </Element>
  );
}

export function InkButton({
  children,
  variant = "primary",
  compact = false,
  className,
  ...rest
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  compact?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        inkButtonClassName({ variant, compact }),
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function inkButtonClassName({
  variant = "primary",
  compact = false,
}: {
  variant?: "primary" | "secondary" | "ghost";
  compact?: boolean;
} = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-full font-medium transition duration-200",
    compact ? "px-4 py-2 text-sm" : "px-5 py-3 text-sm sm:text-base",
    variant === "primary" && "bg-sage text-paper hover:bg-forest",
    variant === "secondary" && "border border-border-sage bg-paper text-ink hover:border-sage hover:bg-sage-light",
    variant === "ghost" && "text-sage underline decoration-border-sage underline-offset-4 hover:text-forest",
  );
}

export function InkBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "warm" | "success" | "muted";
}) {
  const toneMap = {
    neutral: "bg-sage-light text-forest",
    warm: "bg-champagne text-ink-light",
    success: "bg-success-bg text-success-text",
    muted: "bg-cream-dark text-sage-muted",
  };

  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-medium tracking-wide", toneMap[tone])}>
      {children}
    </span>
  );
}

export function AccentLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-[family-name:var(--font-accent)] text-lg text-sage-muted", className)}>
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Admin primitives — same palette, no decoration
// ---------------------------------------------------------------------------

export function AdminShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-screen bg-cream", className)}>
      {children}
    </div>
  );
}

export function AdminPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-paper p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Shared typography — used by both public and admin
// ---------------------------------------------------------------------------

export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto flex w-full max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-medium uppercase tracking-[0.22em] text-sage-muted", className)}>
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
    <h1 className={cn("font-serif text-4xl leading-tight text-ink sm:text-5xl", className)}>
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
  return <p className={cn("text-sm leading-relaxed text-ink-light sm:text-base", className)}>{children}</p>;
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
      <h2 className="font-serif text-2xl text-ink">{title}</h2>
      {description ? <SubtleText>{description}</SubtleText> : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared form primitives
// ---------------------------------------------------------------------------

export function Field({
  label,
  children,
  hint,
  error,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {error ? <span className="text-xs text-error-text">{error}</span> : null}
      {hint ? <span className="text-xs text-sage-muted">{hint}</span> : null}
    </label>
  );
}

export function inputClassName({ error = false }: { error?: boolean } = {}) {
  return cn(
    "w-full rounded-xl border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:ring-2",
    error
      ? "border-error-text focus:border-error-text focus:ring-red-100"
      : "border-border focus:border-sage focus:ring-sage-light",
  );
}

export function textAreaClassName({ error = false }: { error?: boolean } = {}) {
  return cn(inputClassName({ error }), "min-h-32 resize-y");
}

// ---------------------------------------------------------------------------
// Shared data display
// ---------------------------------------------------------------------------

export function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-border bg-paper p-4">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage-muted">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-ink">{value}</p>
    </div>
  );
}

export function DataList({
  items,
}: {
  items: Array<{ label: string; value: React.ReactNode }>;
}) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl bg-cream p-4">
          <dt className="text-xs font-medium uppercase tracking-[0.18em] text-sage-muted">
            {item.label}
          </dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

// ---------------------------------------------------------------------------
// Legacy bridge exports — maps old names to new components so existing
// admin code keeps working without changing every import at once.
// ---------------------------------------------------------------------------

export function PageBackground({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <AdminShell className={className}>{children}</AdminShell>;
}

export function SurfaceCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <AdminPanel className={className}>{children}</AdminPanel>;
}

export function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "warm" | "success" | "muted";
}) {
  return <InkBadge tone={tone}>{children}</InkBadge>;
}

export function buttonClassName({
  secondary = false,
  compact = false,
}: {
  secondary?: boolean;
  compact?: boolean;
} = {}) {
  return inkButtonClassName({
    variant: secondary ? "secondary" : "primary",
    compact,
  });
}
