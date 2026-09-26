// @vitest-environment jsdom
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import { beforeAll, describe, expect, it } from 'vitest';
import { CatalogResults } from '../src/components/common/CatalogResults';
import { DataPlate } from '../src/components/common/DataPlate';
import { FilterSidebar } from '../src/components/common/FilterSidebar';
import { ProductCard } from '../src/components/common/ProductCard';
import { Header } from '../src/components/layout/Header';
import { GeneralHomepageLanding } from '../src/components/magicpath/general-homepage';
import { InquiryProvider } from '../src/context/InquiryContext';
import { ThemeProvider } from '../src/context/ThemeContext';
import { getProducts } from '../src/data/catalog';
import { getHomepageCategoryPreviews, getHomepageStockPreviewProducts } from '../src/data/homepage';
import { useCatalogFilters } from '../src/hooks/useCatalogFilters';
import i18n from '../src/i18n/config';
import { ProductDetailPage } from '../src/pages/ProductDetailPage';
import type { DataPlateCell } from '../src/utils/dataPlate';

beforeAll(() => {
  window.matchMedia ??= ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
  window.scrollTo = () => undefined;
});

const t = (key: string) => i18n.t(key);

function Providers({ children, route = '/' }: { children: ReactNode; route?: string }) {
  return (
    <ThemeProvider>
      <InquiryProvider>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </InquiryProvider>
    </ThemeProvider>
  );
}

function SidebarHarness() {
  const catalog = useCatalogFilters(getProducts());
  return (
    <FilterSidebar
      clearAllFilters={catalog.clearAllFilters}
      filters={catalog.filters}
      optionSets={catalog.optionSets}
      setFilters={catalog.setFilters}
    />
  );
}

function groupTitled(container: HTMLElement, title: string) {
  const summary = [...container.querySelectorAll('summary')].find((node) => node.textContent?.trim() === title);
  if (!summary) throw new Error(`No filter group titled "${title}"`);
  return summary.parentElement as HTMLDetailsElement;
}

describe('filter sidebar', () => {
  it('keeps a filter group open when its value is cleared while typing', () => {
    const { container } = render(<SidebarHarness />);
    const yearGroup = groupTitled(container, t('common.labels.year'));
    const yearFrom = yearGroup.querySelector('input') as HTMLInputElement;

    fireEvent.change(yearFrom, { target: { value: '2019' } });
    expect(yearGroup.open).toBe(true);

    fireEvent.change(yearFrom, { target: { value: '' } });
    expect(yearGroup.open).toBe(true);
  });

  it('gives tags and mileage their own groups', () => {
    const { container } = render(<SidebarHarness />);
    expect(groupTitled(container, t('common.labels.tags')).querySelector('select')).not.toBeNull();
    expect(groupTitled(container, t('common.labels.mileageUnder')).querySelector('input')).not.toBeNull();
    expect(groupTitled(container, t('common.labels.location')).querySelectorAll('select')).toHaveLength(1);
  });

  it('shows a visible label on every category select', () => {
    const { container } = render(<SidebarHarness />);
    const selects = groupTitled(container, t('common.labels.category')).querySelectorAll('select');
    const visibleLabels = [...selects].map((select) => select.closest('label')?.textContent?.replace(select.textContent ?? '', '').trim());
    expect(visibleLabels).toEqual([
      t('common.labels.category'),
      t('common.labels.subcategory'),
      t('common.labels.productType'),
    ]);
  });
});

describe('category filter count', () => {
  it('does not count the fixed category of a category page as an applied filter', () => {
    const { result } = renderHook(() => useCatalogFilters(getProducts(), { fixedCategory: 'heavy-equipment' }));
    expect(result.current.appliedFilters.map((filter) => filter.key)).not.toContain('category');
  });
});

describe('data plate', () => {
  const cells = (count: number): DataPlateCell[] =>
    (['year', 'hours', 'capacity', 'power', 'weight', 'location'] as const)
      .slice(0, count)
      .map((key) => ({ key, value: key }));
  const lastCellClass = (count: number) => {
    const { container, unmount } = render(<DataPlate cells={cells(count)} variant="detail" />);
    const className = (container.querySelector('dl > div:last-child') as HTMLElement).className;
    unmount();
    return className.split(/\s+/);
  };

  it('stretches the last detail cell so no row ends in an empty slot', () => {
    expect(lastCellClass(4)).toEqual(expect.arrayContaining(['col-span-1', 'md:col-span-3']));
    expect(lastCellClass(5)).toEqual(expect.arrayContaining(['col-span-2', 'md:col-span-2']));
    expect(lastCellClass(6)).toEqual(expect.arrayContaining(['col-span-1', 'md:col-span-1']));
  });
});

describe('product card', () => {
  it('draws a visible focus ring on the card when its link is keyboard-focused', () => {
    const { container } = render(
      <Providers>
        <ProductCard product={getProducts()[0]} />
      </Providers>,
    );
    expect((container.querySelector('article') as HTMLElement).className).toContain('has-[a:focus-visible]:ring-2');
  });
});

function gridOf(container: HTMLElement) {
  return (container.querySelector('article') as HTMLElement).parentElement as HTMLElement;
}

describe('product grids', () => {
  it('lays the homepage stock row out in fixed columns, four across on wide screens', () => {
    const { container } = render(
      <Providers>
        <GeneralHomepageLanding
          categoryPreviews={getHomepageCategoryPreviews()}
          onQuickSearch={() => undefined}
          onSearchChange={() => undefined}
          onSearchSubmit={() => undefined}
          previewProducts={getHomepageStockPreviewProducts()}
          quickSearches={[]}
          search=""
        />
      </Providers>,
    );
    const grid = gridOf(container);
    expect(grid.className).toContain('2xl:grid-cols-4');
    expect(grid.className).not.toContain('product-grid');
  });

  it('lays related products out in fixed columns', () => {
    const product = getProducts()[0];
    const { container } = render(
      <Providers route={`/equipment/${product.categorySlug}/${product.slug}`}>
        <Routes>
          <Route element={<ProductDetailPage />} path="/equipment/:categorySlug/:productSlug" />
        </Routes>
      </Providers>,
    );
    const related = [...container.querySelectorAll('article')].at(-1)?.parentElement as HTMLElement;
    expect(related.className).toContain('2xl:grid-cols-4');
    expect(related.className).not.toContain('product-grid');
  });

  it('uses spec column counts in the catalog results grid', () => {
    function Harness() {
      const catalog = useCatalogFilters(getProducts());
      return (
        <CatalogResults
          catalog={catalog}
          clearLabel="clear"
          emptyState={null}
          mobileFiltersLabel="filters"
          resultLabel="results"
        />
      );
    }
    const { container } = render(
      <Providers>
        <Harness />
      </Providers>,
    );
    const grid = gridOf(container.querySelector('.min-w-0') as HTMLElement);
    expect(grid.className.split(/\s+/)).toEqual(
      expect.arrayContaining(['md:grid-cols-2', '2xl:grid-cols-3', '3xl:grid-cols-4']),
    );
  });
});

describe('mobile header', () => {
  it('shows the inquiry count on the compact inquiry button', async () => {
    render(
      <Providers>
        <Header inquiryCount={3} onOpenInquirySummary={() => undefined} />
      </Providers>,
    );
    await act(async () => undefined);
    const compactButtons = screen
      .getAllByRole('button', { name: t('common.accessibility.openInquirySummary') })
      .filter((button) => button.className.includes('md:hidden'));
    expect(compactButtons).toHaveLength(1);
    expect(compactButtons[0].textContent).toContain('3');
  });
});
