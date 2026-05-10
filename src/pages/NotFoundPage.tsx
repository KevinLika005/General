import { routes } from '../utils/routes';
import { Button } from '../components/common/Button';

export function NotFoundPage() {
  return (
    <section className="section-shell py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-5xl text-white sm:text-6xl">That machinery page does not exist</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-rafin-muted-light">
        Return to the home page or continue into the equipment catalog to browse the active Rafin Machinery build.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to={routes.home}>Go Home</Button>
        <Button to={routes.equipment} variant="secondary">
          Browse Equipment
        </Button>
      </div>
    </section>
  );
}
