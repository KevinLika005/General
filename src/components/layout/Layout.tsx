import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useInquiryList } from '../../hooks/useInquiryList';
import { InquirySummary } from '../common/InquirySummary';
import { Footer } from './Footer';
import { Header } from './Header';

export function Layout({ children }: { children: ReactNode }) {
  const { itemCount } = useInquiryList();
  const [summaryOpen, setSummaryOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (summaryOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [summaryOpen]);

  useEffect(() => {
    setSummaryOpen(false);
  }, [location.pathname, location.search, location.hash]);

  return (
    <div className="min-h-screen bg-surface-page text-text">
      <Header inquiryCount={itemCount} onOpenInquirySummary={() => setSummaryOpen(true)} />
      <main id="main-content">{children}</main>
      <Footer />
      <InquirySummary onClose={() => setSummaryOpen(false)} open={summaryOpen} />
    </div>
  );
}
