'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, SlidersHorizontal } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { sortProjects, getCategories } from '@/lib/portfolioData';

export default function Projects({ projects = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = useMemo(() => getCategories(projects), [projects]);

  // Sort newest first
  const sortedProjects = useMemo(() => sortProjects(projects, 'newest'), [projects]);

  // Filter by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return sortedProjects;
    return sortedProjects.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [sortedProjects, selectedCategory]);

  return (
    <section id="projects" className="py-24 bg-background text-foreground relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineered for Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Featured Work & Projects
            </h2>
            <p className="text-muted-foreground text-base max-w-xl">
              Modern full-stack web applications, AI dashboards, and mobile solutions. Sorted with the newest creations first.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border hover:border-primary text-foreground hover:text-primary transition-all font-semibold text-sm shadow-xs group"
            >
              <span>Explore All ({projects.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Category Pills Filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isFeatured={project.featured}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-card border border-border">
            <Layers className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-foreground">No projects in this category yet</h3>
            <p className="text-sm text-muted-foreground mt-1">Try switching to another category or view all projects.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Banner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-card border border-border flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              Looking for something specific or customized?
            </h3>
            <p className="text-sm text-muted-foreground">
              Have a tailored project or architecture inquiry? Ask the AI Copilot or get in touch directly.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 shadow-md shadow-primary/20 transition-all whitespace-nowrap"
          >
            Start a Conversation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
