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
        <div className="grid gap-5 lg:grid-cols-2">
          {points.map((point) => (
            <article className="rounded-3xl border border-border bg-surface-card p-5 text-text-muted shadow-card" key={point}>
              {point}
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Button to={routes.contact}>Contact Sales</Button>
        </div>
      </section>
    </>
  );
}
