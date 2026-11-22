'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Download,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle2,
  Compass,
  TrendingUp,
  Building2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { getPortfolioData } from '@/lib/portfolioData';

// Sanitize unprintable or corrupted characters (e.g. Unicode replacement boxes)
const sanitizeText = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/\uFFFD/g, '')
    .replace(/[^\x20-\x7E\u00A0-\u024F\u2010-\u2027]/g, '')
    .trim();
};

// Split achievement string into a bold title and descriptive body if formatted with a colon
const parseAchievement = (text) => {
  const sanitized = sanitizeText(text);
  const colonIndex = sanitized.indexOf(':');
  if (colonIndex > 0 && colonIndex < 45) {
    return {
      title: sanitized.slice(0, colonIndex).trim(),
      detail: sanitized.slice(colonIndex + 1).trim()
    };
  }
  return {
    title: '',
    detail: sanitized
  };
};

export default function AboutPage() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedRoles, setExpandedRoles] = useState({});

  const toggleRoleAchievements = (roleId) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPortfolioData();
        setPortfolioData(data);
      } catch (err) {
        console.error('Error loading portfolio data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Loading about details...</p>
        </div>
      </div>
    );
  }

  const personalInfo = portfolioData?.personalInfo || {};
  const experience = portfolioData?.experience || [];
  const education = portfolioData?.education || [];
  const skills = portfolioData?.skills || [];

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-16">
      <div className="max-w-6xl mx-auto px-6 space-y-20">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Stack Architect & Builder</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
              Passionate about creating modern, intuitive, and scalable software.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {personalInfo.bio ||
                'I specialize in building full-stack applications with Next.js, React, and modern cloud infrastructure. My focus is on creating clean architectures, high-performance user interfaces, and intelligent AI-augmented digital tools.'}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 shadow-md shadow-primary/20 transition-all"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {personalInfo.resume && (
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-semibold text-sm transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl p-2 bg-gradient-to-tr from-primary/20 to-accent/20">
              <div className="w-full h-full rounded-2xl overflow-hidden relative bg-card flex items-center justify-center">
                {personalInfo.avatar && isValidUrl(personalInfo.avatar) ? (
                  <Image
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-7xl font-black text-primary/40">
                    {personalInfo.name?.charAt(0) || 'D'}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border space-y-2">
            <MapPin className="w-5 h-5 text-green-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Location</h4>
            <p className="text-base font-semibold text-foreground">{personalInfo.location || 'Remote / Global'}</p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-2">
            <Mail className="w-5 h-5 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</h4>
            <p className="text-base font-semibold text-foreground break-all">{personalInfo.email}</p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-2">
            <Compass className="w-5 h-5 text-amber-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Availability</h4>
            <p className="text-base font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Open to Opportunities
            </p>
          </div>
        </div>

        {/* Technical Skills Radar */}
        {skills.length > 0 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-foreground">Technical Proficiency</h2>
              <p className="text-muted-foreground text-sm">Technologies and frameworks I build with on a daily basis.</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-card border border-border space-y-2 shadow-xs hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-foreground">{skill.name}</span>
                    <span className="text-xs font-bold text-primary">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground block">{skill.category || 'Engineering'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Timeline */}
        {experience.length > 0 && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-foreground flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary" />
                Work Experience
              </h2>
              <p className="text-muted-foreground text-sm">Key roles and leadership contributions.</p>
            </div>

            <div className="space-y-6">
              {experience.map((exp, index) => {
                const roleId = exp.id || index;
                const achievements = exp.achievements || [];
                const isExpanded = expandedRoles[roleId];
                const displayedAchievements = isExpanded ? achievements : achievements.slice(0, 2);

                return (
                  <div
                    key={roleId}
                    className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-5 shadow-xs hover:border-primary/40 transition-colors relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                          {sanitizeText(exp.position)}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm">
                          <p className="text-primary font-semibold flex items-center gap-1.5">
                            <Building2 className="w-4 h-4" />
                            {sanitizeText(exp.company)}
                          </p>
                          {exp.location && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {sanitizeText(exp.location)}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-semibold w-fit border border-border/60">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {sanitizeText(exp.duration)}
                      </span>
                    </div>

                    {exp.description && (
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {sanitizeText(exp.description)}
                      </p>
                    )}

                    {/* Key Achievements */}
                    {achievements.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Key Responsibilities & Achievements:
                        </h4>

                        <div className="grid gap-2.5">
                          {displayedAchievements.map((item, i) => {
                            const parsed = parseAchievement(item);
                            return (
                              <div
                                key={i}
                                className="p-3.5 rounded-2xl bg-muted/40 border border-border/60 hover:border-primary/30 transition-all flex items-start gap-3"
                              >
                                <div className="mt-0.5 p-1 rounded-md bg-primary/10 text-primary shrink-0">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </div>
                                <div className="text-xs sm:text-sm leading-relaxed">
                                  {parsed.title && (
                                    <span className="font-bold text-foreground block sm:inline sm:mr-1.5 text-xs sm:text-sm">
                                      {parsed.title}:
                                    </span>
                                  )}
                                  <span className="text-muted-foreground">{parsed.detail}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {achievements.length > 2 && (
                          <button
                            type="button"
                            onClick={() => toggleRoleAchievements(roleId)}
                            className="mt-2 text-xs font-bold text-primary hover:text-primary/80 inline-flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-primary/5 transition-colors"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="w-3.5 h-3.5" />
                                Show Less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-3.5 h-3.5" />
                                Show All ({achievements.length}) Achievements
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Technologies Used & Metrics */}
                    {((exp.technologies && exp.technologies.length > 0) ||
                      (exp.metrics && exp.metrics.length > 0)) && (
                      <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-xs font-medium text-muted-foreground mr-1">Stack:</span>
                            {exp.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-lg bg-muted text-foreground text-xs font-mono font-medium border border-border"
                              >
                                {sanitizeText(tech)}
                              </span>
                            ))}
                          </div>
                        )}

                        {exp.metrics && exp.metrics.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            {exp.metrics.map((metric, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20"
                              >
                                <TrendingUp className="w-3.5 h-3.5" />
                                {sanitizeText(metric)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-foreground flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-accent" />
                Education & Credentials
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <div
                  key={edu.id || index}
                  className="p-6 rounded-2xl bg-card border border-border space-y-2 shadow-xs"
                >
                  <h3 className="text-lg font-bold text-foreground">{edu.degree}</h3>
                  <p className="text-primary font-medium text-sm">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
