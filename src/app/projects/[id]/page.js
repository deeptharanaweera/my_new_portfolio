'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Tag,
  Sparkles,
  CheckCircle2,
  Cpu,
  BarChart3,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { getPortfolioData, sortProjects } from '@/lib/portfolioData';
import AIProjectExplainer from '@/components/AIProjectExplainer';

export default function ProjectDetailPage({ params }) {
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;

  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAiModal, setShowAiModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPortfolioData();
        setPortfolioData(data);
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const allProjects = sortProjects(portfolioData?.projects || [], 'newest');
  const projectIndex = allProjects.findIndex((p) => p.id === projectId);
  const project = allProjects[projectIndex];

  const prevProject = projectIndex > 0 ? allProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex >= 0 && projectIndex < allProjects.length - 1
      ? allProjects[projectIndex + 1]
      : null;

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Loading project case study...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="text-center max-w-md bg-card border border-border p-8 rounded-2xl shadow-lg">
          <Layers className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-muted-foreground text-sm mb-6">
            The project you are looking for doesn&apos;t exist or might have been removed.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse All Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      })
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Projects</span>
          </Link>

          <button
            onClick={() => setShowAiModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Architecture Breakdown</span>
          </button>
        </div>

        {/* Case Study Header */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              {project.category || 'Engineering'}
            </span>

            {formattedDate && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
            )}

            {project.featured && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                ★ Featured Case Study
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {project.caseStudy?.overview || project.description}
          </p>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 shadow-md shadow-primary/20 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Live Site</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-semibold text-sm transition-colors shadow-xs"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative w-full h-80 sm:h-96 md:h-[460px] rounded-3xl overflow-hidden border border-border mb-12 shadow-lg bg-muted">
          {project.image && isValidUrl(project.image) ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-primary/30 via-background to-accent/20 flex items-center justify-center">
              <span className="text-7xl font-black text-primary/30">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Quick Meta Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-card border border-border mb-12 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Role
            </span>
            <p className="text-sm font-semibold text-foreground">
              {project.caseStudy?.role || 'Full Stack Engineer'}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Timeline
            </span>
            <p className="text-sm font-semibold text-foreground">
              {project.caseStudy?.timeline || formattedDate || '2025'}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Category
            </span>
            <p className="text-sm font-semibold text-foreground">
              {project.category || 'Full Stack'}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Status
            </span>
            <p className="text-sm font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Completed & Live
            </p>
          </div>
        </div>

        {/* Measurable Results / Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-14">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Key Metrics & Measurable Impact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-gradient-to-b from-primary/10 to-card border border-primary/20 text-center space-y-1 shadow-xs"
                >
                  <p className="text-2xl font-black text-primary">{metric}</p>
                  <p className="text-xs text-muted-foreground">Verified Metric</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Case Study Details: Challenge & Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          <div className="p-8 rounded-2xl bg-card border border-border space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-lg">
              <Cpu className="w-5 h-5" />
              <h3>The Challenge</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.caseStudy?.problem ||
                `${project.title} required designing a fault-tolerant system balancing sub-second interactivity, responsive client UX, and reliable backend data storage.`}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border space-y-4">
            <div className="flex items-center gap-2 text-accent font-bold text-lg">
              <Zap className="w-5 h-5" />
              <h3>The Solution & Architecture</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.caseStudy?.solution ||
                project.caseStudy?.architecture ||
                'Implemented modular component architecture with Next.js and Tailwind CSS, leveraging optimized state caching and clean API endpoints.'}
            </p>
          </div>
        </div>

        {/* Key Features Breakdown */}
        {project.caseStudy?.features && project.caseStudy.features.length > 0 && (
          <div className="mb-14 p-8 rounded-2xl bg-card border border-border space-y-6">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Key Features & Implementation Highlights
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.caseStudy.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border border-border/60"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Breakdown */}
        <div className="mb-14 space-y-4">
          <h3 className="text-xl font-bold text-foreground">Technologies & Tooling</h3>
          <div className="flex flex-wrap gap-2.5">
            {project.technologies?.map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-card border border-border text-foreground font-mono text-sm font-semibold shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Next & Previous Project Navigation Footer */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary transition-colors text-left w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 text-primary" />
              <div>
                <span className="text-xs text-muted-foreground block">Previous Project</span>
                <span className="text-sm font-bold text-foreground">{prevProject.title}</span>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.id}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary transition-colors text-right w-full sm:w-auto ml-auto"
            >
              <div>
                <span className="text-xs text-muted-foreground block">Next Project</span>
                <span className="text-sm font-bold text-foreground">{nextProject.title}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          )}
        </div>
      </div>

      {/* AI Explainer Modal */}
      <AIProjectExplainer
        project={project}
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
      />
    </div>
  );
}
