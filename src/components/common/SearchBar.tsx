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
          compact ? 'items-center' : 'flex-col items-stretch md:flex-row md:items-stretch',
        ].join(' ')}
      >
        <label className="relative block w-full">
          <span className="sr-only">Search catalog</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            className={[
              'w-full rounded-none border border-border bg-surface-card pl-10 text-text shadow-none placeholder:text-text-muted/70 focus:border-primary',
              compact ? 'h-11 pr-4 text-sm' : 'h-12 min-h-[3rem] pr-4 text-sm md:text-[0.95rem]',
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
              'shrink-0 rounded-none border border-primary bg-primary px-4 text-[0.8rem] font-semibold text-text-on-dark transition hover:border-primary-hover hover:bg-primary-hover',
              compact ? 'h-11' : 'min-h-[3rem] md:min-w-[9rem]',
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
