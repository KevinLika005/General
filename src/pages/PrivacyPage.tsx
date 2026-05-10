import { SectionHeader } from '../components/common/SectionHeader';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function PrivacyPage() {
  usePageMetadata({
    title: 'Privacy | Rafin Machinery',
    description: 'Privacy guidance for website inquiries, contact information, and future production handling for the Rafin Machinery catalog.',
  });

  return (
    <section className="page-shell">
      <SectionHeader
        eyebrow="Privacy"
        title="Privacy notice guidance"
        titleAs="h1"
        description="This frontend build currently keeps form interactions in the browser. Before production launch, Rafin should publish a full privacy notice covering inquiry records, contact data, retention, and follow-up handling."
      />
      <div className="mt-8 rounded-3xl border border-border bg-surface-card p-7 text-text-muted shadow-card">
        Rafin should confirm how inquiry data is stored, who can access it, how long it is retained, and which business systems receive it after a buyer submits a request.
      </div>
    </section>
  );
}
