'use client';

import AIAssistantDrawer from '@/components/AIAssistantDrawer';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { defaultPortfolioData, getPortfolioData } from '@/lib/portfolioData';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Code2,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPortfolioData();
        setPortfolioData(data);
      } catch (err) {
        console.error('Error loading about data:', err);
        setPortfolioData(defaultPortfolioData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const data = portfolioData || defaultPortfolioData;
  const pInfo = data?.personalInfo || {};
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!skill) return acc;
    const category = skill.category || 'Engineering';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-mono text-muted-foreground">Loading biography and experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navigation
        personalInfo={pInfo}
        onOpenAI={() => setAiDrawerOpen(true)}
      />

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home Overview</span>
          </Link>
        </div>

        {/* Monograph Header */}
        <div className="mb-16 pb-12 border-b border-border/60">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Monograph & Background</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            About & Experience
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
            {pInfo.bio ||
              'Full stack software architect with a passion for designing scalable cloud systems, intuitive developer workflows, and resilient digital products.'}
          </p>

          {/* Contact Details Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-card border border-border text-xs font-mono">
            {pInfo.email && (
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary" />
                <a href={`mailto:${pInfo.email}`} className="text-foreground hover:underline">
                  {pInfo.email}
                </a>
              </div>
            )}
            {pInfo.location && (
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span className="text-foreground">{pInfo.location}</span>
              </div>
            )}
            {pInfo.resume && (
              <div className="flex items-center gap-2.5">
                <Download className="w-4 h-4 text-amber-500" />
                <a href={pInfo.resume} download className="text-primary hover:underline font-semibold">
                  Download Full CV / Resume
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Chronological Experience Timeline */}
        <section className="mb-16">
          <div className="flex items-center gap-2.5 mb-8">
            <Briefcase className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Professional Experience
            </h2>
          </div>

          <div className="space-y-8 relative pl-6 border-l border-border/80 ml-2">
            {experience.map((exp, idx) => (
              <motion.div
                key={exp.id || idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative space-y-2"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-lg font-bold text-foreground">
                    {exp.position}
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.duration}
                  </span>
                </div>

                <div className="text-sm font-semibold text-primary">
                  {exp.company}
                  {exp.location && (
                    <span className="text-xs font-normal text-muted-foreground ml-2">
                      · {exp.location}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        {education.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-2.5 mb-8">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Education & Credentials
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="p-6 rounded-2xl bg-card border border-border space-y-2"
                >
                  <h3 className="text-base font-bold text-foreground">{edu.degree}</h3>
                  <p className="text-sm text-primary font-medium">{edu.institution}</p>
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-2">
                    <span>{edu.duration}</span>
                    {edu.location && <span>{edu.location}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interactive Skills Matrix */}
        <section className="mb-16">
          <div className="flex items-center gap-2.5 mb-8">
            <Code2 className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Technical Competencies & Stack Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(groupedSkills).map(([cat, skillList], cIdx) => (
              <div
                key={cat}
                className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4"
              >
                <h3 className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                  {cat}
                </h3>

                <div className="space-y-3">
                  {skillList.map((skill, sIdx) => (
                    <div key={skill.name || sIdx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="font-semibold text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level || 85}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level || 85}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: sIdx * 0.05 }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className="p-8 rounded-3xl bg-muted/40 border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="font-bold text-foreground text-lg mb-1">
              Interested in collaborating or discussing an architecture?
            </h3>
            <p className="text-sm text-muted-foreground">
              Always open to discussing high-throughput engineering challenges, systems design, and AI tooling.
            </p>
          </div>
          <Link
            href="/#contact"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition-opacity shrink-0"
          >
            Initiate Conversation
          </Link>
        </div>
      </main>

      <Footer
        personalInfo={pInfo}
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
