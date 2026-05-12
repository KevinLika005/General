import { Search } from 'lucide-react';
import type { FormEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder: string;
  compact?: boolean;
  buttonLabel?: string;
}

export function SearchBar({
  compact = false,
  buttonLabel,
  onChange,
  onSubmit,
  placeholder,
  value,
}: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} role="search">
      <div
        className={[
          'flex gap-2',
          compact ? 'items-center' : 'flex-col items-stretch sm:flex-row sm:items-stretch',
        ].join(' ')}
      >
        <label className="relative block w-full">
          <span className="sr-only">Search catalog</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            className={[
              'w-full rounded-[6px] border border-border bg-surface-card pl-11 text-text shadow-card placeholder:text-text-muted/70 focus:border-brand-gold',
              compact ? 'h-11 pr-4 text-sm' : 'h-14 min-h-[3.5rem] pr-5 text-sm sm:text-base',
            ].join(' ')}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            type="search"
            value={value}
          />
        </label>
        {onSubmit ? (
          <button
            className={[
              'shrink-0 rounded-[6px] border border-brand-navy bg-brand-navy px-5 text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-brand-ink',
              compact ? 'h-11' : 'min-h-[3.5rem] sm:min-w-[10rem]',
            ].join(' ')}
            type="submit"
          >
            {buttonLabel ?? 'Search'}
          </button>
        ) : null}
      </div>
    </form>
  );
}
