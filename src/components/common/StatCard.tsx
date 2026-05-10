interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

export function StatCard({ description, label, value }: StatCardProps) {
  return (
    <div className="border border-white/10 bg-white/[0.04] px-4 py-4">
      <div className="text-3xl font-extrabold text-white sm:text-[2.2rem]">{value}</div>
      <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-rafin-gold-soft">
        {label}
      </p>
      {description ? <p className="mt-2 text-xs text-white/62">{description}</p> : null}
    </div>
  );
}
