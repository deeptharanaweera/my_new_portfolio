'use client';

import AIAssistantDrawer from '@/components/AIAssistantDrawer';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import ProjectCard from '@/components/ProjectCard';
import { defaultPortfolioData, getPortfolioData } from '@/lib/portfolioData';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export default function ProjectsPage() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPortfolioData();
        setPortfolioData(data);
      } catch (err) {
        console.error('Error loading projects:', err);
        setPortfolioData(defaultPortfolioData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const data = portfolioData || defaultPortfolioData;
  const projects = useMemo(() => data.projects || [], [data.projects]);

  // Derive dynamic categories
  const categories = useMemo(() => {
    const set = new Set(['All']);
    if (Array.isArray(data.projectCategories)) {
      data.projectCategories.forEach((c) => c && set.add(c.trim()));
    }
    projects.forEach((p) => {
      if (p.category) set.add(p.category.trim());
    });
    return Array.from(set);
  }, [data.projectCategories, projects]);

  // Filter projects (sorted newest-first by default)
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        p.category?.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.summary?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.technologies?.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navigation
        personalInfo={data.personalInfo}
        onOpenAI={() => setAiDrawerOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home Overview</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture & Code Repository</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Projects Archive
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            A comprehensive catalog of production systems, developer tooling, and client platforms engineered with modern TypeScript, distributed backends, and AI models. Sorted newest-first.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-border/60">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                    active
                      ? 'bg-foreground text-background border-foreground shadow-xs'
                      : 'bg-card text-muted-foreground hover:text-foreground border-border/70 hover:border-border'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech, keyword..."
              className="w-full pl-9 pr-8 py-2 rounded-full border border-border bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                aria-label="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-xs font-mono text-muted-foreground mb-8 flex items-center justify-between">
          <span>
            Showing {filteredProjects.length} of {projects.length} projects
          </span>
          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-primary hover:underline text-xs"
            >
              Reset active filters
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-80 rounded-2xl bg-card border border-border/40 animate-pulse"
              />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 px-4 rounded-3xl bg-card border border-border">
            <h3 className="font-bold text-foreground text-lg mb-2">No projects matched your criteria</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              Try adjusting your category selection or search keywords to view other engineering case studies.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              View All Projects
            </button>
          </div>
        )}
      </main>

      <Footer
        personalInfo={data.personalInfo}
        socialLinks={data.socialLinks}
        onOpenAI={() => setAiDrawerOpen(true)}
      />

      <AIAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        onOpen={() => setAiDrawerOpen(true)}
        portfolioData={data}
      />
    </div>
  );
}
