import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RafinHomepageLanding } from '../components/magicpath/rafin-homepage';
import {
  getHomepageCategoryPreviews,
  getHomepageStockPreviewProducts,
} from '../data/homepage';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

export function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const quickSearches = t('pages.home.quickSearches', { returnObjects: true }) as string[];
  const categoryPreviews = getHomepageCategoryPreviews();
  const previewProducts = getHomepageStockPreviewProducts();

  usePageMetadata({
    title: t('metadata.home.title'),
    description: t('metadata.home.description'),
  });

  return (
    <RafinHomepageLanding
      categoryPreviews={categoryPreviews}
      onQuickSearch={(term) => navigate(routes.siteSearch(term))}
      onSearchChange={setSearch}
      onSearchSubmit={() =>
        navigate(search.trim() ? routes.siteSearch(search) : routes.search)
      }
      previewProducts={previewProducts}
      quickSearches={quickSearches}
      search={search}
    />
  );
}
