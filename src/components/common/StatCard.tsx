interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

export function StatCard({ description, label, value }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface-card px-4 py-4">
      <div className="text-3xl font-extrabold text-navy sm:text-[2.1rem]">{value}</div>
      <p className="mt-2 text-[0.8125rem] font-medium text-text-muted">
        {label}
      </p>
      {description ? <p className="mt-2 text-xs text-text-muted">{description}</p> : null}
    </div>
  );
}
