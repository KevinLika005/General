import { useContext } from 'react';
import { InquiryContext } from '../context/InquiryContext';

export function useInquiryList() {
  const context = useContext(InquiryContext);

  if (!context) {
    throw new Error('useInquiryList must be used within InquiryProvider');
  }

  return context;
}
