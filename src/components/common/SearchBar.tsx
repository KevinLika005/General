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
      <div className={['flex gap-2', compact ? 'items-center' : 'items-stretch'].join(' ')}>
        <label className="relative block w-full">
          <span className="sr-only">Search catalog</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            className={[
              'w-full rounded-xl border border-border bg-surface-card pl-11 text-text shadow-card placeholder:text-text-muted/70 focus:border-brand-gold',
              compact ? 'h-11 pr-4 text-sm' : 'h-12 pr-5 text-sm sm:text-base',
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
              'shrink-0 rounded-xl border border-brand-navy bg-brand-navy px-4 font-semibold text-white transition hover:bg-brand-ink',
              compact ? 'h-11 text-sm' : 'h-12 text-sm',
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
