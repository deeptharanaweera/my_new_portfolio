'use client';

import { useEffect, useMemo, useState } from 'react';

const swatchClass = 'w-6 h-6 rounded border border-gray-200 dark:border-gray-700';

const PRESET_SWATCHES = [
  '#000000', '#111827', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb', '#ffffff',
  '#ef4444', '#f59e0b', '#fbbf24', '#10b981', '#22c55e', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'
];

const normalizeHex = (input) => {
  if (!input) return '';
  let v = input.trim().toLowerCase();
  if (!v.startsWith('#')) v = `#${v}`;
  if (v.length === 4) {
    // Expand #rgb -> #rrggbb
    const r = v[1];
    const g = v[2];
    const b = v[3];
    v = `#${r}${r}${g}${g}${b}${b}`;
  }
  // Clamp to 7 chars (#rrggbb)
  if (v.length > 7) v = v.slice(0, 7);
  // Validate hex
  if (!/^#[0-9a-f]{6}$/i.test(v)) return input; // fallback to original if invalid; allow user to fix
  return v;
};

const ColorInput = ({ label, value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-600 dark:text-gray-400">{label}</label>
      <div className="flex items-center gap-3">
        <div className={swatchClass} style={{ backgroundColor: value }} />
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : '#000000'}
          onChange={(e) => onChange(normalizeHex(e.target.value))}
          className="h-10 w-10 p-0 border border-gray-300 dark:border-gray-700 rounded cursor-pointer bg-transparent"
          aria-label={`${label} color picker`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(normalizeHex(e.target.value))}
          className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="#000000"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {PRESET_SWATCHES.map((hex) => (
          <button
            key={`${label}-${hex}`}
            type="button"
            onClick={() => onChange(hex)}
            className="w-6 h-6 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: hex }}
            aria-label={`Use preset ${hex} for ${label}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function ThemeSettingsForm({ data, onUpdate }) {
  const [localTheme, setLocalTheme] = useState(data || { light: {}, dark: {} });

  useEffect(() => {
    setLocalTheme(data || { light: {}, dark: {} });
  }, [data]);

  const sections = useMemo(() => ([
    { key: 'background', label: 'Background' },
  ]), []);

  const handleChange = (mode, key, val) => {
    const next = {
      ...localTheme,
      [mode]: {
        ...localTheme?.[mode],
        [key]: val,
      },
    };
    setLocalTheme(next);
    onUpdate(next);
  };

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Theme Colors</h3>
      <p className="text-gray-600 dark:text-gray-400">Customize light and dark mode colors. Use hex values.</p>

      {['light', 'dark'].map((mode) => (
        <div key={mode} className="space-y-4">
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded text-xs uppercase tracking-wide ${mode === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-800 text-gray-200'}`}>{mode}</div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {sections.map((s) => (
              <ColorInput
                key={`${mode}-${s.key}`}
                label={s.label}
                value={localTheme?.[mode]?.[s.key] || ''}
                onChange={(val) => handleChange(mode, s.key, val)}
              />)
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


