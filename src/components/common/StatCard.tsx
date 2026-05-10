interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

export function StatCard({ description, label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface-card px-4 py-4 shadow-card">
      <div className="text-3xl font-extrabold text-brand-navy sm:text-[2.2rem]">{value}</div>
      <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-gold">
        {label}
      </p>
      {description ? <p className="mt-2 text-xs text-text-muted">{description}</p> : null}
    </div>
  );
}
