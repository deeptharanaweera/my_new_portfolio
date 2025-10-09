'use client';

import { updateServices } from '@/lib/portfolioData';
import { Plus, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';

const ServicesForm = ({ data, onUpdate }) => {
  const [services, setServices] = useState(data || []);
  const [saving, setSaving] = useState(false);

  const handleServiceChange = (index, field, value) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleFeatureChange = (serviceIndex, featureIndex, value) => {
    const updated = [...services];
    if (!updated[serviceIndex].features) {
      updated[serviceIndex].features = [];
    }
    updated[serviceIndex].features[featureIndex] = value;
    setServices(updated);
  };

  const addFeature = (serviceIndex) => {
    const updated = [...services];
    if (!updated[serviceIndex].features) {
      updated[serviceIndex].features = [];
    }
    updated[serviceIndex].features.push('');
    setServices(updated);
  };

  const removeFeature = (serviceIndex, featureIndex) => {
    const updated = [...services];
    updated[serviceIndex].features.splice(featureIndex, 1);
    setServices(updated);
  };

  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      title: '',
      description: '',
      icon: 'code',
      features: [],
      price: '',
      priceNote: ''
    };
    setServices([...services, newService]);
  };

  const removeService = (index) => {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const success = await updateServices(services);
      if (success) {
        onUpdate(services);
        alert('Services updated successfully!');
      } else {
        alert('Failed to update services. Please try again.');
      }
    } catch (error) {
      console.error('Error saving services:', error);
      alert('Error saving services. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const iconOptions = [
    { value: 'code', label: 'Code' },
    { value: 'palette', label: 'Palette' },
    { value: 'smartphone', label: 'Smartphone' },
    { value: 'globe', label: 'Globe' },
    { value: 'database', label: 'Database' },
    { value: 'zap', label: 'Zap' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Services</h2>
        <div className="flex gap-3">
          <button
            onClick={addService}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors duration-300"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors duration-300 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {services.map((service, index) => (
          <div key={service.id || index} className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">
                Service {index + 1}
              </h3>
              <button
                onClick={() => removeService(index)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Service Title
                </label>
                <input
                  type="text"
                  value={service.title || ''}
                  onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
                  placeholder="e.g., Web Development"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Icon
                </label>
                <select
                  value={service.icon || 'code'}
                  onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={service.description || ''}
                  onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground resize-none"
                  placeholder="Describe your service..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={service.price || ''}
                  onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
                  placeholder="e.g., $500+"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Price Note
                </label>
                <input
                  type="text"
                  value={service.priceNote || ''}
                  onChange={(e) => handleServiceChange(index, 'priceNote', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
                  placeholder="e.g., Starting from"
                />
              </div>
            </div>

            {/* Features */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-muted-foreground">
                  Features
                </label>
                <button
                  onClick={() => addFeature(index)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors duration-300"
                >
                  <Plus className="w-3 h-3" />
                  Add Feature
                </button>
              </div>
              
              <div className="space-y-3">
                {service.features?.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, featureIndex, e.target.value)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card text-foreground"
                      placeholder="Enter feature..."
                    />
                    <button
                      onClick={() => removeFeature(index, featureIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No services added yet.</p>
          <button
            onClick={addService}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 mx-auto"
          >
            <Plus className="w-4 h-4" />
            Add Your First Service
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesForm;
