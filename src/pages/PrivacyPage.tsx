import { SectionHeader } from '../components/common/SectionHeader';

export function PrivacyPage() {
  return (
    <section className="section-shell py-16 sm:py-20">
      <SectionHeader
        eyebrow="Privacy"
        title="Preview privacy notice"
        description="This frontend preview does not submit data to a backend. Form interactions stay local in the browser and success messages are simulated for UX purposes."
      />
      <div className="mt-8 border border-white/10 bg-rafin-panel p-7 text-rafin-muted-light">
        When production handling is added, Rafin should publish a full privacy notice covering contact data, inquiry records, storage, retention, and any CRM or email processing used after submission.
      </div>
    </section>
  );
}
