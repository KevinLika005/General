import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'primary' | 'green' | 'slate' | 'red' | 'blue' | 'amber';
}

export function Badge({ children, tone = 'slate' }: BadgeProps) {
  const tones = {
    primary: 'border-primary/20 bg-surface-subtle text-primary-dark',
    green: 'border-status-available/15 bg-status-available-bg text-status-available',
    slate: 'border-border bg-surface-subtle text-text-muted',
    red: 'border-status-sold/15 bg-status-sold-bg text-status-sold',
    blue: 'border-status-info/15 bg-status-info-bg text-status-info',
    amber: 'border-status-incoming/15 bg-status-incoming-bg text-status-incoming',
  };

  return (
    <span
      className={[
        'inline-flex items-center rounded-none border px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.06em]',
        tones[tone],
      ].join(' ')}
    >
      {children}
    </span>
  );
}
