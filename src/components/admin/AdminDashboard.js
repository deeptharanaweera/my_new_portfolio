'use client';

import { getPortfolioData, updatePortfolioData } from '@/lib/portfolioData';
import { motion } from 'framer-motion';
import {
    Briefcase,
    Code,
    Eye,
    GraduationCap,
    Layout,
    Save,
    Settings,
    User
} from 'lucide-react';
import { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import PersonalInfoForm from './PersonalInfoForm';
import ProjectsForm from './ProjectsForm';
import ServicesForm from './ServicesForm';
import SkillsForm from './SkillsForm';
import VisibilityForm from './VisibilityForm';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      console.log('AdminDashboard: Loading portfolio data...');
      const data = await getPortfolioData();
      console.log('AdminDashboard: Portfolio data loaded:', data);
      setPortfolioData(data);
    } catch (error) {
      console.error('AdminDashboard: Error loading portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const success = await updatePortfolioData(portfolioData);
      if (success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus(null), 3000);
      }
    } catch (error) {
      console.error('Error saving portfolio data:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const updateData = (section, data) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'visibility', label: 'Page Visibility', icon: Layout },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Failed to load portfolio data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ThemeToggle />
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Portfolio Admin</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Connected</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
              >
                <Eye className="w-4 h-4" />
                View Portfolio
              </a>
              
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Navigation</h2>
              
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-300 ${
                        activeTab === tab.id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              {activeTab === 'personal' && (
                <PersonalInfoForm
                  data={portfolioData.personalInfo}
                  socialLinks={portfolioData.socialLinks}
                  onUpdate={(personalInfo, socialLinks) => {
                    updateData('personalInfo', personalInfo);
                    updateData('socialLinks', socialLinks);
                  }}
                />
              )}
              
              {activeTab === 'services' && (
                <ServicesForm
                  data={portfolioData.services}
                  onUpdate={(services) => updateData('services', services)}
                />
              )}
              
              {activeTab === 'skills' && (
                <SkillsForm
                  data={portfolioData.skills}
                  onUpdate={(skills) => updateData('skills', skills)}
                />
              )}
              
              {activeTab === 'projects' && (
                <ProjectsForm
                  data={portfolioData.projects}
                  onUpdate={(projects) => updateData('projects', projects)}
                />
              )}
              
              {activeTab === 'experience' && (
                <ExperienceForm
                  data={portfolioData.experience}
                  onUpdate={(experience) => updateData('experience', experience)}
                />
              )}
              
              {activeTab === 'education' && (
                <EducationForm
                  data={portfolioData.education}
                  onUpdate={(education) => updateData('education', education)}
                />
              )}
              
              {activeTab === 'visibility' && (
                <VisibilityForm
                  data={portfolioData.visibility}
                  onUpdate={(visibility) => updateData('visibility', visibility)}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Save Status */}
      {saveStatus && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className={`px-6 py-4 rounded-lg shadow-lg ${
            saveStatus === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {saveStatus === 'success' ? 'Changes saved successfully!' : 'Failed to save changes'}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;
