import { Button } from '../components/common/Button';
import { SectionHeader } from '../components/common/SectionHeader';
import { routes } from '../utils/routes';

export function DeliveryInspectionPage() {
  const points = [
    'Inspection appointment coordination',
    'Machine condition review and commercial clarifications',
    'Transport planning for local or export delivery',
    'Required documentation and invoice support',
    'Local delivery or export placeholder planning',
    'Direct contact with sales before final contract handling',
  ];

  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <SectionHeader
          description="Rafin can coordinate practical next steps after a buyer identifies the right product. This includes inspection discussion, transport planning, and commercial document preparation."
          eyebrow="Delivery & Inspection"
          title="Support around inspection, logistics, and handover"
        />
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-5 lg:grid-cols-2">
          {points.map((point) => (
            <article className="border border-white/10 bg-rafin-panel p-5 text-rafin-muted-light" key={point}>
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
