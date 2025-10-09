'use client';

import { getPortfolioData } from '@/lib/portfolioData';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [themeColors, setThemeColors] = useState(null);

  // --- Color utils to derive full palette from minimal inputs ---
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const hexToRgb = (hex) => {
    if (!hex) return { r: 0, g: 0, b: 0 };
    let v = hex.trim();
    if (v[0] === '#') v = v.slice(1);
    if (v.length === 3) v = v.split('').map(c => c + c).join('');
    const num = parseInt(v, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };
  const rgbToHex = ({ r, g, b }) => {
    const h = (n) => n.toString(16).padStart(2, '0');
    return `#${h(clamp(Math.round(r),0,255))}${h(clamp(Math.round(g),0,255))}${h(clamp(Math.round(b),0,255))}`;
  };
  const mix = (aHex, bHex, weight) => {
    const a = hexToRgb(aHex); const b = hexToRgb(bHex);
    const w = clamp(weight, 0, 1);
    const r = a.r * (1 - w) + b.r * w;
    const g = a.g * (1 - w) + b.g * w;
    const bl = a.b * (1 - w) + b.b * w;
    return rgbToHex({ r, g, b: bl });
  };
  const luminance = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    const srgb = [r, g, b].map(v => {
      const x = v / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  };
  const bestForeground = (bg) => {
    const white = '#ffffff';
    const black = '#000000';
    const lw = luminance(white) + 0.05;
    const lb = luminance(black) + 0.05;
    const lbg = luminance(bg) + 0.05;
    const contrastWhite = lw / lbg;
    const contrastBlack = lbg / lb;
    return contrastWhite >= contrastBlack ? white : black;
  };
  const derivePalette = useMemo(() => {
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    const hexToRgb = (hex) => {
      if (!hex) return { r: 0, g: 0, b: 0 };
      let v = hex.trim();
      if (v[0] === '#') v = v.slice(1);
      if (v.length === 3) v = v.split('').map(c => c + c).join('');
      const num = parseInt(v, 16);
      return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    };
    const rgbToHex = ({ r, g, b }) => {
      const h = (n) => n.toString(16).padStart(2, '0');
      return `#${h(clamp(Math.round(r),0,255))}${h(clamp(Math.round(g),0,255))}${h(clamp(Math.round(b),0,255))}`;
    };
    const mix = (aHex, bHex, weight) => {
      const a = hexToRgb(aHex); const b = hexToRgb(bHex);
      const w = Math.min(Math.max(weight, 0), 1);
      const r = a.r * (1 - w) + b.r * w;
      const g = a.g * (1 - w) + b.g * w;
      const bl = a.b * (1 - w) + b.b * w;
      return rgbToHex({ r, g, b: bl });
    };
    const luminance = (hex) => {
      const { r, g, b } = hexToRgb(hex);
      const srgb = [r, g, b].map(v => {
        const x = v / 255;
        return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    };
    const bestForeground = (bg) => {
      const white = '#ffffff';
      const black = '#000000';
      const lw = luminance(white) + 0.05;
      const lb = luminance(black) + 0.05;
      const lbg = luminance(bg) + 0.05;
      const contrastWhite = lw / lbg;
      const contrastBlack = lbg / lb;
      return contrastWhite >= contrastBlack ? white : black;
    };

    return (base, mode) => {
      const background = base?.background || (mode === 'dark' ? '#0a0a0a' : '#ffffff');
      const foreground = mode === 'dark' ? '#e5e7eb' : '#111827';
      const primary = mode === 'dark' ? '#006FF7' : '#3b82f6';
      const primaryForeground = bestForeground(primary);
      const card = mix(background, foreground, mode === 'dark' ? 0.06 : 0.02);
      const cardForeground = foreground;
      const border = mix(background, foreground, mode === 'dark' ? 0.18 : 0.14);
      const input = border;
      const muted = mix(background, foreground, mode === 'dark' ? 0.10 : 0.06);
      const mutedForeground = mix(foreground, background, 0.35);
      const secondary = mix(primary, background, 0.5);
      const secondaryForeground = bestForeground(secondary);
      const accent = mix(primary, foreground, 0.2);
      const accentForeground = bestForeground(accent);
      const ring = mix(primary, '#ffffff', 0.5);
      return {
        background,
        foreground,
        primary,
        primaryForeground,
        secondary,
        secondaryForeground,
        accent,
        accentForeground,
        muted,
        mutedForeground,
        card,
        cardForeground,
        border,
        input,
        ring,
      };
    };
  }, []);

  useEffect(() => {
    const init = async () => {
      setMounted(true);
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      try {
        const data = await getPortfolioData();
        const colors = data?.theme;
        if (colors) {
          setThemeColors(colors);
        }
      } catch (e) {
        // no-op: fall back to defaults defined in CSS
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('theme', theme);
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }

    // Apply CSS variables derived from minimal theme inputs
    const base = themeColors?.[theme];
    const derived = derivePalette(base, theme);
    Object.entries(derived).forEach(([key, val]) => {
      root.style.setProperty(`--${key}`, val);
    });
  }, [theme, mounted, themeColors, derivePalette]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted, themeColors, setThemeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
