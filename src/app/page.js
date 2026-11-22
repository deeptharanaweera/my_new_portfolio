'use client';

import AIAssistantDrawer from '@/components/AIAssistantDrawer';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import MyServices from '@/components/MyServices';
import Navigation from '@/components/Navigation';
import Projects from '@/components/Projects';
import { defaultPortfolioData, getPortfolioData } from '@/lib/portfolioData';
import { useEffect, useState } from 'react';

export default function Home() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      const data = await getPortfolioData();
      setPortfolioData(data);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      setPortfolioData(defaultPortfolioData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-mono text-muted-foreground">Initializing studio showcase...</p>
        </div>
      </div>
    );
  }

  const data = portfolioData || defaultPortfolioData;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* 3-Zone Navigation */}
      <Navigation
        personalInfo={data.personalInfo}
        onOpenAI={() => setAiDrawerOpen(true)}
      />

      <main>
        {/* Split-Screen Hero + 4-Column Proof Strip */}
        {data.visibility?.hero !== false && (
          <Hero
            personalInfo={data.personalInfo}
            socialLinks={data.socialLinks}
            heroStats={data.heroStats}
            onOpenAI={() => setAiDrawerOpen(true)}
          />
        )}

        {/* Editorial Bento Showcase with Category Filter */}
        {data.visibility?.projects !== false && (
          <Projects
            projects={data.projects || []}
            categories={data.projectCategories || []}
          />
        )}

        {/* Services Section */}
        {data.visibility?.services !== false && data.services?.length > 0 && (
          <MyServices services={data.services} />
        )}

        {/* Contact Section */}
        {data.visibility?.contact !== false && (
          <Contact
            personalInfo={data.personalInfo}
            socialLinks={data.socialLinks}
          />
        )}
      </main>

      {/* Studio Footer */}
      <Footer
        personalInfo={data.personalInfo}
        socialLinks={data.socialLinks}
        onOpenAI={() => setAiDrawerOpen(true)}
      />

      {/* Grounded Visitor AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        onOpen={() => setAiDrawerOpen(true)}
        portfolioData={data}
      />
    </div>
  );
}
