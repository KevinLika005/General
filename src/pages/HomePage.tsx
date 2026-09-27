import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GeneralHomepageLanding } from '../components/magicpath/general-homepage';
import {
  getHomepageCategoryPreviews,
  getHomepageStockPreviewProducts,
} from '../data/homepage';
import { routes } from '../utils/routes';

export function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const quickSearches = t('pages.home.quickSearches', { returnObjects: true }) as string[];
  const categoryPreviews = getHomepageCategoryPreviews();
  const previewProducts = getHomepageStockPreviewProducts();

  return (
    <GeneralHomepageLanding
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
