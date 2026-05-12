import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'gold' | 'green' | 'slate' | 'red' | 'blue' | 'amber';
}

export function Badge({ children, tone = 'slate' }: BadgeProps) {
  const tones = {
    gold: 'border-brand-gold/30 bg-brand-gold/10 text-brand-ink',
    green: 'border-status-available/15 bg-status-available-bg text-status-available',
    slate: 'border-border bg-surface-subtle text-text-muted',
    red: 'border-status-sold/15 bg-status-sold-bg text-status-sold',
    blue: 'border-status-info/15 bg-status-info-bg text-status-info',
    amber: 'border-status-incoming/15 bg-status-incoming-bg text-status-incoming',
  };

  return (
    <span
      className={[
        'inline-flex items-center rounded-[4px] border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em]',
        tones[tone],
      ].join(' ')}
    >
      {children}
    </span>
  );
}
