import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getSiteSearchIndex, searchSite, type SiteSearchResult } from '../utils/siteSearch';
import { normalizeText } from '../utils/filters';

interface UseSiteSearchOptions {
  debounceMs?: number;
  limit?: number;
}

export function useSiteSearch(query: string, options: UseSiteSearchOptions = {}) {
  useTranslation();
  const { debounceMs = 120, limit } = options;
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedQuery(query), debounceMs);
    return () => window.clearTimeout(timeoutId);
  }, [debounceMs, query]);

  const normalizedQuery = useMemo(() => normalizeText(debouncedQuery), [debouncedQuery]);

  getSiteSearchIndex();

  const results: SiteSearchResult[] = normalizedQuery ? searchSite(debouncedQuery, limit) : [];

  return {
    debouncedQuery,
    normalizedQuery,
    results,
  };
}
