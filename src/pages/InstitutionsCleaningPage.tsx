import {
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/common/Button';
import { SectionHeader } from '../components/common/SectionHeader';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

interface DetailItem {
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

function InstitutionCleaningVisual() {
  const { t } = useTranslation();
  const visualTiles = t('pages.institutionsCleaning.hero.visualTiles', {
    returnObjects: true,
  }) as string[];

  return (
    <div className="surface-panel relative overflow-hidden p-6 shadow-card sm:p-8">
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-brand-gold-soft"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 left-[-2.5rem] h-44 w-44 rounded-full border border-primary/15 bg-primary/5"
      />

      <div className="relative">
        <div className="mb-6 inline-flex items-center gap-2 border border-primary/20 bg-brand-gold-soft px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary-dark">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {t('pages.institutionsCleaning.hero.visualBadge')}
        </div>

        <svg
          aria-hidden="true"
          className="h-auto w-full"
          viewBox="0 0 420 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="rgb(244 240 233)" height="320" rx="28" width="420" />
          <path
            d="M57 266h304"
            stroke="rgb(211 201 186)"
            strokeLinecap="round"
            strokeWidth="8"
          />
          <path
            d="M95 266V118c0-8.837 7.163-16 16-16h78c8.837 0 16 7.163 16 16v148"
            fill="rgb(255 255 255)"
            stroke="rgb(39 37 33)"
            strokeWidth="8"
          />
          <path
            d="M217 266V88c0-8.837 7.163-16 16-16h76c8.837 0 16 7.163 16 16v178"
            fill="rgb(237 231 219)"
            stroke="rgb(39 37 33)"
            strokeWidth="8"
          />
          <path
            d="M119 134h24v24h-24zm39 0h24v24h-24zm-39 42h24v24h-24zm39 0h24v24h-24zm83-46h21v21h-21zm39 0h21v21h-21zm-39 38h21v21h-21zm39 0h21v21h-21z"
            fill="rgb(191 136 36)"
            opacity="0.78"
          />
          <path
            d="M153 266v-44c0-6.627 5.373-12 12-12h16c6.627 0 12 5.373 12 12v44"
            fill="rgb(246 238 223)"
            stroke="rgb(39 37 33)"
            strokeWidth="8"
          />
          <circle
            cx="327"
            cy="219"
            fill="rgb(246 238 223)"
            r="46"
            stroke="rgb(191 136 36)"
            strokeWidth="8"
          />
          <path
            d="m307 219 13 13 28-32"
            fill="none"
            stroke="rgb(112 75 15)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="10"
          />
          <path
            d="M306 61v18M297 70h18M343 96v14M336 103h14M74 82v14M67 89h14"
            stroke="rgb(191 136 36)"
            strokeLinecap="round"
            strokeWidth="6"
          />
        </svg>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {visualTiles.map((item) => (
            <div className="border border-border bg-surface-subtle px-3 py-3 text-sm text-navy" key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InstitutionsCleaningPage() {
  const { t } = useTranslation();

  usePageMetadata({
    title: t('metadata.institutionsCleaning.title'),
    description: t('metadata.institutionsCleaning.description'),
  });

  const heroHighlights = t('pages.institutionsCleaning.hero.highlights', {
    returnObjects: true,
  }) as string[];
  const introPoints = t('pages.institutionsCleaning.intro.points', {
    returnObjects: true,
  }) as string[];
  const coverageItems = t('pages.institutionsCleaning.coverage.items', {
    returnObjects: true,
  }) as DetailItem[];
  const benefitItems = t('pages.institutionsCleaning.benefits.items', {
    returnObjects: true,
  }) as DetailItem[];
  const processSteps = t('pages.institutionsCleaning.process.steps', {
    returnObjects: true,
  }) as ProcessStep[];
  const servedItems = t('pages.institutionsCleaning.served.items', {
    returnObjects: true,
  }) as string[];

  const coverageIcons = [
    Building2,
    GraduationCap,
    Users,
    Briefcase,
    Stethoscope,
    ClipboardCheck,
  ] as const;

  const benefitIcons = [
    ShieldCheck,
    Clock3,
    ClipboardCheck,
    CheckCircle2,
    Building2,
    Users,
  ] as const;

  const servedIcons = [
    GraduationCap,
    Landmark,
    Briefcase,
    Building2,
    ShieldCheck,
    Users,
  ] as const;

  return (
    <>
      <section className="wide-shell py-[clamp(1.5rem,2vw,2.5rem)]">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.95fr)] xl:items-center">
          <div>
            <div className="inline-flex flex-wrap items-center gap-2">
              <span className="kicker">{t('pages.institutionsCleaning.hero.eyebrow')}</span>
              <span className="border border-primary/20 bg-brand-gold-soft px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary-dark">
                {t('pages.institutionsCleaning.hero.primaryBadge')}
              </span>
            </div>
            <h1 className="mt-3 max-w-[15ch] text-[clamp(2rem,1.35rem+2.1vw,3.8rem)] leading-[0.98] text-navy">
              {t('pages.institutionsCleaning.hero.title')}
            </h1>
            <p className="text-measure mt-4 text-sm text-text-muted sm:text-[0.97rem]">
              {t('pages.institutionsCleaning.hero.description')}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button size="lg" to={routes.requestQuote}>
                {t('common.actions.requestQuote')}
              </Button>
              <Button size="lg" to={routes.contact} variant="secondary">
                {t('common.actions.contactSales')}
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {heroHighlights.map((item) => (
                <span
                  className="border border-border bg-surface-subtle px-3 py-2 text-[0.78rem] font-medium text-navy"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-5 text-sm font-medium text-text-muted">
              {t('pages.institutionsCleaning.hero.secondaryBadge')}
            </p>
          </div>

          <InstitutionCleaningVisual />
        </div>
      </section>

      <section className="section-band border-y border-border bg-surface-card">
        <div className="wide-shell py-[clamp(2rem,3vw,3rem)]">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)]">
            <SectionHeader
              description={t('pages.institutionsCleaning.intro.paragraphs.0')}
              eyebrow={t('pages.institutionsCleaning.intro.eyebrow')}
              title={t('pages.institutionsCleaning.intro.title')}
            />
            <div className="surface-panel p-5 shadow-card">
              <p className="text-sm text-text-muted">
                {t('pages.institutionsCleaning.intro.paragraphs.1')}
              </p>
              <div className="mt-5 grid gap-3">
                {introPoints.map((point) => (
                  <div className="flex items-start gap-3 border border-border bg-surface-subtle px-4 py-3" key={point}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm text-navy">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wide-shell py-[clamp(2rem,3vw,3rem)]">
        <SectionHeader
          align="center"
          description={t('pages.institutionsCleaning.coverage.description')}
          eyebrow={t('pages.institutionsCleaning.coverage.eyebrow')}
          title={t('pages.institutionsCleaning.coverage.title')}
        />
        <div className="support-grid mt-6">
          {coverageItems.map((item, index) => {
            const Icon = coverageIcons[index];

            return (
              <article className="toolbar-panel h-full p-5 shadow-card" key={item.title}>
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="mt-3 text-[1.1rem] text-navy">{item.title}</h2>
                <p className="mt-2 text-sm text-text-muted">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="wide-shell py-[clamp(2rem,3vw,3rem)]">
        <SectionHeader
          align="center"
          eyebrow={t('pages.institutionsCleaning.benefits.eyebrow')}
          title={t('pages.institutionsCleaning.benefits.title')}
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {benefitItems.map((item, index) => {
            const Icon = benefitIcons[index];

            return (
              <article className="surface-panel h-full p-5 shadow-card" key={item.title}>
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="mt-3 text-[1.08rem] text-navy">{item.title}</h2>
                <p className="mt-2 text-sm text-text-muted">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="wide-shell py-[clamp(2rem,3vw,3rem)]">
        <div className="hero-band border border-surface-dark p-6 text-white shadow-card lg:p-7">
          <div className="mx-auto max-w-[min(100%,56rem)] text-center">
            <p className="kicker text-white/80">{t('pages.institutionsCleaning.process.eyebrow')}</p>
            <h2 className="mt-2 text-[clamp(1.65rem,1.1rem+1.3vw,2.7rem)] leading-[1.04] text-white">
              {t('pages.institutionsCleaning.process.title')}
            </h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {processSteps.map((step) => (
              <article className="border border-white/10 bg-white/5 p-4" key={step.step}>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-brand-gold-soft">
                  {step.step}
                </p>
                <h2 className="mt-3 text-[1.05rem] text-white">{step.title}</h2>
                <p className="mt-2 text-sm text-white/75">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wide-shell py-[clamp(2rem,3vw,3rem)]">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.82fr)]">
          <div>
            <SectionHeader
              description={t('pages.institutionsCleaning.served.description')}
              eyebrow={t('pages.institutionsCleaning.served.eyebrow')}
              title={t('pages.institutionsCleaning.served.title')}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {servedItems.map((item, index) => {
                const Icon = servedIcons[index];

                return (
                  <article className="toolbar-panel flex h-full items-start gap-3 p-4 shadow-card" key={item}>
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm text-navy">{item}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="surface-panel p-5 shadow-card">
            <p className="kicker">{t('pages.institutionsCleaning.hero.primaryBadge')}</p>
            <h2 className="mt-2 text-[1.35rem] text-navy">
              {t('pages.institutionsCleaning.served.noteTitle')}
            </h2>
            <p className="mt-3 text-sm text-text-muted">
              {t('pages.institutionsCleaning.served.note')}
            </p>
          </aside>
        </div>
      </section>

      <section className="section-band py-[clamp(2rem,3vw,3.5rem)]">
        <div className="band-shell">
          <div className="hero-band border border-surface-dark px-5 py-6 text-white shadow-card lg:flex lg:items-center lg:justify-between">
            <div>
              <p className="kicker text-white/80">{t('pages.institutionsCleaning.cta.eyebrow')}</p>
              <h2 className="mt-2 max-w-[20ch] text-[clamp(1.45rem,1.1rem+0.9vw,1.95rem)] text-white">
                {t('pages.institutionsCleaning.cta.title')}
              </h2>
              <p className="text-measure mt-3 text-sm text-white/72">
                {t('pages.institutionsCleaning.cta.description')}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 lg:mt-0">
              <Button size="lg" to={routes.requestQuote}>
                {t('common.actions.requestQuote')}
              </Button>
              <Button size="lg" to={routes.contact} variant="secondary">
                {t('common.actions.contactSales')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
