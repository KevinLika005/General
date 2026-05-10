import { Check, ClipboardPlus } from 'lucide-react';
import { useInquiryList } from '../../hooks/useInquiryList';
import { Button } from './Button';

interface InquiryButtonProps {
  productId: string;
  className?: string;
  fullWidth?: boolean;
}

export function InquiryButton({ className, fullWidth = false, productId }: InquiryButtonProps) {
  const { addItem, isInInquiryList } = useInquiryList();
  const added = isInInquiryList(productId);

  return (
    <Button
      className={[fullWidth ? 'w-full' : '', className].filter(Boolean).join(' ')}
      onClick={() => addItem(productId)}
      size="sm"
      variant={added ? 'dark' : 'primary'}
    >
      {added ? <Check className="h-4 w-4" /> : <ClipboardPlus className="h-4 w-4" />}
      {added ? 'Added to Inquiry' : 'Add to Inquiry'}
    </Button>
  );
}
