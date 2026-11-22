'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, X, CheckCircle2, Cpu, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AIProjectExplainer({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/10 via-accent/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground">AI Project Analysis</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold">
                    {project.category || 'Engineering'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Deep dive breakdown for <span className="font-medium text-foreground">{project.title}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6 text-sm">
            {/* The Core Problem & Solution */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Cpu className="w-4 h-4" />
                <span>The Problem & Architectural Solution</span>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 border border-border/60 space-y-2">
                <p className="text-foreground leading-relaxed">
                  <strong className="text-foreground">Problem: </strong>
                  {project.caseStudy?.problem || project.description}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Solution: </strong>
                  {project.caseStudy?.solution || 'Designed and implemented an optimized modern solution prioritizing high performance, clean state management, and intuitive UX.'}
                </p>
              </div>
            </div>

            {/* Why This Tech Stack */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <Zap className="w-4 h-4" />
                <span>Why This Tech Stack?</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground font-mono text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic">
                {project.caseStudy?.architecture || 'Leveraged modern Next.js App Router for optimal SEO, fast server rendering, and low bundle sizes.'}
              </p>
            </div>

            {/* Impact & Key Highlights */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Measurable Impact
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center"
                    >
                      <p className="text-xs font-semibold text-primary">{metric}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-border bg-muted/20">
            <Link
              href={`/projects/${project.id}`}
              onClick={onClose}
              className="flex items-center gap-2 text-primary hover:underline text-sm font-semibold"
            >
              Read Full Case Study
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium text-sm transition-opacity"
            >
              Got it
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
