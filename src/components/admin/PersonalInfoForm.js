'use client';

import { Plus, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const PersonalInfoForm = ({ data, socialLinks, onUpdate }) => {
  const [personalInfo, setPersonalInfo] = useState(data || {});
  const [socials, setSocials] = useState(socialLinks || {});

  const handlePersonalInfoChange = (field, value) => {
    const updated = { ...personalInfo, [field]: value };
    setPersonalInfo(updated);
    onUpdate(updated, socials);
  };

  const handleSocialChange = (platform, value) => {
    const updated = { ...socials, [platform]: value };
    setSocials(updated);
    onUpdate(personalInfo, updated);
  };

  const addSocialLink = () => {
    const platform = prompt('Enter social media platform (e.g., github, linkedin):');
    if (platform && !socials[platform]) {
      handleSocialChange(platform, '');
    }
  };

  const removeSocialLink = (platform) => {
    const updated = { ...socials };
    delete updated[platform];
    setSocials(updated);
    onUpdate(personalInfo, updated);
  };

  const handleImageUrlChange = (url) => {
    const updated = { ...personalInfo, avatar: url };
    setPersonalInfo(updated);
    onUpdate(updated, socials);
  };

  const handleRemoveImage = () => {
    const updated = { ...personalInfo, avatar: '' };
    setPersonalInfo(updated);
    onUpdate(updated, socials);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
        
        {/* Profile Image URL */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-muted-foreground mb-4">
            Profile Image URL
          </label>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              {personalInfo.avatar ? (
                <Image 
                  src={personalInfo.avatar} 
                  alt="Profile" 
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-muted-foreground">
                  {personalInfo.name?.charAt(0) || '?'}
                </span>
              )}
            </div>
            <div className="flex-1">
              <input
                type="url"
                value={personalInfo.avatar || ''}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
                placeholder="https://drive.google.com/uc?id=YOUR_IMAGE_ID"
              />
              <div className="text-sm text-muted-foreground mt-2">
                <p className="mb-2">How to get Google Drive image URL:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Upload your image to Google Drive</li>
                  <li>Right-click the image → &quot;Get link&quot; → &quot;Anyone with the link&quot;</li>
                  <li>Copy the link and replace &quot;file/d/&quot; with &quot;uc?id=&quot; and remove &quot;/view&quot;</li>
                  <li>Example: https://drive.google.com/uc?id=YOUR_IMAGE_ID</li>
                </ol>
              </div>
              {personalInfo.avatar && (
                <button
                  onClick={handleRemoveImage}
                  className="mt-2 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  <X className="w-4 h-4" />
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={personalInfo.name || ''}
              onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Professional Title
            </label>
            <input
              type="text"
              value={personalInfo.title || ''}
              onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
              placeholder="e.g., Full Stack Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              value={personalInfo.email || ''}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={personalInfo.phone || ''}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Location
            </label>
            <input
              type="text"
              value={personalInfo.location || ''}
              onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
              placeholder="City, Country"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Resume URL
            </label>
            <input
              type="url"
              value={personalInfo.resume || ''}
              onChange={(e) => handlePersonalInfoChange('resume', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
              placeholder="https://example.com/resume.pdf"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Bio
          </label>
          <textarea
            value={personalInfo.bio || ''}
            onChange={(e) => handlePersonalInfoChange('bio', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>

      {/* Social Links */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Social Links</h3>
          <button
            onClick={addSocialLink}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors duration-300"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </div>

        <div className="space-y-4">
          {Object.entries(socials).map(([platform, url]) => (
            <div key={platform} className="flex items-center gap-4">
              <div className="w-32">
                <input
                  type="text"
                  value={platform}
                  readOnly
                  className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-foreground capitalize"
                />
              </div>
              <div className="flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleSocialChange(platform, e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
                  placeholder={`https://${platform}.com/yourusername`}
                />
              </div>
              <button
                onClick={() => removeSocialLink(platform)}
                className="p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
