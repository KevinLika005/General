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
    setSummaryOpen(false);
  }, [location.pathname, location.search, location.hash]);

  return (
    <div className="min-h-screen bg-rafin-black text-white">
      <Header inquiryCount={itemCount} onOpenInquirySummary={() => setSummaryOpen(true)} />
      <main>{children}</main>
      <Footer />
      <InquirySummary onClose={() => setSummaryOpen(false)} open={summaryOpen} />
    </div>
  );
}
