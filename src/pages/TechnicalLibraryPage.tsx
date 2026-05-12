import { FileSearch, FolderOpen, HardHat, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../components/common/Button';
import { SectionHeader } from '../components/common/SectionHeader';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

const libraryGroups = [
  {
    title: 'Operating manuals',
    description: 'Placeholder records for machine operating guides, startup procedures, and usage references.',
    items: ['Excavator operating manual', 'Generator operation guide', 'Cutting tool instruction sheet'],
    icon: FolderOpen,
  },
  {
    title: 'Inspection documents',
    description: 'Placeholder records for inspection notes, walkaround sheets, and pre-delivery review documents.',
    items: ['Inspection checklist', 'Condition summary', 'Visual review record'],
    icon: ShieldCheck,
  },
  {
    title: 'Specification sheets',
    description: 'Placeholder records for product data sheets, technical summaries, and commercial reference sheets.',
    items: ['Machine data sheet', 'Attachment compatibility sheet', 'Support equipment specification'],
    icon: FileSearch,
  },
  {
    title: 'Delivery and contract documents',
    description: 'Placeholder records for delivery scope, handover preparation, and contract-support paperwork.',
    items: ['Delivery scope summary', 'Handover preparation list', 'Commercial reference document'],
    icon: HardHat,
  },
  {
    title: 'Safety and usage documents',
    description: 'Placeholder records for safety instructions, handling guidance, and operator awareness material.',
    items: ['Safety instruction notice', 'Usage precautions', 'Site handling guidance'],
    icon: ShieldCheck,
  },
] as const;

export function TechnicalLibraryPage() {
  const [search, setSearch] = useState('');

  usePageMetadata({
    title: 'Technical Library | Rafin Machinery',
    description: 'Browse placeholder technical-library categories for operating manuals, inspection references, specification sheets, and support documents.',
  });

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return libraryGroups;
    }

    return libraryGroups.filter((group) =>
      [group.title, group.description, ...group.items]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-6 sm:p-8">
          <SectionHeader
            eyebrow="Technical library"
            title="Find technical references, inspection records, and support documents"
            titleAs="h1"
            description="This library is prepared as a Hilti-inspired support surface for Rafin Machinery. Live files are not required yet, but the page is structured for buyers who need clear document paths."
          />
          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
            <label className="block text-sm text-text-muted">
              Search document groups
              <input
                className="field"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search manuals, inspection documents, or spec sheets"
                type="search"
                value={search}
              />
            </label>
            <div className="subtle-panel p-4">
              <p className="line-label">Document request</p>
              <p className="mt-2 text-sm text-text-muted">
                If the exact file is not listed yet, use the request form and mention the product, model, or SKU.
              </p>
              <Button className="mt-4 w-full" to={routes.requestQuote}>
                Request Documents
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredGroups.map((group) => {
            const Icon = group.icon;

            return (
              <article className="surface-panel p-5 sm:p-6" key={group.title}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="line-label">Placeholder group</p>
                    <h2 className="mt-2 text-[2rem] text-brand-navy">{group.title}</h2>
                  </div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-subtle text-brand-navy">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-sm text-text-muted">{group.description}</p>
                <div className="mt-5 grid gap-2">
                  {group.items.map((item) => (
                    <div className="subtle-panel px-4 py-3 text-sm text-text-muted" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 surface-panel p-6 sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
            <div>
              <p className="kicker">Need product-specific support?</p>
              <h2 className="mt-2 text-[2.1rem] text-brand-navy">Ask Rafin for a document pack tied to a specific listing</h2>
              <p className="mt-3 max-w-3xl text-sm text-text-muted">
                Mention the category, model, SKU, or product page in your message and Rafin can prepare the relevant manual, inspection record, specification sheet, or delivery reference.
              </p>
            </div>
            <Button className="w-full" to={routes.contact} variant="dark">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
