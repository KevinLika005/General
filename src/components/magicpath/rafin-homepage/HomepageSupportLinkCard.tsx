import { ArrowRight, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface HomepageSupportLinkCardProps {
  description: string;
  icon: LucideIcon;
  title: string;
  to: string;
}

export function HomepageSupportLinkCard({
  description,
  icon: Icon,
  title,
  to,
}: HomepageSupportLinkCardProps) {
  const { t } = useTranslation();

  return (
    <Link
      className="group flex h-full flex-col border border-border bg-surface-card p-5 shadow-card transition duration-200 hover:border-primary hover:shadow-hover sm:p-6"
      to={to}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center border border-primary/20 bg-brand-gold-soft text-primary-dark">
          <Icon className="h-5 w-5" />
        </span>
        <ArrowRight className="mt-1 h-4 w-4 text-primary transition group-hover:translate-x-1" />
      </div>
      <h3 className="mt-5 text-[1.12rem] text-navy">{title}</h3>
      <p className="mt-2 text-sm text-text-muted">{description}</p>
      <span className="mt-auto pt-5 text-[0.82rem] font-semibold text-navy">
        {t('common.actions.viewDetails')}
      </span>
    </Link>
  );
}
