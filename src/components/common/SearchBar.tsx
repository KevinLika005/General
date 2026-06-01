import { Search } from 'lucide-react';
import type { FormEvent, InputHTMLAttributes, KeyboardEventHandler, Ref } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder: string;
  compact?: boolean;
  buttonLabel?: string;
  label?: string;
  inputRef?: Ref<HTMLInputElement>;
  inputId?: string;
  inputName?: string;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete'];
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaAutocomplete?: InputHTMLAttributes<HTMLInputElement>['aria-autocomplete'];
  ariaActiveDescendant?: string;
  onFocus?: InputHTMLAttributes<HTMLInputElement>['onFocus'];
  onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

export function SearchBar({
  ariaAutocomplete,
  ariaActiveDescendant,
  ariaControls,
  ariaExpanded,
  autoComplete,
  inputId,
  inputName,
  inputRef,
  compact = false,
  buttonLabel,
  label,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  onSubmit,
  placeholder,
  value,
}: SearchBarProps) {
  const { t } = useTranslation();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} role="search">
      <div
        className={[
          'flex gap-2',
          compact ? 'items-center' : 'flex-col items-stretch lg:flex-row lg:items-stretch',
        ].join(' ')}
      >
        <label className="relative block w-full">
          <span className="sr-only">{label ?? t('common.accessibility.searchCatalog')}</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            className={[
              'w-full rounded-none border border-border bg-surface-card pl-10 text-text shadow-none placeholder:text-text-muted/70 focus:border-primary',
              compact ? 'h-11 pr-4 text-sm' : 'h-12 min-h-[3rem] pr-4 text-sm md:text-[0.95rem]',
            ].join(' ')}
            aria-autocomplete={ariaAutocomplete}
            aria-activedescendant={ariaActiveDescendant}
            aria-controls={ariaControls}
            aria-expanded={ariaExpanded}
            autoComplete={autoComplete}
            id={inputId}
            name={inputName}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            ref={inputRef}
            type="search"
            value={value}
          />
        </label>
        {onSubmit ? (
          <button
            className={[
              'shrink-0 rounded-none border border-primary bg-primary px-4 text-[0.8rem] font-semibold text-text-on-dark transition hover:border-primary-hover hover:bg-primary-hover',
              compact ? 'h-11' : 'min-h-[3rem] lg:min-w-[9rem]',
            ].join(' ')}
            type="submit"
          >
            {buttonLabel ?? t('common.actions.search')}
          </button>
        ) : null}
      </div>
    </form>
  );
}
