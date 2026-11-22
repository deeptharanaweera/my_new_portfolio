'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  HelpCircle,
  Layers,
  Loader2,
  Plus,
  Sparkles,
  Star,
  Trash2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

const ProjectsForm = ({ data = [], categories = [], onUpdate, onUpdateCategories }) => {
  const [projects, setProjects] = useState(data || []);
  const [showInstructions, setShowInstructions] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState({});

  // AI Writer Modal State
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [aiNotes, setAiNotes] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [aiDraft, setAiDraft] = useState(null);

  const availableCategories = useMemo(() => {
    const set = new Set([
      'Full Stack',
      'Web Platform',
      'Mobile App',
      'AI & Data',
      'Cloud Architecture',
    ]);
    if (Array.isArray(categories)) {
      categories.forEach((c) => c && set.add(c.trim()));
    }
    projects.forEach((p) => {
      if (p.category) set.add(p.category.trim());
    });
    return Array.from(set);
  }, [categories, projects]);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const toggleExpand = (index) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
    onUpdate(updated);
  };

  // Add Project prepended to top (Newest First!)
  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      slug: `project-${Date.now()}`,
      title: 'New Engineering Project',
      category: availableCategories[0] || 'Full Stack',
      createdAt: new Date().toISOString(),
      year: new Date().getFullYear().toString(),
      role: 'Full Stack Engineer',
      status: 'Production',
      summary: '',
      description: '',
      problem: '',
      solution: '',
      architectureNotes: '',
      highlights: [],
      metrics: [],
      image: '',
      gallery: [],
      technologies: ['TypeScript', 'Next.js'],
      liveUrl: '',
      githubUrl: '',
      featured: false,
    };

    const updated = [newProject, ...projects];
    setProjects(updated);
    onUpdate(updated);
    // Auto expand newly added project
    setExpandedProjects((prev) => ({ ...prev, 0: true }));
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

  // Reordering: Move Up
  const moveUp = (index) => {
    if (index <= 0) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setProjects(updated);
    onUpdate(updated);
  };

  // Reordering: Move Down
  const moveDown = (index) => {
    if (index >= projects.length - 1) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setProjects(updated);
    onUpdate(updated);
  };

  // Technologies management
  const handleTechChange = (pIdx, tIdx, val) => {
    const updated = [...projects];
    const techs = [...(updated[pIdx].technologies || [])];
    techs[tIdx] = val;
    updated[pIdx].technologies = techs;
    setProjects(updated);
    onUpdate(updated);
  };

  const addTech = (pIdx) => {
    const updated = [...projects];
    const techs = [...(updated[pIdx].technologies || []), ''];
    updated[pIdx].technologies = techs;
    setProjects(updated);
    onUpdate(updated);
  };

  const removeTech = (pIdx, tIdx) => {
    const updated = [...projects];
    const techs = (updated[pIdx].technologies || []).filter((_, i) => i !== tIdx);
    updated[pIdx].technologies = techs;
    setProjects(updated);
    onUpdate(updated);
  };

  // Highlights management
  const handleHighlightChange = (pIdx, hIdx, val) => {
    const updated = [...projects];
    const list = [...(updated[pIdx].highlights || [])];
    list[hIdx] = val;
    updated[pIdx].highlights = list;
    setProjects(updated);
    onUpdate(updated);
  };

  const addHighlight = (pIdx) => {
    const updated = [...projects];
    const list = [...(updated[pIdx].highlights || []), ''];
    updated[pIdx].highlights = list;
    setProjects(updated);
    onUpdate(updated);
  };

  const removeHighlight = (pIdx, hIdx) => {
    const updated = [...projects];
    const list = (updated[pIdx].highlights || []).filter((_, i) => i !== hIdx);
    updated[pIdx].highlights = list;
    setProjects(updated);
    onUpdate(updated);
  };

  // Metrics management
  const handleMetricChange = (pIdx, mIdx, field, val) => {
    const updated = [...projects];
    const list = [...(updated[pIdx].metrics || [])];
    list[mIdx] = { ...(list[mIdx] || {}), [field]: val };
    updated[pIdx].metrics = list;
    setProjects(updated);
    onUpdate(updated);
  };

  const addMetric = (pIdx) => {
    const updated = [...projects];
    const list = [...(updated[pIdx].metrics || []), { label: '', value: '' }];
    updated[pIdx].metrics = list;
    setProjects(updated);
    onUpdate(updated);
  };

  const removeMetric = (pIdx, mIdx) => {
    const updated = [...projects];
    const list = (updated[pIdx].metrics || []).filter((_, i) => i !== mIdx);
    updated[pIdx].metrics = list;
    setProjects(updated);
    onUpdate(updated);
  };

  // Add custom category
  const handleCreateCategory = (projectIndex) => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed) return;
    if (onUpdateCategories) {
      const nextCategories = Array.from(new Set([...availableCategories, trimmed]));
      onUpdateCategories(nextCategories);
    }
    handleProjectChange(projectIndex, 'category', trimmed);
    setNewCategoryInput('');
    setShowAddCategory(false);
  };

  // AI Writer Modal Handlers
  const openAiWriter = (index) => {
    setActiveProjectIndex(index);
    setAiNotes('');
    setAiDraft(null);
    setAiError(null);
    setAiModalOpen(true);
  };

  const handleGenerateAiCaseStudy = async () => {
    if (activeProjectIndex === null) return;
    const currentProj = projects[activeProjectIndex];

    setAiLoading(true);
    setAiError(null);

    try {
      const res = await fetch('/api/ai/case-study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: currentProj.title,
          category: currentProj.category,
          technologies: currentProj.technologies,
          notes: aiNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setAiError(data.message || 'AI Case Study generation failed.');
        return;
      }

      setAiDraft(data);
    } catch (err) {
      console.error('AI draft error:', err);
      setAiError('Failed to communicate with AI case study route.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplyAiDraft = () => {
    if (!aiDraft || activeProjectIndex === null) return;
    const updated = [...projects];
    const cur = updated[activeProjectIndex];

    updated[activeProjectIndex] = {
      ...cur,
      summary: aiDraft.summary || cur.summary,
      description: aiDraft.description || cur.description,
      problem: aiDraft.problem || cur.problem,
      solution: aiDraft.solution || cur.solution,
      architectureNotes: aiDraft.architectureNotes || cur.architectureNotes,
      highlights:
        aiDraft.highlights && aiDraft.highlights.length > 0
          ? aiDraft.highlights
          : cur.highlights,
      metrics:
        aiDraft.metrics && aiDraft.metrics.length > 0 ? aiDraft.metrics : cur.metrics,
    };

    setProjects(updated);
    onUpdate(updated);
    setAiModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>Projects Studio</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Newest-First
            </span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            New projects automatically prepend at the top. Use Move Up/Down to customize order.
          </p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 active:scale-[0.98] transition-all text-sm font-semibold self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project (Prepend)</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project, index) => {
          const isExpanded = expandedProjects[index] !== false; // default expanded

          return (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border/80 rounded-2xl shadow-xs overflow-hidden"
            >
              {/* Card Collapsible Header Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between bg-muted/30 border-b border-border/60">
                <div className="flex items-center gap-3">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-muted"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === projects.length - 1}
                      className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-muted"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Thumbnail snippet */}
                  <div className="w-10 h-10 rounded-lg bg-muted border border-border overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs text-primary font-mono">
                    {project.image && isValidUrl(project.image) ? (
                      <Image
                        src={project.image}
                        alt="thumb"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      project.title?.charAt(0) || 'P'
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-foreground">
                        #{index + 1} {project.title || 'Untitled Project'}
                      </span>
                      {project.featured && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          Featured
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {project.category || 'Web Platform'} · {project.year || '2025'}
                    </span>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openAiWriter(index)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    title="Generate or enhance with Gemini AI"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">AI Case Study Writer</span>
                  </button>

                  <button
                    onClick={() => toggleFeatured(index)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      project.featured
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-current' : ''}`} />
                    <span className="hidden sm:inline">Featured</span>
                  </button>

                  <button
                    onClick={() => removeProject(index)}
                    className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Remove Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleExpand(index)}
                    className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Card Form Body */}
              {isExpanded && (
                <div className="p-6 space-y-6">
                  {/* Row 1: Title, Category, Year, Role, Status */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        value={project.title || ''}
                        onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                        placeholder="Pulse Commerce Engine"
                      />
                    </div>

                    {/* Category Selector + Custom Category */}
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                        Category
                      </label>
                      <div className="flex gap-1.5">
                        <select
                          value={project.category || 'Full Stack'}
                          onChange={(e) => handleProjectChange(index, 'category', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                        >
                          {availableCategories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => setShowAddCategory(index === showAddCategory ? null : index)}
                          className="px-2.5 py-2 border border-border rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
                          title="Add custom category"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {showAddCategory === index && (
                        <div className="mt-2 flex gap-1.5">
                          <input
                            type="text"
                            value={newCategoryInput}
                            onChange={(e) => setNewCategoryInput(e.target.value)}
                            placeholder="New category name..."
                            className="flex-1 px-2.5 py-1.5 text-xs border border-border rounded-lg bg-background text-foreground"
                          />
                          <button
                            type="button"
                            onClick={() => handleCreateCategory(index)}
                            className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:opacity-90"
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                        Year
                      </label>
                      <input
                        type="text"
                        value={project.year || ''}
                        onChange={(e) => handleProjectChange(index, 'year', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                        placeholder="2026"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                        Role / Context
                      </label>
                      <input
                        type="text"
                        value={project.role || ''}
                        onChange={(e) => handleProjectChange(index, 'role', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                        placeholder="Lead Engineer / Founder"
                      />
                    </div>
                  </div>

                  {/* Row 2: Image URL with Google Drive Helper */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Cover Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={project.image || ''}
                        onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                        className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                        placeholder="https://drive.google.com/uc?id=... or https://..."
                      />
                      <button
                        type="button"
                        onClick={() => setShowInstructions(true)}
                        className="px-3 py-2 bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-primary" />
                        <span>GDrive Help</span>
                      </button>
                      {project.image && (
                        <button
                          type="button"
                          onClick={() => handleProjectChange(index, 'image', '')}
                          className="px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-lg text-xs"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Summary (Teaser for Cards) */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Summary Teaser (Displayed on Cards & AI Citations)
                      </label>
                      <span className="text-[11px] text-muted-foreground">1-2 sentences</span>
                    </div>
                    <textarea
                      value={project.summary || ''}
                      onChange={(e) => handleProjectChange(index, 'summary', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
                      placeholder="High-concurrency headless e-commerce engine with sub-50ms checkout flows..."
                    />
                  </div>

                  {/* Row 4: Editorial Overview Description */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Full Case Study Description
                    </label>
                    <textarea
                      value={project.description || ''}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      placeholder="Detailed narrative describing the technical scope, execution, and system dynamics..."
                    />
                  </div>

                  {/* Row 5: Problem and Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-amber-500 uppercase tracking-wider mb-1.5">
                        Problem Statement
                      </label>
                      <textarea
                        value={project.problem || ''}
                        onChange={(e) => handleProjectChange(index, 'problem', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                        placeholder="Bottlenecks, scaling constraints, or legacy issues..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1.5">
                        Technical Solution & Execution
                      </label>
                      <textarea
                        value={project.solution || ''}
                        onChange={(e) => handleProjectChange(index, 'solution', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                        placeholder="Architectural approach, caching layers, and protocols..."
                      />
                    </div>
                  </div>

                  {/* Row 6: Architecture Notes */}
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                      Architecture & Concurrency Notes (Technical Specification)
                    </label>
                    <textarea
                      value={project.architectureNotes || ''}
                      onChange={(e) => handleProjectChange(index, 'architectureNotes', e.target.value)}
                      rows={2}
                      className="w-full font-mono text-xs px-3 py-2 border border-border rounded-lg bg-muted/30 text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      placeholder="Distributed workers, Redis locks, Edge runtime routing, DB indexing..."
                    />
                  </div>

                  {/* Row 7: Technologies */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Technologies Stack
                      </label>
                      <button
                        type="button"
                        onClick={() => addTech(index)}
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Tech
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(project.technologies || []).map((tech, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-1 bg-muted rounded-md px-2 py-1 border border-border">
                          <input
                            type="text"
                            value={tech}
                            onChange={(e) => handleTechChange(index, tIdx, e.target.value)}
                            className="bg-transparent text-xs font-mono text-foreground focus:outline-none w-24"
                            placeholder="Next.js"
                          />
                          <button
                            type="button"
                            onClick={() => removeTech(index, tIdx)}
                            className="text-muted-foreground hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 8: Highlights */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Key Engineering Highlights (Bulleted)
                      </label>
                      <button
                        type="button"
                        onClick={() => addHighlight(index)}
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Highlight
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(project.highlights || []).map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={h}
                            onChange={(e) => handleHighlightChange(index, hIdx, e.target.value)}
                            className="flex-1 px-3 py-1.5 text-xs border border-border rounded-lg bg-background text-foreground"
                            placeholder="e.g. Sub-50ms average global latency via Vercel Edge Runtime"
                          />
                          <button
                            type="button"
                            onClick={() => removeHighlight(index, hIdx)}
                            className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 9: Metrics Strip */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Outcome Metrics (Value & Label)
                      </label>
                      <button
                        type="button"
                        onClick={() => addMetric(index)}
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Metric
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(project.metrics || []).map((m, mIdx) => (
                        <div key={mIdx} className="p-2.5 rounded-lg border border-border bg-muted/20 flex items-center gap-2">
                          <input
                            type="text"
                            value={m.value || ''}
                            onChange={(e) => handleMetricChange(index, mIdx, 'value', e.target.value)}
                            className="w-20 px-2 py-1 text-xs font-mono font-bold border border-border rounded bg-background"
                            placeholder="Value (e.g. -45%)"
                          />
                          <input
                            type="text"
                            value={m.label || ''}
                            onChange={(e) => handleMetricChange(index, mIdx, 'label', e.target.value)}
                            className="flex-1 px-2 py-1 text-xs border border-border rounded bg-background"
                            placeholder="Label (e.g. Latency)"
                          />
                          <button
                            type="button"
                            onClick={() => removeMetric(index, mIdx)}
                            className="text-red-500 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 10: URLs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/40">
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                        Live Demo URL
                      </label>
                      <input
                        type="url"
                        value={project.liveUrl || ''}
                        onChange={(e) => handleProjectChange(index, 'liveUrl', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground"
                        placeholder="https://pulsecommerce.io"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                        GitHub Source Code URL
                      </label>
                      <input
                        type="url"
                        value={project.githubUrl || ''}
                        onChange={(e) => handleProjectChange(index, 'githubUrl', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground"
                        placeholder="https://github.com/sasanka/pulse-commerce"
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border bg-card">
          <p className="text-muted-foreground text-sm mb-4">No projects in repository yet.</p>
          <button
            onClick={addProject}
            className="px-6 py-2.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:opacity-90"
          >
            Create Your First Project
          </button>
        </div>
      )}

      {/* AI Case Study Writer Modal */}
      <AnimatePresence>
        {aiModalOpen && activeProjectIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">
                      AI Case Study Writer
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Generating editorial copy for &quot;{projects[activeProjectIndex]?.title}&quot;
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setAiModalOpen(false)}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 flex-1">
                {aiError && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Generation Notice</p>
                      <p className="opacity-90">{aiError}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Rough Notes / Key Bullet Points / Context
                  </label>
                  <textarea
                    value={aiNotes}
                    onChange={(e) => setAiNotes(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    placeholder="e.g. Next.js App router, used Redis for fast inventory locks, solved overselling during flash sales with 15k users, 78% latency drop..."
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Include rough bullets, technical hurdles, or numbers. Gemini will structure them into an editorial case study.
                  </p>
                </div>

                <button
                  onClick={handleGenerateAiCaseStudy}
                  disabled={aiLoading}
                  className="w-full py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                >
                  {aiLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Architecture Narrative with Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Case Study with Gemini</span>
                    </>
                  )}
                </button>

                {/* AI Draft Preview */}
                {aiDraft && (
                  <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-border/60">
                      <span className="font-bold text-foreground uppercase tracking-wider">
                        Generated Case Study Preview
                      </span>
                      <span className="text-emerald-500 font-mono flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Ready to Apply
                      </span>
                    </div>

                    <div>
                      <span className="font-bold text-muted-foreground block mb-0.5">Summary Teaser:</span>
                      <p className="text-foreground">{aiDraft.summary}</p>
                    </div>

                    <div>
                      <span className="font-bold text-muted-foreground block mb-0.5">Problem & Solution:</span>
                      <p className="text-amber-500/90 mb-1">Problem: {aiDraft.problem}</p>
                      <p className="text-emerald-500/90">Solution: {aiDraft.solution}</p>
                    </div>

                    {aiDraft.highlights && aiDraft.highlights.length > 0 && (
                      <div>
                        <span className="font-bold text-muted-foreground block mb-0.5">Highlights:</span>
                        <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                          {aiDraft.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={handleApplyAiDraft}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition-colors shadow-sm"
                      >
                        Apply to Project Form Fields
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Google Drive Help Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Google Drive Image Formatting
              </h3>
              <button
                onClick={() => setShowInstructions(false)}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              To host project screenshots on Google Drive:
            </p>

            <ol className="text-xs space-y-2 text-foreground/90 list-decimal list-inside bg-muted/30 p-4 rounded-xl border border-border">
              <li>Upload image to Google Drive.</li>
              <li>Right-click → Share → Anyone with the link.</li>
              <li>Extract the ID from <code className="bg-muted px-1 rounded">file/d/ID_HERE/view</code>.</li>
              <li>
                Format URL as: <code className="text-primary font-mono bg-muted px-1 rounded">https://drive.google.com/uc?id=ID_HERE</code>
              </li>
            </ol>

            <button
              onClick={() => setShowInstructions(false)}
              className="w-full py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:opacity-90"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
