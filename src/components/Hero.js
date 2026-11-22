'use client';

import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Code2,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Terminal,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const Hero = ({ personalInfo, socialLinks, heroStats = [], onOpenAI }) => {
  const defaultStats = [
    { label: 'Years Experience', value: '4+' },
    { label: 'Projects Shipped', value: '25+' },
    { label: 'Code Quality', value: '99.9%' },
    { label: 'Client Rating', value: '5.0★' },
  ];

  const stats = heroStats && heroStats.length > 0 ? heroStats : defaultStats;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 border-b border-border/50">
      {/* Subtle Studio Glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-20 dark:opacity-30">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Split Screen Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Narrative & Call to Action (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Role Kicker */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-muted border border-border/80 text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {personalInfo?.title || 'Full Stack Engineer & System Architect'}
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-balance leading-[1.1] mb-6">
              Engineering high-resilience platforms & intelligent web systems.
            </h1>

            {/* Lead Narrative */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8 font-normal">
              {personalInfo?.bio ||
                'Specializing in distributed systems, modern TypeScript, Next.js architecture, and grounded AI experiences built for performance and scale.'}
            </p>

            {/* Actions Row */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-primary/20"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {onOpenAI && (
                <button
                  onClick={onOpenAI}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-card hover:bg-muted text-foreground border border-border font-semibold text-sm hover:border-foreground/30 active:scale-[0.98] transition-all"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Ask AI Assistant</span>
                </button>
              )}

              {personalInfo?.resume && (
                <a
                  href={personalInfo.resume}
                  download
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-muted-foreground hover:text-foreground text-sm font-medium hover:bg-muted/60 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </a>
              )}
            </div>

            {/* Social Links & Location */}
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span>{personalInfo?.location || 'San Francisco, CA'}</span>
              <span>·</span>
              <div className="flex items-center gap-3">
                {socialLinks?.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                    title="GitHub"
                  >
                    GitHub
                  </a>
                )}
                {socialLinks?.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                    title="LinkedIn"
                  >
                    LinkedIn
                  </a>
                )}
                {personalInfo?.email && (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="hover:text-foreground transition-colors"
                    title="Direct Email"
                  >
                    Email
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Studio Visual Frame (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Studio Bento Card */}
              <div className="rounded-3xl bg-card border border-border/80 shadow-2xl p-6 relative overflow-hidden backdrop-blur-sm">
                {/* Decorative Terminal Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                    <Terminal className="w-3 h-3" />
                    sasanka.config.ts
                  </span>
                </div>

                {/* Avatar or Code Architecture Frame */}
                {personalInfo?.avatar && isValidUrl(personalInfo.avatar) ? (
                  <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden mb-4 bg-muted">
                    <Image
                      src={personalInfo.avatar}
                      alt={personalInfo?.name || 'Portrait'}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/60 font-mono text-xs text-muted-foreground space-y-2 mb-4">
                    <div className="text-foreground font-semibold flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-primary" />
                      <span>const studioEngineer = &#123;</span>
                    </div>
                    <p className="pl-4">
                      name: <span className="text-emerald-500">&apos;{personalInfo?.name || 'Sasanka'}&apos;</span>,
                    </p>
                    <p className="pl-4">
                      coreStack: [<span className="text-blue-400">&apos;Next.js&apos;</span>, <span className="text-blue-400">&apos;TypeScript&apos;</span>, <span className="text-blue-400">&apos;Gemini&apos;</span>],
                    </p>
                    <p className="pl-4">
                      architecture: <span className="text-amber-400">&apos;Distributed & Edge&apos;</span>,
                    </p>
                    <p className="pl-4">
                      status: <span className="text-emerald-400">&apos;Available for contracts&apos;</span>
                    </p>
                    <div className="text-foreground font-semibold">&#125;;</div>
                  </div>
                )}

                {/* Status bar inside frame */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-mono text-foreground font-medium">Ready to deploy</span>
                  </div>
                  <Link
                    href="/about"
                    className="text-primary hover:underline font-medium inline-flex items-center gap-1 text-xs"
                  >
                    Read biography →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4-Column Proof / Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-10 border-t border-border/60"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono tabular-nums text-foreground mb-1">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-wider font-mono text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
