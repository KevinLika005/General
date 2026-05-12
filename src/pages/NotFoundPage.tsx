import { Button } from '../components/common/Button';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

export function NotFoundPage() {
  usePageMetadata({
    title: 'Page Not Found | Rafin Machinery',
    description: 'The requested catalog page could not be found. Return to the home page or continue browsing active machinery inventory.',
  });

  return (
    <section className="page-shell text-center">
      <div className="border border-border bg-surface-card px-6 py-12 shadow-card">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl text-navy sm:text-5xl">That catalog page does not exist</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-text-muted">
          Return to the home page or continue into the equipment catalog to browse the active Rafin Machinery build.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to={routes.home}>Go Home</Button>
          <Button to={routes.equipment} variant="secondary">
            Browse Catalog
          </Button>
        </div>
      </div>
    </section>
  );
}
