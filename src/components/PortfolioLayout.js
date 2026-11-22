'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { getPortfolioData } from '@/lib/portfolioData';

export default function PortfolioLayout({ children }) {
  const pathname = usePathname();
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPortfolioData();
        setPortfolioData(data);
      } catch (e) {
        console.error('Failed to load layout data:', e);
      }
    }
    load();
  }, []);

  const isAuthPage = pathname === '/login';
  const isAdminPage = pathname.startsWith('/admin');

  if (isAuthPage || isAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar personalInfo={portfolioData?.personalInfo} />
      <main className="flex-1">{children}</main>
      <Footer
        personalInfo={portfolioData?.personalInfo}
        socialLinks={portfolioData?.socialLinks}
      />
      <AIAssistant portfolioData={portfolioData} />
    </div>
  );
}
