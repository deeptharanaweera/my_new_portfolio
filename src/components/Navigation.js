'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShieldCheck, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Navigation = ({ onOpenAI, personalInfo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Work', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/#services' },
    { label: 'Contact', href: '/#contact' },
  ];

  const isActive = (href) => {
    if (!pathname) return false;
    if (href === '/projects' && pathname.startsWith('/projects')) return true;
    if (href === '/about' && pathname === '/about') return true;
    if (href === '/' && pathname === '/') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-sm tracking-tight group-hover:scale-105 transition-transform duration-200">
              {personalInfo?.name ? personalInfo.name.charAt(0) : 'S'}
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                {personalInfo?.name || 'Studio Portfolio'}
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Available for Q1
              </span>
            </div>
          </Link>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-border/50 text-sm">
          <Link
            href="/"
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 ${
              pathname === '/'
                ? 'bg-card text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Overview
          </Link>
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 ${
                  active
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5">
          {onOpenAI && (
            <button
              onClick={onOpenAI}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              title="Open AI Portfolio Assistant"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>
          )}

          <div className="hidden sm:block">
            <Link
              href="/admin"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              title="Admin Studio"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>
          </div>

          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-card px-6 py-4 space-y-3"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-2 text-foreground hover:text-primary"
            >
              Overview
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium py-2 text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-muted-foreground flex items-center gap-1 py-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Studio
              </Link>
              {onOpenAI && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAI();
                  }}
                  className="text-xs text-primary flex items-center gap-1 font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Ask AI Assistant
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
