'use client';

import { motion } from 'framer-motion';
import { ExternalLink, HelpCircle, Plus, Star, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const ProjectsForm = ({ data, onUpdate }) => {
  const [projects, setProjects] = useState(data || []);
  const [showInstructions, setShowInstructions] = useState(false);

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

            <div className="grid md:grid-cols-1 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2">
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
                <label className="block text-sm font-bold text-muted-foreground mb-2">
                  Project Image URL
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {project.image && isValidUrl(project.image) ? (
                      <Image 
                        src={project.image} 
                        alt="Project" 
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-muted-foreground">
                        {project.title?.charAt(0) || '?'}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={project.image || ''}
                        onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                        className="flex-1 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
                        placeholder="https://drive.google.com/uc?id=YOUR_IMAGE_ID"
                      />
                      <button
                        type="button"
                        onClick={() => setShowInstructions(true)}
                        className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors duration-300 flex items-center gap-2"
                        title="How to get Google Drive image URL"
                      >
                        <HelpCircle className="w-4 h-4" />
                        Help
                      </button>
                    </div>
                    {project.image && (
                      <button
                        onClick={() => handleProjectChange(index, 'image', '')}
                        className="mt-2 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                      >
                        <X className="w-4 h-4" />
                        Remove Image
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-muted-foreground mb-2">
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
                <label className="block text-sm font-bold text-muted-foreground mb-2">
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
                <label className="block text-sm font-bold text-muted-foreground mb-2">
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
                <label className="block text-sm font-bold text-muted-foreground">
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

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card border border-border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  How to Get Google Drive Image URL
                </h3>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-foreground">Step-by-Step Instructions:</h4>
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                      <div>
                        <p className="font-medium">Upload your image to Google Drive</p>
                        <p className="text-muted-foreground">Go to drive.google.com and upload your project image</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                      <div>
                        <p className="font-medium">Get the shareable link</p>
                        <p className="text-muted-foreground">Right-click the image → &quot;Get link&quot; → Set to &quot;Anyone with the link&quot;</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                      <div>
                        <p className="font-medium">Convert the URL format</p>
                        <p className="text-muted-foreground">Replace &quot;file/d/&quot; with &quot;uc?id=&quot; and remove &quot;/view&quot; from the end</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                      <div>
                        <p className="font-medium">Copy and paste the final URL</p>
                        <p className="text-muted-foreground">Use the converted URL in the image field above</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-foreground flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Example URL Format:
                  </h4>
                  <div className="bg-card border border-border rounded-lg p-3 font-mono text-sm">
                    <div className="text-muted-foreground mb-1">Original Google Drive link:</div>
                    <div className="text-red-600 mb-3">https://drive.google.com/file/d/1ABC123XYZ/view</div>
                    <div className="text-muted-foreground mb-1">Converted URL for portfolio:</div>
                    <div className="text-green-600">https://drive.google.com/uc?id=1ABC123XYZ</div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-gray-700 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-600">💡 Pro Tips:</h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-500 space-y-1">
                    <li>• Use high-quality images (at least 800x600 pixels)</li>
                    <li>• Supported formats: JPG, PNG, GIF, WebP</li>
                    <li>• Make sure the image is set to &quot;Anyone with the link&quot; for public access</li>
                    <li>• The image will be automatically resized to fit your project card</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowInstructions(false)}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors duration-300"
                >
                  Got it!
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
