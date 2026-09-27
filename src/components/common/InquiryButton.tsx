import { Check, ClipboardPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useInquiryList } from '../../hooks/useInquiryList';
import { Button } from './Button';

interface InquiryButtonProps {
  productId: string;
  className?: string;
  fullWidth?: boolean;
  compact?: boolean;
  disabled?: boolean;
  /** Names the product for screen readers when the visible label is just "Add". */
  productTitle?: string;
}

export function InquiryButton({
  className,
  compact = false,
  disabled = false,
  fullWidth = false,
  productId,
  productTitle,
}: InquiryButtonProps) {
  const { t } = useTranslation();
  const { addItem, isInInquiryList } = useInquiryList();
  const added = isInInquiryList(productId);
  const label = disabled
    ? t('common.status.soldReference')
    : added
      ? t('layout.header.inquiryList')
      : t(compact ? 'common.actions.add' : 'common.actions.addToInquiry');
  const fullLabel = added || disabled ? label : t('common.actions.addToInquiry');

  return (
    <Button
      aria-label={productTitle ? `${fullLabel}: ${productTitle}` : undefined}
      aria-pressed={added}
      className={[fullWidth ? 'w-full' : '', className].filter(Boolean).join(' ')}
      disabled={disabled}
      onClick={() => {
        if (!added && !disabled) {
          addItem(productId);
        }
      }}
      size="sm"
      variant={added ? 'secondary' : 'primary'}
    >
      {added ? <Check className="h-4 w-4" /> : <ClipboardPlus className="h-4 w-4" />}
      {compact && added ? <span className="sr-only">{label}</span> : label}
    </Button>
  );
}
