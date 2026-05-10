import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'gold' | 'green' | 'slate' | 'red';
}

export function Badge({ children, tone = 'slate' }: BadgeProps) {
  const tones = {
    gold: 'border-rafin-gold/35 bg-rafin-gold/10 text-rafin-gold-soft',
    green: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    slate: 'border-white/10 bg-white/5 text-white/68',
    red: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
  };

  return (
    <span
      className={[
        'inline-flex items-center border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em]',
        tones[tone],
      ].join(' ')}
    >
      {children}
    </span>
  );
}
