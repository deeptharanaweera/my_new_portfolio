'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Sparkles, ArrowRight, Calendar, Tag, BarChart3 } from 'lucide-react';
import AIProjectExplainer from '@/components/AIProjectExplainer';

export default function ProjectCard({ project, index = 0, isFeatured = false }) {
  const [showAiModal, setShowAiModal] = useState(false);

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  };

  const formattedDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    : null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`group relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${
          isFeatured ? 'md:col-span-2 lg:col-span-1 border-primary/30' : ''
        }`}
      >
        {/* Project Thumbnail Header */}
        <div className="relative h-56 sm:h-64 w-full bg-muted overflow-hidden">
          {project.image && isValidUrl(project.image) ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center">
              <span className="text-4xl font-extrabold text-primary/40">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent opacity-80" />

          {/* Badges Bar (Category & Featured) */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-background/90 backdrop-blur-md text-foreground border border-border shadow-sm flex items-center gap-1.5">
              <Tag className="w-3 h-3 text-primary" />
              {project.category || 'General'}
            </span>

            <div className="flex items-center gap-1.5">
              {project.featured && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-white backdrop-blur-md shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Featured
                </span>
              )}
              {formattedDate && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-md flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <Link
              href={`/projects/${project.id}`}
              className="block group/link"
            >
              <h3 className="text-xl font-bold text-foreground group-hover/link:text-primary transition-colors flex items-center justify-between gap-2">
                <span>{project.title}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
              </h3>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Metrics Chips */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.metrics.slice(0, 2).map((metric, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium"
                  >
                    <BarChart3 className="w-3 h-3" />
                    {metric}
                  </span>
                ))}
              </div>
            )}

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies?.slice(0, 4).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-muted text-foreground text-xs font-mono font-medium border border-border/50"
                >
                  {tech}
                </span>
              ))}
              {project.technologies && project.technologies.length > 4 && (
                <span className="px-2 py-1 rounded-lg bg-muted/60 text-muted-foreground text-xs">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-border flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Link
                href={`/projects/${project.id}`}
                className="px-3.5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-xs"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => setShowAiModal(true)}
                className="px-3 py-2 rounded-xl border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors text-xs font-semibold flex items-center gap-1"
                title="Explain architecture with AI"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Insights</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
                  aria-label="Live Demo"
                  title="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
                  aria-label="GitHub Repository"
                  title="Source Code"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Explainer Modal */}
      <AIProjectExplainer
        project={project}
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
      />
    </>
  );
}
