'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Building2,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Sparkles
} from 'lucide-react';

// Sanitize unprintable or corrupted characters (e.g. Unicode replacement boxes)
const sanitizeText = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/\uFFFD/g, '') // remove Unicode replacement character
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

const About = ({ personalInfo = {}, experience = [], education = [] }) => {
  // State for toggling expanded achievements per role
  const [expandedRoles, setExpandedRoles] = useState({});

  const toggleRoleAchievements = (roleId) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };

  return (
    <section id="about" className="py-24 bg-background text-foreground relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 space-y-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Background & Credentials
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            About Me & Experience
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get to know more about my journey, technical leadership, and engineering impact.
          </p>
        </motion.div>

        {/* Top Grid: Story & Contact/Education */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Story / Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-card border border-border p-8 rounded-3xl shadow-sm space-y-6 relative overflow-hidden"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Overview</span>
              <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                Passionate Developer & Problem Solver
              </h3>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {personalInfo.bio ||
                `I'm a dedicated software engineer specializing in modern web and mobile applications. 
                With a strong foundation in full-stack architecture, clean code principles, and intuitive UX, 
                I build robust digital products that deliver tangible business results.`}
            </p>

            <div className="pt-4 border-t border-border grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/60">
                <span className="text-xs text-muted-foreground block">Specialty</span>
                <span className="font-bold text-sm text-foreground">Full-Stack & Cloud</span>
              </div>
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/60">
                <span className="text-xs text-muted-foreground block">Focus</span>
                <span className="font-bold text-sm text-foreground">Scalable Systems</span>
              </div>
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/60">
                <span className="text-xs text-muted-foreground block">Availability</span>
                <span className="font-bold text-sm text-green-600 dark:text-green-400">Open to Roles</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Details & Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Contacts */}
            <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Contact Information
              </h4>
              <div className="space-y-3 text-sm">
                {personalInfo.email && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-muted-foreground break-all">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-muted-foreground">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-green-500/10 text-green-500 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-muted-foreground">{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Education */}
            {education.length > 0 && (
              <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-accent" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Education
                  </h4>
                </div>
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div key={edu.id || idx} className="border-l-2 border-accent/40 pl-3.5 space-y-1">
                      <h5 className="font-bold text-foreground text-sm">{edu.degree}</h5>
                      <p className="text-xs text-primary font-medium">{edu.institution}</p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {edu.duration} {edu.location ? `• ${edu.location}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Dedicated Full-Width Work Experience Timeline */}
        {experience.length > 0 && (
          <div className="space-y-8 pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Briefcase className="w-4 h-4" />
                <span>Professional Journey</span>
              </div>
              <h3 className="text-3xl font-black text-foreground">Work Experience</h3>
              <p className="text-muted-foreground text-sm max-w-xl">
                Comprehensive track record of delivered products, technical responsibilities, and leadership roles.
              </p>
            </div>

            <div className="relative border-l-2 border-border/80 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10">
              {experience.map((exp, index) => {
                const roleId = exp.id || index;
                const achievements = exp.achievements || [];
                const isExpanded = expandedRoles[roleId];
                const displayedAchievements = isExpanded ? achievements : achievements.slice(0, 2);

                return (
                  <motion.div
                    key={roleId}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    {/* Glowing Timeline Node */}
                    <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-card border-2 border-primary group-hover:scale-125 group-hover:bg-primary transition-all duration-300 shadow-xs" />

                    {/* Role Card */}
                    <div className="bg-card border border-border hover:border-primary/50 transition-colors p-6 sm:p-8 rounded-3xl shadow-sm space-y-5">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5">
                          <h4 className="text-xl sm:text-2xl font-bold text-foreground">
                            {sanitizeText(exp.position)}
                          </h4>
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="font-semibold text-primary flex items-center gap-1.5">
                              <Building2 className="w-4 h-4" />
                              {sanitizeText(exp.company)}
                            </span>
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

                      {/* Description Summary */}
                      {exp.description && (
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                          {sanitizeText(exp.description)}
                        </p>
                      )}

                      {/* Structured Achievements */}
                      {achievements.length > 0 && (
                        <div className="space-y-3 pt-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                            Key Achievements & Contributions:
                          </span>

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

                          {/* Show More / Show Less Toggle Button */}
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

                      {/* Footer: Tech Stack & Impact Metrics */}
                      {((exp.technologies && exp.technologies.length > 0) ||
                        (exp.metrics && exp.metrics.length > 0)) && (
                        <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                          {/* Technologies */}
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

                          {/* Metrics */}
                          {exp.metrics && exp.metrics.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                              {exp.metrics.map((metric, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20"
                                >
                                  <TrendingUp className="w-3 h-3" />
                                  {sanitizeText(metric)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
