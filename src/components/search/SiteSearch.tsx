import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../common/SearchBar';
import { useSiteSearch } from '../../hooks/useSiteSearch';
import { normalizeText } from '../../utils/filters';
import { routes } from '../../utils/routes';
import { SearchResultsList } from './SearchResultsList';

interface SiteSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  buttonLabel?: string;
  compact?: boolean;
  maxSuggestions?: number;
  onSubmitQuery?: (query: string) => void;
}

function normalizeQueryForUrl(query: string) {
  return query.trim().replace(/\s+/g, ' ');
}

export function SiteSearch({
  buttonLabel,
  compact = false,
  maxSuggestions = 6,
  onChange,
  onSubmitQuery,
  placeholder,
  value,
}: SiteSearchProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const minSuggestionChars = 2;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownId = useId();
  const { normalizedQuery, results } = useSiteSearch(value, {
    debounceMs: 140,
    limit: maxSuggestions,
  });

  const shouldSearch = normalizedQuery.length >= minSuggestionChars;
  const shouldShowDropdown = open && shouldSearch;
  const activeResult = activeIndex >= 0 ? results[activeIndex] : undefined;

  useEffect(() => {
    setActiveIndex(-1);
  }, [normalizedQuery, results.length]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const submitQuery = (query: string) => {
    const nextQuery = normalizeQueryForUrl(query);

    setOpen(false);
    setActiveIndex(-1);

    if (onSubmitQuery) {
      onSubmitQuery(nextQuery);
      return;
    }

    navigate(nextQuery ? routes.siteSearch(nextQuery) : routes.search);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <SearchBar
        ariaAutocomplete="list"
        ariaActiveDescendant={activeResult ? `${dropdownId}-${activeIndex}` : undefined}
        ariaControls={dropdownId}
        ariaExpanded={shouldShowDropdown}
        autoComplete="off"
        buttonLabel={buttonLabel}
        compact={compact}
        inputName="q"
        inputRef={inputRef}
        label={t('common.accessibility.searchSite')}
        onChange={(nextValue) => {
          onChange(nextValue);
          setOpen(normalizeText(nextValue).length >= minSuggestionChars);
        }}
        onFocus={() => setOpen(normalizeText(value).length >= minSuggestionChars)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false);
            setActiveIndex(-1);
            inputRef.current?.blur();
            return;
          }

          if (event.key === 'ArrowDown') {
            if (!shouldSearch) {
              return;
            }

            event.preventDefault();
            setOpen(true);
            setActiveIndex((current) => {
              if (results.length === 0) {
                return -1;
              }

              return current >= results.length - 1 ? 0 : current + 1;
            });
            return;
          }

          if (event.key === 'ArrowUp') {
            if (!shouldSearch) {
              return;
            }

            event.preventDefault();
            setOpen(true);
            setActiveIndex((current) => {
              if (results.length === 0) {
                return -1;
              }

              return current <= 0 ? results.length - 1 : current - 1;
            });
            return;
          }

          if (event.key === 'Enter' && activeResult) {
            event.preventDefault();
            navigate(activeResult.href);
            setOpen(false);
            setActiveIndex(-1);
          }
        }}
        onSubmit={() => submitQuery(value)}
        placeholder={placeholder}
        value={value}
      />

      {shouldShowDropdown ? (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[min(70vh,28rem)] overflow-y-auto border border-border bg-surface-card p-3 shadow-dropdown"
          id={dropdownId}
          role="listbox"
        >
          <div className="mb-3 flex items-center justify-between gap-3 border-b border-border pb-3">
            <p className="line-label">{t('pages.search.suggestionsLabel')}</p>
            {shouldSearch ? (
              <button
                className="text-xs font-semibold text-primary underline decoration-primary underline-offset-4"
                onClick={() => submitQuery(value)}
                type="button"
              >
                {t('pages.search.viewAllResults')}
              </button>
            ) : null}
          </div>

          {results.length > 0 ? (
            <SearchResultsList
              activeIndex={activeIndex}
              listIdPrefix={dropdownId}
              onResultClick={() => {
                setOpen(false);
                setActiveIndex(-1);
              }}
              results={results}
              variant="dropdown"
            />
          ) : (
            <div className="border border-dashed border-border bg-surface-subtle px-4 py-5 text-sm text-text-muted">
              {t('pages.search.noResultsDescription', { query: value.trim() })}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
