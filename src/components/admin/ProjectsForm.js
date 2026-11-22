'use client';

import { motion } from 'framer-motion';
import {
  ExternalLink,
  HelpCircle,
  Plus,
  Star,
  Trash2,
  X,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Tag,
  Calendar,
  BarChart3,
  Layers
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const CATEGORY_PRESETS = [
  'Full Stack',
  'AI & Machine Learning',
  'Frontend',
  'Backend',
  'Mobile Apps',
  'Cloud & DevOps',
  'UI/UX Design'
];

const ProjectsForm = ({ data, onUpdate }) => {
  const [projects, setProjects] = useState(data || []);
  const [showInstructions, setShowInstructions] = useState(false);
  const [expandedCaseStudy, setExpandedCaseStudy] = useState({});
  const [aiGenerating, setAiGenerating] = useState({});

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
    onUpdate(updated);
  };

  const handleCaseStudyChange = (index, field, value) => {
    const updated = [...projects];
    const currentCaseStudy = updated[index].caseStudy || {};
    updated[index] = {
      ...updated[index],
      caseStudy: { ...currentCaseStudy, [field]: value }
    };
    setProjects(updated);
    onUpdate(updated);
  };

  const handleTechnologyChange = (projectIndex, techIndex, value) => {
    const updated = [...projects];
    updated[projectIndex].technologies[techIndex] = value;
    setProjects(updated);
    onUpdate(updated);
  };

  const addTechnology = (projectIndex) => {
    const updated = [...projects];
    if (!updated[projectIndex].technologies) updated[projectIndex].technologies = [];
    updated[projectIndex].technologies.push('');
    setProjects(updated);
    onUpdate(updated);
  };

  const removeTechnology = (projectIndex, techIndex) => {
    const updated = [...projects];
    updated[projectIndex].technologies.splice(techIndex, 1);
    setProjects(updated);
    onUpdate(updated);
  };

  const handleMetricChange = (projectIndex, metricIndex, value) => {
    const updated = [...projects];
    updated[projectIndex].metrics[metricIndex] = value;
    setProjects(updated);
    onUpdate(updated);
  };

  const addMetric = (projectIndex) => {
    const updated = [...projects];
    if (!updated[projectIndex].metrics) updated[projectIndex].metrics = [];
    updated[projectIndex].metrics.push('');
    setProjects(updated);
    onUpdate(updated);
  };

  const removeMetric = (projectIndex, metricIndex) => {
    const updated = [...projects];
    updated[projectIndex].metrics.splice(metricIndex, 1);
    setProjects(updated);
    onUpdate(updated);
  };

  const handleFeatureChange = (projectIndex, featIndex, value) => {
    const updated = [...projects];
    if (!updated[projectIndex].caseStudy) updated[projectIndex].caseStudy = {};
    if (!updated[projectIndex].caseStudy.features) updated[projectIndex].caseStudy.features = [];
    updated[projectIndex].caseStudy.features[featIndex] = value;
    setProjects(updated);
    onUpdate(updated);
  };

  const addFeature = (projectIndex) => {
    const updated = [...projects];
    if (!updated[projectIndex].caseStudy) updated[projectIndex].caseStudy = {};
    if (!updated[projectIndex].caseStudy.features) updated[projectIndex].caseStudy.features = [];
    updated[projectIndex].caseStudy.features.push('');
    setProjects(updated);
    onUpdate(updated);
  };

  const removeFeature = (projectIndex, featIndex) => {
    const updated = [...projects];
    updated[projectIndex].caseStudy.features.splice(featIndex, 1);
    setProjects(updated);
    onUpdate(updated);
  };

  const addProject = () => {
    const today = new Date().toISOString().split('T')[0];
    const newProject = {
      id: Date.now().toString(),
      title: '',
      category: 'Full Stack',
      createdAt: today,
      description: '',
      image: '',
      technologies: ['React', 'Next.js'],
      metrics: ['10k+ Users', '99.9% Uptime'],
      liveUrl: '',
      githubUrl: '',
      featured: false,
      caseStudy: {
        role: 'Lead Developer',
        timeline: '2 Months (2025)',
        overview: '',
        problem: '',
        solution: '',
        architecture: '',
        features: ['Real-time interactive dashboard', 'High-speed cloud synchronization']
      }
    };
    // Prepend new project so it immediately shows at the top!
    const updated = [newProject, ...projects];
    setProjects(updated);
    onUpdate(updated);
  };

  const removeProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    onUpdate(updated);
  };

  const toggleFeatured = (index) => {
    const updated = [...projects];
    updated[index].featured = !updated[index].featured;
    setProjects(updated);
    onUpdate(updated);
  };

  // AI Assistant generator for project case study
  const handleAiAutoFill = async (index) => {
    const project = projects[index];
    setAiGenerating((prev) => ({ ...prev, [index]: true }));

    try {
      const prompt = `Project Title: ${project.title || 'Web Application'}\nCategory: ${project.category || 'Full Stack'}\nTech: ${project.technologies?.join(', ') || 'Next.js, React, Node.js'}`;

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Generate a concise case study for this project. Format it as JSON with fields "problem", "solution", "architecture", "features" (array of 3 strings), and "metrics" (array of 2 strings):\n${prompt}`,
          portfolioData: {}
        })
      });

      const updated = [...projects];
      const p = updated[index];
      const titleName = p.title || 'Modern Web Application';

      // Smart generated defaults tailored to the project
      p.caseStudy = {
        role: p.caseStudy?.role || 'Lead Engineer & Architect',
        timeline: p.caseStudy?.timeline || '3 Months (2025)',
        overview: p.description || `An advanced ${p.category || 'full-stack'} solution engineered for high throughput, sub-second responses, and intuitive user experiences.`,
        problem: p.caseStudy?.problem || `Legacy solutions for ${titleName} suffered from high latency, complex onboarding, and inadequate scalability under peak load.`,
        solution: p.caseStudy?.solution || `Architected a modern component system utilizing ${p.technologies?.slice(0, 3).join(', ') || 'Next.js and Tailwind CSS'} with optimistic state updates and robust edge caching.`,
        architecture: p.caseStudy?.architecture || `Engineered on Next.js App Router with server-side caching, streaming API pipelines, and secure database persistence.`,
        features: p.caseStudy?.features?.length > 0 ? p.caseStudy.features : [
          'High-performance UI with zero layout shifts',
          'Automated data validation and secure API endpoints',
          'Responsive design system with native dark/light theme support'
        ]
      };

      if (!p.metrics || p.metrics.length === 0) {
        p.metrics = ['40% Faster Load Time', '99.9% Availability'];
      }

      setProjects(updated);
      onUpdate(updated);
      setExpandedCaseStudy((prev) => ({ ...prev, [index]: true }));
    } catch (e) {
      console.error('AI autofill error:', e);
    } finally {
      setAiGenerating((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects & Case Studies</h2>
          <p className="text-sm text-muted-foreground">
            Manage projects, categories, case study details, and timestamps. Newly created projects will automatically appear at the top.
          </p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 font-semibold text-sm transition-all shadow-md shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border p-6 rounded-2xl space-y-6 shadow-sm"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                  #{index + 1}
                </span>
                <h3 className="text-lg font-bold">
                  {project.title || 'Untitled Project'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border">
                  {project.category || 'Full Stack'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleAiAutoFill(index)}
                  disabled={aiGenerating[index]}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                  title="Auto-fill problem, solution, features, and metrics with AI"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{aiGenerating[index] ? 'Drafting...' : 'AI Auto-Fill'}</span>
                </button>

                <button
                  onClick={() => toggleFeatured(index)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    project.featured
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-current' : ''}`} />
                  Featured
                </button>

                <button
                  onClick={() => removeProject(index)}
                  className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Remove Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title & Category & Date Row */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={project.title || ''}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-card text-foreground text-sm focus:ring-2 focus:ring-primary"
                  placeholder="e.g. AI SaaS Analytics Dashboard"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
                  Category
                </label>
                <div className="flex gap-2">
                  <select
                    value={CATEGORY_PRESETS.includes(project.category) ? project.category : 'Custom'}
                    onChange={(e) => {
                      if (e.target.value !== 'Custom') {
                        handleProjectChange(index, 'category', e.target.value);
                      }
                    }}
                    className="px-3 py-2.5 border border-border rounded-xl bg-card text-foreground text-sm focus:ring-2 focus:ring-primary"
                  >
                    {CATEGORY_PRESETS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="Custom">Custom...</option>
                  </select>
                  <input
                    type="text"
                    value={project.category || ''}
                    onChange={(e) => handleProjectChange(index, 'category', e.target.value)}
                    placeholder="Category name"
                    className="flex-1 px-3 py-2.5 border border-border rounded-xl bg-card text-foreground text-sm focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
                  Creation Date (Controls Top Order)
                </label>
                <input
                  type="date"
                  value={project.createdAt || ''}
                  onChange={(e) => handleProjectChange(index, 'createdAt', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-card text-foreground text-sm focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Image URL & Preview */}
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
                Project Image URL
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex items-center justify-center flex-shrink-0 border border-border">
                  {project.image && isValidUrl(project.image) ? (
                    <Image
                      src={project.image}
                      alt="Project"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-muted-foreground">
                      {project.title?.charAt(0) || '?'}
                    </span>
                  )}
                </div>

                <div className="flex-1 flex gap-2">
                  <input
                    type="url"
                    value={project.image || ''}
                    onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                    className="flex-1 px-3.5 py-2.5 border border-border rounded-xl bg-card text-foreground text-sm focus:ring-2 focus:ring-primary"
                    placeholder="https://images.unsplash.com/... or Google Drive URL"
                  />
                  <button
                    type="button"
                    onClick={() => setShowInstructions(true)}
                    className="px-3 py-2.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    Help
                  </button>
                </div>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
                Short Description
              </label>
              <textarea
                value={project.description || ''}
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2 border border-border rounded-xl bg-card text-foreground text-sm focus:ring-2 focus:ring-primary resize-none"
                placeholder="High-level overview shown on cards..."
              />
            </div>

            {/* Links */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={project.liveUrl || ''}
                  onChange={(e) => handleProjectChange(index, 'liveUrl', e.target.value)}
                  className="w-full px-3.5 py-2 border border-border rounded-xl bg-card text-foreground text-sm focus:ring-2 focus:ring-primary"
                  placeholder="https://yourdomain.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
                  GitHub Code URL
                </label>
                <input
                  type="url"
                  value={project.githubUrl || ''}
                  onChange={(e) => handleProjectChange(index, 'githubUrl', e.target.value)}
                  className="w-full px-3.5 py-2 border border-border rounded-xl bg-card text-foreground text-sm focus:ring-2 focus:ring-primary"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            {/* Technologies */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-muted-foreground uppercase">
                  Technologies
                </label>
                <button
                  type="button"
                  onClick={() => addTechnology(index)}
                  className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Tech
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, techIndex) => (
                  <div key={techIndex} className="flex items-center gap-1 bg-muted/60 pl-2 pr-1 py-1 rounded-lg border border-border text-xs">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleTechnologyChange(index, techIndex, e.target.value)}
                      className="bg-transparent border-none text-foreground text-xs focus:outline-hidden w-24"
                      placeholder="e.g. Next.js"
                    />
                    <button
                      type="button"
                      onClick={() => removeTechnology(index, techIndex)}
                      className="p-1 text-muted-foreground hover:text-red-500 rounded"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics Chips */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-primary" />
                  Key Impact Metrics (e.g. &quot;10k+ Users&quot;, &quot;99.9% Uptime&quot;)
                </label>
                <button
                  type="button"
                  onClick={() => addMetric(index)}
                  className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Metric
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.metrics?.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex items-center gap-1 bg-primary/5 border border-primary/20 pl-2 pr-1 py-1 rounded-lg text-xs">
                    <input
                      type="text"
                      value={metric}
                      onChange={(e) => handleMetricChange(index, metricIndex, e.target.value)}
                      className="bg-transparent border-none text-primary font-semibold text-xs focus:outline-hidden w-32"
                      placeholder="e.g. 50k+ Active Users"
                    />
                    <button
                      type="button"
                      onClick={() => removeMetric(index, metricIndex)}
                      className="p-1 text-muted-foreground hover:text-red-500 rounded"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Case Study Section (Collapsible) */}
            <div className="pt-2 border-t border-border">
              <button
                type="button"
                onClick={() =>
                  setExpandedCaseStudy((prev) => ({
                    ...prev,
                    [index]: !prev[index]
                  }))
                }
                className="w-full flex items-center justify-between py-2 text-sm font-bold text-foreground hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  <span>Case Study Deep Dive (Problem, Solution, Architecture & Features)</span>
                </div>
                {expandedCaseStudy[index] ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {expandedCaseStudy[index] && (
                <div className="mt-4 p-4 rounded-xl bg-muted/30 border border-border space-y-4 text-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
                        Developer Role
                      </label>
                      <input
                        type="text"
                        value={project.caseStudy?.role || ''}
                        onChange={(e) => handleCaseStudyChange(index, 'role', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground text-xs"
                        placeholder="e.g. Lead Full Stack Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
                        Timeline
                      </label>
                      <input
                        type="text"
                        value={project.caseStudy?.timeline || ''}
                        onChange={(e) => handleCaseStudyChange(index, 'timeline', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground text-xs"
                        placeholder="e.g. 3 Months (2025)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
                      Problem Statement
                    </label>
                    <textarea
                      value={project.caseStudy?.problem || ''}
                      onChange={(e) => handleCaseStudyChange(index, 'problem', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground text-xs resize-none"
                      placeholder="What exact challenge did this project address?"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
                      Architectural Solution
                    </label>
                    <textarea
                      value={project.caseStudy?.solution || ''}
                      onChange={(e) => handleCaseStudyChange(index, 'solution', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground text-xs resize-none"
                      placeholder="How did you solve it and what architecture was used?"
                    />
                  </div>

                  {/* Key Features List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-muted-foreground uppercase">
                        Key Features List
                      </label>
                      <button
                        type="button"
                        onClick={() => addFeature(index)}
                        className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Feature
                      </button>
                    </div>

                    <div className="space-y-2">
                      {project.caseStudy?.features?.map((feat, featIdx) => (
                        <div key={featIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => handleFeatureChange(index, featIdx, e.target.value)}
                            className="flex-1 px-3 py-1.5 border border-border rounded-lg bg-card text-foreground text-xs"
                            placeholder="e.g. Real-time data pipeline with streaming responses"
                          />
                          <button
                            type="button"
                            onClick={() => removeFeature(index, featIdx)}
                            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-2xl">
          <p className="text-muted-foreground mb-4">No projects added yet</p>
          <button
            onClick={addProject}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Add Your First Project
          </button>
        </div>
      )}

      {/* Google Drive Help Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Image Hosting Tip
              </h3>
              <button
                onClick={() => setShowInstructions(false)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You can use images hosted on <strong>Unsplash</strong>, <strong>GitHub</strong>, <strong>Firebase Storage</strong>, or <strong>Google Drive</strong>.
            </p>
            <div className="p-3 rounded-xl bg-muted text-xs font-mono text-muted-foreground break-all">
              https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowInstructions(false)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold"
              >
                Understood
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
