'use client';

import AIAssistantDrawer from '@/components/AIAssistantDrawer';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { defaultPortfolioData, findProjectByIdOrSlug, getPortfolioData } from '@/lib/portfolioData';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Star,
  Terminal,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export default function ProjectCaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id;

  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPortfolioData();
        setPortfolioData(data);
      } catch (err) {
        console.error('Error loading project details:', err);
        setPortfolioData(defaultPortfolioData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [projectId]);

  const data = portfolioData || defaultPortfolioData;
  const projects = data.projects || [];
  const project = findProjectByIdOrSlug(projects, projectId);

  // Find previous and next projects for pagination
  const currentIndex = project ? projects.findIndex((p) => String(p.id) === String(project.id)) : -1;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-muted-foreground">Loading case study specifications...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <Navigation personalInfo={data.personalInfo} onOpenAI={() => setAiDrawerOpen(true)} />
        <div className="max-w-md mx-auto text-center py-32 px-6">
          <h2 className="text-2xl font-bold mb-3">Case Study Not Found</h2>
          <p className="text-sm text-muted-foreground mb-8">
            The project identifier &quot;{projectId}&quot; does not correspond to an existing record in the archive.
          </p>
          <Link
            href="/projects"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Projects Archive
          </Link>
        </div>
        <Footer personalInfo={data.personalInfo} onOpenAI={() => setAiDrawerOpen(true)} />
      </div>
    );
  }

  const hasValidImage = project.image && isValidUrl(project.image) && !imageError;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navigation
        personalInfo={data.personalInfo}
        onOpenAI={() => setAiDrawerOpen(true)}
      />

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Projects Archive</span>
          </Link>

          <button
            onClick={() => setAiDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline"
          >
            <Sparkles className="w-3 h-3" />
            <span>Ask AI about this architecture</span>
          </button>
        </div>

        {/* Unboxed Metadata Kicker (Zero-Pill Typography) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
          <span className="text-primary font-semibold uppercase tracking-wider">
            {project.category || 'Web Platform'}
          </span>
          <span>·</span>
          <span>{project.year || '2025'}</span>
          <span>·</span>
          <span>{project.role || 'Full Stack Engineer'}</span>
          {project.status && (
            <>
              <span>·</span>
              <span className="inline-flex items-center gap-1 text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {project.status}
              </span>
            </>
          )}
        </div>

        {/* Case Study Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 text-balance leading-[1.1]">
          {project.title}
        </h1>

        {/* Lead Narrative Teaser */}
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          {project.summary || project.description}
        </p>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-4 mb-12 pb-8 border-b border-border/60">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition-opacity shadow-sm"
            >
              <span>Live Demonstration</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-card hover:bg-muted text-foreground border border-border font-semibold text-xs hover:border-foreground/30 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          )}
        </div>

        {/* Outcome Metrics Strip (if metrics exist) */}
        {Array.isArray(project.metrics) && project.metrics.length > 0 && (
          <div className="mb-12 p-6 rounded-2xl bg-muted/40 border border-border/80">
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-4">
              Key Engineering Impact & Outcomes
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-foreground">
                    {m.value}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground mt-0.5">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hero Visual Cover Frame */}
        <div className="relative h-72 sm:h-96 md:h-[450px] w-full rounded-3xl overflow-hidden bg-card border border-border/80 shadow-xl mb-16">
          {hasValidImage ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary/10 via-muted/50 to-background">
              <div className="w-20 h-20 rounded-3xl bg-card border border-border shadow-inner flex items-center justify-center mb-4">
                <span className="text-3xl font-bold font-mono text-primary">
                  {project.title.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                {project.category} · Architectural Case Study
              </span>
            </div>
          )}
        </div>

        {/* Editorial Narrative Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Main Story (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview / Description */}
            {project.description && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Engineering Overview
                </h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap space-y-4 text-sm sm:text-base">
                  {project.description}
                </div>
              </section>
            )}

            {/* The Challenge / Problem */}
            {project.problem && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  The Problem & Bottlenecks
                </h2>
                <div className="p-6 rounded-2xl bg-card border border-border/80 text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {project.problem}
                </div>
              </section>
            )}

            {/* The Solution & Architecture */}
            {project.solution && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Solution & Technical Execution
                </h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                  {project.solution}
                </div>
              </section>
            )}

            {/* Deep Architecture Notes */}
            {project.architectureNotes && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary" />
                  Architecture & Systems Notes
                </h2>
                <div className="p-6 rounded-2xl bg-muted/50 border border-border/80 font-mono text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {project.architectureNotes}
                </div>
              </section>
            )}

            {/* Key Achievements & Highlights */}
            {Array.isArray(project.highlights) && project.highlights.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Key Technical Highlights
                </h2>
                <ul className="space-y-3">
                  {project.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Gallery Images (if available) */}
            {Array.isArray(project.gallery) && project.gallery.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Interface & System Previews
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.filter(isValidUrl).map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="relative h-48 rounded-xl overflow-hidden bg-card border border-border"
                    >
                      <Image
                        src={imgUrl}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Tech Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Tech Stack Card */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  Technologies & Ecosystem
                </h3>

                <div className="flex flex-wrap gap-2">
                  {Array.isArray(project.technologies) && project.technologies.length > 0 ? (
                    project.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-muted text-xs font-mono text-foreground border border-border/60"
                      >
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">Not specified</span>
                  )}
                </div>
              </div>

              {/* Project Meta Card */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4 text-xs font-mono">
                <h3 className="uppercase tracking-wider text-muted-foreground font-semibold">
                  Specification Details
                </h3>

                <div className="space-y-2.5 divide-y divide-border/40">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Category</span>
                    <span className="text-foreground font-medium">{project.category}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Year</span>
                    <span className="text-foreground font-medium">{project.year}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Engineering Role</span>
                    <span className="text-foreground font-medium">{project.role}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Deployment</span>
                    <span className="text-foreground font-medium">{project.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Previous & Next Project Navigation */}
        <div className="pt-12 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-border/60 hover:border-foreground/30 text-left transition-all w-full sm:w-1/2"
            >
              <ArrowLeft className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                  Previous Project
                </span>
                <span className="text-sm font-bold text-foreground line-clamp-1">
                  {prevProject.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block sm:w-1/2" />
          )}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.id}`}
              className="flex items-center justify-end gap-3 p-4 rounded-xl border border-border/60 hover:border-foreground/30 text-right transition-all w-full sm:w-1/2"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                  Next Project
                </span>
                <span className="text-sm font-bold text-foreground line-clamp-1">
                  {nextProject.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
            </Link>
          )}
        </div>
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
