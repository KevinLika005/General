import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge } from '../common/Badge';
import { ImageWithFallback } from '../common/ImageWithFallback';
import type { SiteSearchResult, SiteSearchResultType } from '../../utils/siteSearch';

interface SearchResultsListProps {
  activeIndex?: number;
  listIdPrefix?: string;
  results: SiteSearchResult[];
  variant?: 'dropdown' | 'page';
  onResultClick?: () => void;
}

function getBadgeTone(type: SiteSearchResultType) {
  if (type === 'product') return 'primary';
  if (type === 'category') return 'blue';
  if (type === 'service') return 'green';
  if (type === 'solution') return 'amber';
  return 'slate';
}

export function SearchResultsList({
  activeIndex = -1,
  listIdPrefix,
  onResultClick,
  results,
  variant = 'page',
}: SearchResultsListProps) {
  const { t } = useTranslation();
  const isDropdown = variant === 'dropdown';
  const getTypeLabel = (type: SiteSearchResultType) => t(`pages.search.types.${type}`);

  return (
    <div className={isDropdown ? 'grid gap-2' : 'grid gap-4'}>
      {results.map((result, index) => {
        const hasImage = Boolean(result.image);
        const isActive = index === activeIndex;

        return (
          <Link
            className={[
              'group border border-border bg-surface-card transition hover:border-primary hover:bg-surface-subtle focus-visible:border-primary',
              isActive ? 'border-primary bg-surface-subtle' : '',
              isDropdown ? 'px-3 py-3' : 'overflow-hidden',
            ].join(' ')}
            id={listIdPrefix ? `${listIdPrefix}-${index}` : undefined}
            key={result.id}
            onClick={onResultClick}
            role={isDropdown ? 'option' : undefined}
            aria-selected={isDropdown ? isActive : undefined}
            to={result.href}
          >
            <div className={[
              hasImage && !isDropdown ? 'grid gap-0 sm:grid-cols-[9.5rem_minmax(0,1fr)]' : 'grid gap-0',
            ].join(' ')}>
              {hasImage && !isDropdown ? (
                <ImageWithFallback
                  alt={result.title}
                  aspectRatio="square"
                  className="h-full min-h-full border-0 border-r"
                  imageClassName="h-full w-full object-cover"
                  src={result.image}
                />
              ) : null}
              <div className={isDropdown ? 'flex min-w-0 items-start gap-3' : 'p-4 sm:p-5'}>
                {hasImage && isDropdown ? (
                  <ImageWithFallback
                    alt={result.title}
                    aspectRatio="square"
                    className="h-16 w-16 shrink-0"
                    imageClassName="h-full w-full object-cover"
                    src={result.image}
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={getBadgeTone(result.type)}>{getTypeLabel(result.type)}</Badge>
                    <p className={[
                      'min-w-0 text-navy transition group-hover:text-primary-dark',
                      isDropdown ? 'text-sm font-semibold' : 'text-[1.08rem] font-semibold sm:text-[1.18rem]',
                    ].join(' ')}>
                      {result.title}
                    </p>
                  </div>
                  <p className={[
                    'mt-2 text-text-muted',
                    isDropdown ? 'text-xs leading-5' : 'text-sm sm:text-[0.95rem]',
                  ].join(' ')}>
                    {result.description}
                  </p>
                  {!isDropdown ? (
                    <p className="mt-3 truncate text-xs text-text-muted">
                      {result.href}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
