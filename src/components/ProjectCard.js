'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const ProjectCard = ({ project, featured = false, index = 0 }) => {
  const [imageError, setImageError] = useState(false);

  const hasValidImage = project.image && isValidUrl(project.image) && !imageError;
  const projectLink = `/projects/${project.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative flex flex-col justify-between rounded-2xl bg-card border border-border/70 hover:border-border transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div>
        {/* Visual Cover / Fallback Frame */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-gradient-to-br from-muted/80 via-muted to-muted/40 border-b border-border/50">
          {hasValidImage ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/10 via-muted/60 to-background">
              <div className="w-14 h-14 rounded-2xl bg-card/80 border border-border/80 shadow-inner flex items-center justify-center mb-3">
                <span className="text-xl font-bold font-mono text-primary">
                  {project.title ? project.title.substring(0, 2).toUpperCase() : 'PR'}
                </span>
              </div>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                {project.category || 'Architecture'}
              </span>
            </div>
          )}

          {/* Featured indicator badge */}
          {project.featured && (
            <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/60 text-xs font-medium text-amber-500 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Featured</span>
            </div>
          )}

          {/* Quick link overlay on image */}
          <Link
            href={projectLink}
            className="absolute inset-0 z-0"
            aria-label={`View ${project.title} case study`}
          />
        </div>

        {/* Card Content Body */}
        <div className="p-6">
          {/* Unboxed Metadata Row: Zero-pill discipline */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
            <span className="text-primary font-semibold">{project.category || 'Web Platform'}</span>
            <span>·</span>
            <span>{project.year || '2025'}</span>
            {project.role && (
              <>
                <span>·</span>
                <span>{project.role}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
            <Link href={projectLink} className="flex items-center gap-1.5">
              <span>{project.title}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200" />
            </Link>
          </h3>

          {/* Summary */}
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6">
            {project.summary || project.description || 'Full-stack software engineering project.'}
          </p>

          {/* Technologies */}
          {Array.isArray(project.technologies) && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.slice(0, 5).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-muted/60 text-foreground/80 border border-border/40 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-1.5 py-0.5 rounded-md text-xs font-mono text-muted-foreground">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-border/40 pt-4 mt-auto">
        <Link
          href={projectLink}
          className="text-xs font-semibold text-primary hover:underline underline-offset-4 flex items-center gap-1"
        >
          <span>View Case Study</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground p-1 transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground p-1 transition-colors"
              title="Live Deployment"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
