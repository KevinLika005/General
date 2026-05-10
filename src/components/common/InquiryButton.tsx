import { Check, ClipboardPlus } from 'lucide-react';
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
  const { addItem, isInInquiryList } = useInquiryList();
  const added = isInInquiryList(productId);

  return (
    <Button
      className={[fullWidth ? 'w-full' : '', className].filter(Boolean).join(' ')}
      disabled={disabled}
      onClick={() => addItem(productId)}
      size="sm"
      variant={added ? 'secondary' : 'primary'}
    >
      {added ? <Check className="h-4 w-4" /> : <ClipboardPlus className="h-4 w-4" />}
      {disabled
        ? compact
          ? 'Sold'
          : 'Sold Reference'
        : compact
          ? added
            ? 'Added'
            : 'Add to Inquiry'
          : added
            ? 'Added to Inquiry List'
            : 'Add to Inquiry List'}
    </Button>
  );
}
