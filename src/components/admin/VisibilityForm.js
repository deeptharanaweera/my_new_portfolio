'use client';

import { Eye, EyeOff, Layout, Settings } from 'lucide-react';
import { useState } from 'react';

const VisibilityForm = ({ data, onUpdate }) => {
  const [visibility, setVisibility] = useState(data || {
    hero: true,
    about: true,
    services: true,
    skills: true,
    projects: true,
    contact: true
  });

  const handleToggle = (section) => {
    const newVisibility = {
      ...visibility,
      [section]: !visibility[section]
    };
    setVisibility(newVisibility);
    onUpdate(newVisibility);
  };

  const sections = [
    { key: 'hero', label: 'Hero Section', description: 'Main banner with name and title' },
    { key: 'about', label: 'About Section', description: 'Personal information and background' },
    { key: 'services', label: 'Services Section', description: 'Services you offer' },
    { key: 'skills', label: 'Skills Section', description: 'Technical skills and expertise' },
    { key: 'projects', label: 'Projects Section', description: 'Portfolio projects showcase' },
    { key: 'contact', label: 'Contact Section', description: 'Contact information and form' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Layout className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Page Visibility</h2>
          <p className="text-muted-foreground">Control which sections are visible on your portfolio</p>
        </div>
      </div>

      <div className="grid gap-4">
        {sections.map((section) => (
          <div
            key={section.key}
            className="flex items-center justify-between p-4 bg-card border border-border rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">
                  {section.label}
                </h3>
                {visibility[section.key] ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">Visible</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <EyeOff className="w-4 h-4" />
                    <span className="text-sm font-medium">Hidden</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {section.description}
              </p>
            </div>
            
            <button
              onClick={() => handleToggle(section.key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                visibility[section.key]
                  ? 'bg-primary'
                  : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-card transition duration-200 ease-in-out ${
                  visibility[section.key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/30">
        <div className="flex items-start gap-3">
          <Settings className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Visibility Settings
            </h4>
            <p className="text-sm text-muted-foreground">
              Toggle sections on/off to customize your portfolio layout. Hidden sections will not appear on your public portfolio page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisibilityForm;
