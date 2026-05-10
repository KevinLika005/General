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
    <div className="border border-dashed border-white/10 bg-rafin-panel px-6 py-8 text-center sm:px-8 sm:py-10">
      <SearchX className="mx-auto h-9 w-9 text-rafin-gold-soft" />
      <h3 className="mt-4 text-xl text-white sm:text-2xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm text-rafin-muted-light sm:text-base">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
