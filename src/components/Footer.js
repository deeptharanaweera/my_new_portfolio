'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Instagram, Mail, Heart, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Footer({ personalInfo, socialLinks }) {
  const currentYear = new Date().getFullYear();
  const name = personalInfo?.name || 'Developer';

  return (
    <footer className="border-t border-border bg-card/60 text-foreground transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-sm">
                {name.charAt(0)}
              </div>
              <span className="font-bold text-xl tracking-tight">{name}</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              {personalInfo?.bio || 'Building accessible, high-performance web applications and AI-driven digital experiences.'}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for freelance & full-time roles
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1 group">
                  Home
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary transition-colors flex items-center gap-1 group">
                  Projects & Case Studies
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-1 group">
                  About & Experience
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-1 group">
                  Contact
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-primary transition-colors flex items-center gap-1 group">
                  Admin Panel
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect / Social */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks?.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-border bg-card hover:border-primary hover:text-primary transition-colors text-muted-foreground"
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
                  className="p-2.5 rounded-xl border border-border bg-card hover:border-primary hover:text-primary transition-colors text-muted-foreground"
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
                  className="p-2.5 rounded-xl border border-border bg-card hover:border-primary hover:text-primary transition-colors text-muted-foreground"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl border border-border bg-card hover:border-primary hover:text-primary transition-colors text-muted-foreground"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Have questions? Try the <span className="font-semibold text-primary">Ask AI</span> copilot in the bottom-right corner!
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} {name}. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Built with Next.js 15, Tailwind CSS & AI</span>
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
}
