import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { normalizeText } from '../utils/filters';
import type { SiteSearchResult } from '../utils/siteSearch';

interface UseSiteSearchOptions {
  debounceMs?: number;
  limit?: number;
}

type SiteSearchModule = typeof import('../utils/siteSearch');

let siteSearchModulePromise: Promise<SiteSearchModule> | null = null;

function loadSiteSearchModule() {
  if (!siteSearchModulePromise) {
    siteSearchModulePromise = import('../utils/siteSearch');
  }

  return siteSearchModulePromise;
}

export function preloadSiteSearch() {
  void loadSiteSearchModule();
}

export function useSiteSearch(query: string, options: UseSiteSearchOptions = {}) {
  const { i18n } = useTranslation();
  const { debounceMs = 120, limit } = options;
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [results, setResults] = useState<SiteSearchResult[]>([]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedQuery(query), debounceMs);
    return () => window.clearTimeout(timeoutId);
  }, [debounceMs, query]);

  const normalizedQuery = useMemo(() => normalizeText(debouncedQuery), [debouncedQuery]);

  useEffect(() => {
    let cancelled = false;

    if (!normalizedQuery) {
      setResults([]);
      return () => {
        cancelled = true;
      };
    }

    void (async () => {
      const { getSiteSearchIndex, searchSite } = await loadSiteSearchModule();

      getSiteSearchIndex();
      const nextResults = searchSite(debouncedQuery, limit);

      if (!cancelled) {
        setResults(nextResults);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, i18n.resolvedLanguage, limit, normalizedQuery]);

  return {
    debouncedQuery,
    normalizedQuery,
    results,
  };
}
