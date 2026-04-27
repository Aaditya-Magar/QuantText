import { useEffect, useState } from "react";

interface StatCardProps {
  label: string;
  value: number;
  hint?: string;
  icon: React.ReactNode;
  accent?: "primary" | "accent" | "muted";
}

export function StatCard({ label, value, hint, icon, accent = "primary" }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    setDisplayValue(value);
    setPulse((p) => p + 1);
  }, [value]);

  const accentRing =
    accent === "primary"
      ? "from-primary/20 to-primary-glow/10"
      : accent === "accent"
        ? "from-accent/20 to-primary/10"
        : "from-muted to-muted";

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elegant`}
    >
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${accentRing} blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-70`}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
          {icon}
        </div>
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="relative mt-4">
        <div
          key={pulse}
          className="animate-count font-mono text-4xl font-semibold tracking-tight text-foreground tabular-nums"
        >
          {displayValue.toLocaleString()}
        </div>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
}
