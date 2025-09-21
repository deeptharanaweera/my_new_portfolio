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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Failed to load portfolio data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ThemeToggle />
      
      <Hero 
        personalInfo={portfolioData.personalInfo} 
        socialLinks={portfolioData.socialLinks} 
      />
      
      <About 
        personalInfo={portfolioData.personalInfo}
        experience={portfolioData.experience}
        education={portfolioData.education}
      />
      
      <MyServices services={portfolioData.services} />
      
      <Skills skills={portfolioData.skills} />
      
      <Projects projects={portfolioData.projects} />
      
      <Contact 
        personalInfo={portfolioData.personalInfo}
        socialLinks={portfolioData.socialLinks}
      />
    </div>
  );
}
