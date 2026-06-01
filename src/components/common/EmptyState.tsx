import { SearchX } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionTo?: string;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  secondaryActionTo?: string;
}

export function EmptyState({
  actionLabel,
  actionTo,
  description,
  onAction,
  onSecondaryAction,
  secondaryActionLabel,
  secondaryActionTo,
  title,
}: EmptyStateProps) {
  return (
    <div className="border border-dashed border-border bg-surface-card px-5 py-7 text-center shadow-card sm:px-7 sm:py-8">
      <SearchX className="mx-auto h-8 w-8 text-primary" />
      <h3 className="mt-4 text-xl text-navy sm:text-2xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm text-text-muted sm:text-base">{description}</p>
      {actionLabel || secondaryActionLabel ? (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {actionLabel && actionTo ? (
            <Button to={actionTo} variant="primary">
              {actionLabel}
            </Button>
          ) : null}
          {actionLabel && onAction ? (
            <Button onClick={onAction} variant="primary">
              {actionLabel}
            </Button>
          ) : null}
          {secondaryActionLabel && secondaryActionTo ? (
            <Button to={secondaryActionTo} variant="secondary">
              {secondaryActionLabel}
            </Button>
          ) : null}
          {secondaryActionLabel && onSecondaryAction ? (
            <Button onClick={onSecondaryAction} variant="secondary">
              {secondaryActionLabel}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
