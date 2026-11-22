'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Sparkles, Layers, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getPortfolioData, sortProjects, getCategories } from '@/lib/portfolioData';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsPage() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'featured' | 'title'

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPortfolioData();
        setPortfolioData(data);
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const projects = useMemo(() => portfolioData?.projects || [], [portfolioData]);

  // Extract categories
  const categories = useMemo(() => getCategories(projects), [projects]);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    // Filter by search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.technologies?.some((t) => t.toLowerCase().includes(q)) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort
    return sortProjects(result, sortBy);
  }, [projects, searchTerm, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Loading projects directory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Portfolio Catalog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            All Projects & Case Studies
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore complete technical case studies, system architectures, and live demos across full-stack, AI, and mobile applications.
          </p>
        </div>

        {/* Search, Category, and Sorting Controls */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-xs mb-10 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, technology (e.g. Next.js, AI, Stripe)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-muted/50 border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <label htmlFor="sortSelector" className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sortSelector"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm bg-muted/50 border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary text-foreground"
              >
                <option value="newest">Newest First</option>
                <option value="featured">Featured First</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 no-scrollbar border-t border-border/60">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-6">
          <span>
            Showing <strong className="text-foreground">{filteredAndSortedProjects.length}</strong> of{' '}
            <strong className="text-foreground">{projects.length}</strong> projects
          </span>
          {(searchTerm || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-primary hover:underline font-semibold"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {filteredAndSortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isFeatured={project.featured}
              />
            ))}
          </div>
        ) : (
          <div className="p-16 text-center rounded-2xl bg-card border border-border">
            <Layers className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">No matching projects found</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              We couldn&apos;t find any project matching &quot;{searchTerm || selectedCategory}&quot;. Try adjusting your keywords or clearing the category filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Show All Projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
