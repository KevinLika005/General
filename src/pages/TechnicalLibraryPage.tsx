import { ChevronDown, FileSearch, FolderOpen, HardHat, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/common/Button';
import { SectionHeader } from '../components/common/SectionHeader';
import { getTechnicalLibraryGroups } from '../data/technicalLibrary';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

const iconMap = {
  manuals: FolderOpen,
  'spec-sheets': FileSearch,
  inspection: ShieldCheck,
  'delivery-contract': HardHat,
  safety: ShieldCheck,
} as const;

export function TechnicalLibraryPage() {
  const { t } = useTranslation();
  const technicalLibraryGroups = getTechnicalLibraryGroups();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(technicalLibraryGroups[0]?.key ?? null);

  usePageMetadata({
    title: t('metadata.technicalLibrary.title'),
    description: t('metadata.technicalLibrary.description'),
  });

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return technicalLibraryGroups;
    }

    return technicalLibraryGroups.filter((group) =>
      [group.title, group.description, ...group.items]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [search, technicalLibraryGroups]);

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-5 sm:p-6">
          <SectionHeader
            eyebrow={t('pages.technicalLibrary.eyebrow')}
            title={t('pages.technicalLibrary.title')}
            titleAs="h1"
            description={t('pages.technicalLibrary.description')}
          />
          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
            <label className="block text-sm text-text-muted">
              {t('common.labels.searchDocumentGroups')}
              <input
                className="field"
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t('pages.technicalLibrary.searchPlaceholder')}
                type="search"
                value={search}
              />
            </label>
            <div className="subtle-panel p-4">
              <p className="line-label">{t('common.labels.documentRequest')}</p>
              <p className="mt-2 text-sm text-text-muted">
                {t('pages.technicalLibrary.requestNote')}
              </p>
              <Button className="mt-4 w-full" to={routes.requestQuote}>
                {t('common.actions.requestDocuments')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="wide-shell pb-24">
        <div className="grid gap-4 3xl:grid-cols-2">
          {filteredGroups.map((group) => {
            const Icon = iconMap[group.key];
            const isExpanded = expanded === group.key;

            return (
              <article className="surface-panel p-5" key={group.key}>
                <div className="hidden items-start justify-between gap-4 xl:flex">
                  <div>
                    <p className="line-label">{t('common.status.placeholderGroup')}</p>
                    <h2 className="mt-2 max-w-[18ch] text-[clamp(1.25rem,1rem+0.7vw,1.55rem)] text-navy">{group.title}</h2>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center border border-border bg-surface-subtle text-navy">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <button
                  aria-controls={`library-group-${group.key}`}
                  aria-expanded={isExpanded}
                  className="flex min-h-11 w-full items-start justify-between gap-4 xl:hidden"
                  onClick={() => setExpanded(isExpanded ? null : group.key)}
                  type="button"
                >
                  <div className="text-left">
                    <p className="line-label">{t('common.status.placeholderGroup')}</p>
                    <h2 className="mt-2 text-[1.25rem] text-navy">{group.title}</h2>
                  </div>
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center border border-border bg-surface-subtle text-navy">
                      <Icon className="h-4 w-4" />
                    </span>
                    <ChevronDown className={['h-5 w-5 text-primary transition', isExpanded ? 'rotate-180' : ''].join(' ')} />
                  </span>
                </button>
                <p className="text-measure mt-3 text-sm text-text-muted">{group.description}</p>
                <div className={['mt-5 grid gap-2', isExpanded ? '' : 'hidden xl:grid'].join(' ')} id={`library-group-${group.key}`}>
                  {group.items.map((item) => (
                    <div className="subtle-panel px-4 py-3 text-sm text-text-muted" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 surface-panel p-5 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
            <div>
              <p className="kicker">{t('pages.technicalLibrary.cta.eyebrow')}</p>
              <h2 className="mt-2 max-w-[20ch] text-[clamp(1.4rem,1rem+0.8vw,1.9rem)] text-navy">{t('pages.technicalLibrary.cta.title')}</h2>
              <p className="text-measure mt-3 text-sm text-text-muted">
                {t('pages.technicalLibrary.cta.description')}
              </p>
            </div>
            <Button className="w-full" to={routes.contact} variant="dark">
              {t('common.actions.contactSupport')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
