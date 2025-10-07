'use client';

import { motion } from 'framer-motion';
import { Plus, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';

const ProjectsForm = ({ data, onUpdate }) => {
  const [projects, setProjects] = useState(data || []);

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
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

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: '',
      description: '',
      image: '',
      technologies: [''],
      liveUrl: '',
      githubUrl: '',
      featured: false
    };
    setProjects([...projects, newProject]);
    onUpdate([...projects, newProject]);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">
                Project {index + 1}
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleFeatured(index)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                    project.featured
                      ? 'bg-primary/10 text-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Star className={`w-4 h-4 ${project.featured ? 'fill-current' : ''}`} />
                  Featured
                </button>
                <button
                  onClick={() => removeProject(index)}
                  className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={project.title || ''}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
                  placeholder="Project Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Project Image URL
                </label>
                <input
                  type="url"
                  value={project.image || ''}
                  onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Description
              </label>
              <textarea
                value={project.description || ''}
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground resize-none"
                placeholder="Describe your project..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={project.liveUrl || ''}
                  onChange={(e) => handleProjectChange(index, 'liveUrl', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
                  placeholder="https://yourproject.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={project.githubUrl || ''}
                  onChange={(e) => handleProjectChange(index, 'githubUrl', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-muted-foreground">
                  Technologies Used
                </label>
                <button
                  onClick={() => addTechnology(index)}
                  className="flex items-center gap-1 px-3 py-1 text-primary hover:bg-muted rounded-lg transition-colors duration-300 text-sm"
                >
                  <Plus className="w-3 h-3" />
                  Add Tech
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, techIndex) => (
                  <div key={techIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleTechnologyChange(index, techIndex, e.target.value)}
                      className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground text-sm"
                      placeholder="Technology"
                    />
                    <button
                      onClick={() => removeTechnology(index, techIndex)}
                      className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-300"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No projects added yet</p>
          <button
            onClick={addProject}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors duration-300"
          >
            Add Your First Project
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
