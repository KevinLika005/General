import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function MobileFilterDrawer({
  children,
  label,
  onClose,
  open,
}: {
  children: React.ReactNode;
  label: string;
  onClose: () => void;
  open: boolean;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusable = panelRef.current?.querySelector<HTMLElement>('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div aria-label={label} aria-modal="true" className="fixed inset-0 z-50 xl:hidden" role="dialog">
      <button className="absolute inset-0 bg-surface-blue/45" onClick={onClose} type="button" />
      <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-none border-t border-border bg-surface-page shadow-dropdown" ref={panelRef}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface-page px-4 py-3">
          <div>
            <p className="line-label">Filters</p>
            <p className="mt-1 text-sm font-semibold text-navy">{label}</p>
          </div>
          <button
            aria-label="Close filters"
            className="inline-flex h-10 w-10 items-center justify-center border border-border bg-surface-card text-navy"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-4 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
