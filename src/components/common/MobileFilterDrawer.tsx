import { X } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDialogSurface } from '../../hooks/useDialogSurface';

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
  const { t } = useTranslation();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const headingId = 'mobile-filter-title';

  useDialogSurface({
    onClose,
    open,
    panelRef,
  });

  if (!open) {
    return null;
  }

  return (
    <div aria-labelledby={headingId} aria-modal="true" className="fixed inset-0 z-50 xl:hidden" role="dialog">
      <button aria-hidden="true" className="absolute inset-0 bg-overlay/52" onClick={onClose} tabIndex={-1} type="button" />
      <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-lg border-t border-border bg-surface-page shadow-dropdown" ref={panelRef} tabIndex={-1}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface-page px-4 py-3">
          <div>
            <p className="line-label">{t('common.labels.filters')}</p>
            <p className="mt-1 text-sm font-semibold text-navy" id={headingId}>
              {label}
            </p>
          </div>
          <button
            aria-label={t('common.accessibility.closeFilters')}
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
