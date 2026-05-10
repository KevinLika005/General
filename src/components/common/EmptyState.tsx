import { SearchX } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  actionLabel,
  description,
  onAction,
  title,
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-surface-card px-6 py-8 text-center shadow-card sm:px-8 sm:py-10">
      <SearchX className="mx-auto h-9 w-9 text-brand-gold" />
      <h3 className="mt-4 text-xl text-brand-navy sm:text-2xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm text-text-muted sm:text-base">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
