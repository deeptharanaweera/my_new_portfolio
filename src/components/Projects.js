'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Filter, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';

const Projects = ({ projects = [], categories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derive categories dynamically from projects + provided categories
  const allCategories = useMemo(() => {
    const set = new Set(['All']);
    if (Array.isArray(categories)) {
      categories.forEach((c) => c && set.add(c.trim()));
    }
    projects.forEach((p) => {
      if (p.category) set.add(p.category.trim());
    });
    return Array.from(set);
  }, [categories, projects]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [projects, selectedCategory]);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Editorial Bento Showcase
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-base">
              Newest systems, production platforms, and AI prototypes organized by technical discipline.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 self-start md:self-auto"
          >
            <span>Browse Full Archive ({projects.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Category Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {allCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-foreground text-background border-foreground shadow-xs'
                    : 'bg-card text-muted-foreground hover:text-foreground border-border/70 hover:border-border'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Bento Grid: Featured Projects First */}
        {featuredProjects.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {featuredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={idx === 0 && featuredProjects.length % 2 !== 0}
                index={idx}
              />
            ))}
          </div>
        )}

        {/* Other Projects Grid (Enriched for all projects!) */}
        {otherProjects.length > 0 && (
          <div className="space-y-6">
            {featuredProjects.length > 0 && (
              <div className="pt-8 border-t border-border/60">
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-6 font-semibold">
                  Additional Architecture & Projects ({otherProjects.length})
                </h3>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured={false}
                  index={idx}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 px-4 rounded-2xl bg-card border border-border">
            <p className="text-muted-foreground text-sm mb-4">
              No projects found matching the &quot;{selectedCategory}&quot; category.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Archive Link Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-muted/30 border border-border/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-foreground text-lg">Looking for older or specialized experiments?</h4>
            <p className="text-sm text-muted-foreground">
              Browse the complete repository of projects with full technical write-ups and benchmarks.
            </p>
          </div>
          <Link
            href="/projects"
            className="px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity shrink-0 flex items-center gap-2"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
