'use client';

import About from '@/components/About';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import MyServices from '@/components/MyServices';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import ThemeToggle from '@/components/ThemeToggle';
import { getPortfolioData } from '@/lib/portfolioData';
import { useEffect, useState } from 'react';

export default function Home() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      const data = await getPortfolioData();
      setPortfolioData(data);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load portfolio data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />
      
      {portfolioData.visibility?.hero && (
        <Hero 
          personalInfo={portfolioData.personalInfo} 
          socialLinks={portfolioData.socialLinks} 
        />
      )}
      
      {portfolioData.visibility?.about && (
        <About 
          personalInfo={portfolioData.personalInfo}
          experience={portfolioData.experience}
          education={portfolioData.education}
        />
      )}
      
      {portfolioData.visibility?.services && (
        <MyServices services={portfolioData.services} />
      )}
      
      {portfolioData.visibility?.skills && (
        <Skills skills={portfolioData.skills} />
      )}
      
      {portfolioData.visibility?.projects && (
        <Projects projects={portfolioData.projects} />
      )}
      
      {portfolioData.visibility?.contact && (
        <Contact 
          personalInfo={portfolioData.personalInfo}
          socialLinks={portfolioData.socialLinks}
        />
      )}
    </div>
  );
}
