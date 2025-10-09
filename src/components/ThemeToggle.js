'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card/50 backdrop-blur-md border border-border hover:bg-card/70 transition-all duration-300"
        aria-label="Toggle theme"
      >
        <Sun className="w-5 h-5 text-foreground" />
      </button>
    );
  }

  const handleToggle = () => {
    console.log('Theme toggle clicked, current theme:', theme);
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card/50 backdrop-blur-md border border-border hover:bg-card/70 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-foreground" />
      ) : (
        <Sun className="w-5 h-5 text-foreground" />
      )}
    </button>
  );
};

export default ThemeToggle;
