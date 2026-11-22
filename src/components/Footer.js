'use client';

import { Github, Instagram, Linkedin, Mail, Sparkles, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = ({ personalInfo, socialLinks, onOpenAI }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Wordmark & Bio */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-xs">
                {personalInfo?.name ? personalInfo.name.charAt(0) : 'S'}
              </span>
              <span className="font-bold text-base tracking-tight text-foreground">
                {personalInfo?.name || 'Studio Portfolio'}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {personalInfo?.bio ||
                'High-performance full-stack web platforms, distributed cloud microservices, and human-centered AI interfaces.'}
            </p>
            <div className="pt-2 flex items-center gap-3">
              {socialLinks?.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks?.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Index
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects Archive
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About & Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio & Assistant */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Interactive
            </h4>
            <div className="space-y-2 text-sm">
              {onOpenAI && (
                <button
                  onClick={onOpenAI}
                  className="flex items-center gap-1.5 text-primary hover:underline font-medium text-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Ask AI Portfolio Assistant
                </button>
              )}
              <div>
                <Link
                  href="/admin"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Admin Studio Login
                </Link>
              </div>
              <div className="text-xs text-muted-foreground pt-3">
                <span className="font-mono text-emerald-500">● 99.9% Uptime</span>
                <p className="mt-1">Edge Cached via Next.js App Router</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} {personalInfo?.name || 'Studio'}. Crafted with Next.js, Tailwind CSS & Gemini AI.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Obsidian & Bento Grid Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
