import { Button } from '../components/common/Button';
import { SectionHeader } from '../components/common/SectionHeader';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

export function DeliveryInspectionPage() {
  usePageMetadata({
    title: 'Delivery and Inspection | Rafin Machinery',
    description: 'See how Rafin supports machine inspection, delivery planning, export coordination, and commercial handover after a buyer inquiry.',
  });

  const points = [
    'Inspection appointment coordination',
    'Machine condition review and commercial clarifications',
    'Transport planning for local or export delivery',
    'Required documentation and invoice support',
    'Local delivery or export planning support',
    'Direct contact with sales before final contract handling',
  ];

  return (
    <>
      <section className="page-shell">
        <SectionHeader
          description="Rafin can coordinate practical next steps after a buyer identifies the right product. This includes inspection discussion, transport planning, and commercial document preparation."
          eyebrow="Delivery & inspection"
          title="Support around inspection, logistics, and handover"
          titleAs="h1"
        />
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-4 lg:grid-cols-2">
          {points.map((point) => (
            <article className="toolbar-panel p-4 text-sm text-text-muted shadow-card" key={point}>
              {point}
            </article>
          ))}
        </div>

        <div className="mt-8 surface-panel p-5 shadow-card">
          <h2 className="text-[1.3rem] text-navy">What this page does and does not promise</h2>
          <p className="mt-3 text-sm text-text-muted">
            The website helps buyers understand that inspection and logistics can be discussed. Final schedules, delivery cost, export scope, and handover details are confirmed directly with Rafin after inquiry.
          </p>
        </div>

        <div className="mt-8">
          <Button to={routes.contact}>Contact Sales</Button>
        </div>
      </section>
    </>
  );
}
