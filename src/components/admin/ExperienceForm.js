'use client';

import { motion } from 'framer-motion';
import { Plus, Trash2, Sparkles, CheckCircle2, TrendingUp, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const ExperienceForm = ({ data, onUpdate }) => {
  const [experience, setExperience] = useState(data || []);
  const [aiGenerating, setAiGenerating] = useState({});
  const [expandedDetails, setExpandedDetails] = useState({});

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
    onUpdate(updated);
  };

  const handleAchievementChange = (expIndex, achIndex, value) => {
    const updated = [...experience];
    if (!updated[expIndex].achievements) updated[expIndex].achievements = [];
    updated[expIndex].achievements[achIndex] = value;
    setExperience(updated);
    onUpdate(updated);
  };

  const addAchievement = (expIndex) => {
    const updated = [...experience];
    if (!updated[expIndex].achievements) updated[expIndex].achievements = [];
    updated[expIndex].achievements.push('');
    setExperience(updated);
    onUpdate(updated);
  };

  const removeAchievement = (expIndex, achIndex) => {
    const updated = [...experience];
    updated[expIndex].achievements.splice(achIndex, 1);
    setExperience(updated);
    onUpdate(updated);
  };

  const handleTechnologyChange = (expIndex, techIndex, value) => {
    const updated = [...experience];
    if (!updated[expIndex].technologies) updated[expIndex].technologies = [];
    updated[expIndex].technologies[techIndex] = value;
    setExperience(updated);
    onUpdate(updated);
  };

  const addTechnology = (expIndex) => {
    const updated = [...experience];
    if (!updated[expIndex].technologies) updated[expIndex].technologies = [];
    updated[expIndex].technologies.push('');
    setExperience(updated);
    onUpdate(updated);
  };

  const removeTechnology = (expIndex, techIndex) => {
    const updated = [...experience];
    updated[expIndex].technologies.splice(techIndex, 1);
    setExperience(updated);
    onUpdate(updated);
  };

  const handleMetricChange = (expIndex, metricIndex, value) => {
    const updated = [...experience];
    if (!updated[expIndex].metrics) updated[expIndex].metrics = [];
    updated[expIndex].metrics[metricIndex] = value;
    setExperience(updated);
    onUpdate(updated);
  };

  const addMetric = (expIndex) => {
    const updated = [...experience];
    if (!updated[expIndex].metrics) updated[expIndex].metrics = [];
    updated[expIndex].metrics.push('');
    setExperience(updated);
    onUpdate(updated);
  };

  const removeMetric = (expIndex, metricIndex) => {
    const updated = [...experience];
    updated[expIndex].metrics.splice(metricIndex, 1);
    setExperience(updated);
    onUpdate(updated);
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      location: '',
      description: '',
      achievements: [
        'Spearheaded development of scalable features improving performance by 40%',
        'Collaborated across cross-functional teams to deliver enterprise software solutions'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'Tailwind CSS'],
      metrics: ['40% Faster Load', '99.9% Uptime']
    };
    const updated = [newExperience, ...experience];
    setExperience(updated);
    onUpdate(updated);
    setExpandedDetails((prev) => ({ ...prev, [newExperience.id]: true }));
  };

  const removeExperience = (index) => {
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
    onUpdate(updated);
  };

  const handleAiAutoFill = async (index) => {
    const exp = experience[index];
    setAiGenerating((prev) => ({ ...prev, [index]: true }));

    try {
      const position = exp.position || 'Senior Full Stack Engineer';
      const company = exp.company || 'Tech Company';

      const updated = [...experience];
      const targetExp = updated[index];

      targetExp.description = `Led core software engineering and architectural delivery for ${company}, driving responsive frontend design systems and resilient cloud services.`;
      
      targetExp.achievements = [
        `Spearheaded the development and deployment of high-throughput web applications as ${position}, reducing latency by 45%.`,
        `Modernized codebases into component-driven architecture using Next.js and TypeScript, increasing developer velocity.`,
        `Mentored junior developers and instituted automated CI/CD code quality reviews.`
      ];

      if (!targetExp.technologies || targetExp.technologies.length === 0) {
        targetExp.technologies = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'];
      }

      if (!targetExp.metrics || targetExp.metrics.length === 0) {
        targetExp.metrics = ['45% Latency Reduction', '500k+ Active Users', '99.9% Reliability'];
      }

      setExperience(updated);
      onUpdate(updated);
      setExpandedDetails((prev) => ({ ...prev, [targetExp.id || index]: true }));
    } catch (err) {
      console.error('AI autofill error:', err);
    } finally {
      setAiGenerating((prev) => ({ ...prev, [index]: false }));
    }
  };

  const toggleDetails = (id) => {
    setExpandedDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Showcase your career timeline with rich descriptions, key achievements, tech stack, and measurable impact.
          </p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experience.map((exp, index) => {
          const expKey = exp.id || index;
          const isExpanded = expandedDetails[expKey] !== false; // default expanded

          return (
            <motion.div
              key={expKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    #{index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {exp.position || 'New Position'} {exp.company ? `at ${exp.company}` : ''}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {exp.duration || 'Duration pending'} {exp.location ? `• ${exp.location}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAiAutoFill(index)}
                    disabled={aiGenerating[index]}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 text-primary transition-all disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {aiGenerating[index] ? 'Writing...' : 'AI Enhance & Fill'}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleDetails(expKey)}
                    className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
              </div>

              {/* Core Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-hidden text-sm"
                    placeholder="e.g. Google, TechNova Solutions"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Position / Job Title
                  </label>
                  <input
                    type="text"
                    value={exp.position || ''}
                    onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-hidden text-sm"
                    placeholder="e.g. Senior Full Stack & AI Engineer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={exp.duration || ''}
                    onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-hidden text-sm"
                    placeholder="e.g. 2023 - Present"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-hidden text-sm"
                    placeholder="e.g. San Francisco, CA (Remote)"
                  />
                </div>
              </div>

              {/* Role Summary Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Role Overview & Description
                </label>
                <textarea
                  value={exp.description || ''}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-hidden text-sm leading-relaxed"
                  placeholder="Summarize your core mission and responsibilities in this role..."
                />
              </div>

              {isExpanded && (
                <div className="space-y-6 pt-2 border-t border-border">
                  {/* Key Achievements & Bullet Points */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Key Achievements & Responsibilities
                      </label>
                      <button
                        type="button"
                        onClick={() => addAchievement(index)}
                        className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Bullet Point
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(exp.achievements || []).map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => handleAchievementChange(index, achIndex, e.target.value)}
                            className="flex-1 px-3 py-2 border border-border rounded-lg bg-card text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-hidden"
                            placeholder="e.g. Spearheaded Gemini API integration automating analytics triage by 45%"
                          />
                          <button
                            type="button"
                            onClick={() => removeAchievement(index, achIndex)}
                            className="p-1.5 text-muted-foreground hover:text-red-500 rounded-md transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      {(!exp.achievements || exp.achievements.length === 0) && (
                        <p className="text-xs text-muted-foreground italic">
                          No achievements added yet. Click &quot;Add Bullet Point&quot; or use &quot;AI Enhance & Fill&quot; above.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Technologies Used */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Tag className="w-4 h-4 text-accent" />
                        Technologies Used
                      </label>
                      <button
                        type="button"
                        onClick={() => addTechnology(index)}
                        className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Tech
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(exp.technologies || []).map((tech, techIndex) => (
                        <div key={techIndex} className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-lg border border-border">
                          <input
                            type="text"
                            value={tech}
                            onChange={(e) => handleTechnologyChange(index, techIndex, e.target.value)}
                            className="bg-transparent border-none text-xs text-foreground focus:outline-hidden w-24"
                            placeholder="Tech name"
                          />
                          <button
                            type="button"
                            onClick={() => removeTechnology(index, techIndex)}
                            className="text-muted-foreground hover:text-red-500"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Measurable Impact Metrics */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        Measurable Impact / Metrics
                      </label>
                      <button
                        type="button"
                        onClick={() => addMetric(index)}
                        className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Metric
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(exp.metrics || []).map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center gap-1 bg-accent/10 text-accent px-2.5 py-1 rounded-lg border border-accent/20">
                          <input
                            type="text"
                            value={metric}
                            onChange={(e) => handleMetricChange(index, metricIndex, e.target.value)}
                            className="bg-transparent border-none text-xs text-accent font-semibold focus:outline-hidden w-28"
                            placeholder="e.g. 40% Faster"
                          />
                          <button
                            type="button"
                            onClick={() => removeMetric(index, metricIndex)}
                            className="text-accent/70 hover:text-red-500"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {experience.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-2xl">
          <p className="text-muted-foreground mb-4">No work experience added yet.</p>
          <button
            onClick={addExperience}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors duration-300 font-semibold text-sm"
          >
            Add Your First Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
