import { Search } from 'lucide-react';
import type { FormEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder: string;
  compact?: boolean;
}

export function SearchBar({
  compact = false,
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
      <label className="relative block w-full">
        <span className="sr-only">Search catalog</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
        <input
          className={[
            'w-full border border-white/10 bg-white/6 pl-11 text-white placeholder:text-white/38 focus:border-rafin-gold/70',
            compact ? 'h-11 pr-4 text-sm' : 'h-12 pr-5 text-sm sm:text-base',
          ].join(' ')}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type="search"
          value={value}
        />
      </label>
    </form>
  );
}
