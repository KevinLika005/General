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
}

export function InquiryButton({
  className,
  compact = false,
  disabled = false,
  fullWidth = false,
  productId,
}: InquiryButtonProps) {
  const { t } = useTranslation();
  const { addItem, isInInquiryList } = useInquiryList();
  const added = isInInquiryList(productId);

  return (
    <Button
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
      {disabled
        ? compact
          ? t('common.status.sold')
          : t('common.status.soldReference')
        : compact
          ? added
            ? t('layout.header.inquiryList')
            : t('common.actions.browse', 'Add')
          : added
            ? t('layout.header.inquiryList')
            : t('common.actions.requestInfo', 'Add to Inquiry')}
    </Button>
  );
}
