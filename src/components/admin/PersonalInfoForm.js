'use client';

import { Plus, Trash2 } from 'lucide-react';
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Personal Information</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={personalInfo.name || ''}
              onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Professional Title
            </label>
            <input
              type="text"
              value={personalInfo.title || ''}
              onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="e.g., Full Stack Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={personalInfo.email || ''}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={personalInfo.phone || ''}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={personalInfo.location || ''}
              onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="City, Country"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Resume URL
            </label>
            <input
              type="url"
              value={personalInfo.resume || ''}
              onChange={(e) => handlePersonalInfoChange('resume', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="https://example.com/resume.pdf"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            value={personalInfo.bio || ''}
            onChange={(e) => handlePersonalInfoChange('bio', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>

      {/* Social Links */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Social Links</h3>
          <button
            onClick={addSocialLink}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white capitalize"
                />
              </div>
              <div className="flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleSocialChange(platform, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
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
