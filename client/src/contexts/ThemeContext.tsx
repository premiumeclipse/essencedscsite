import React, { createContext, useContext, useState, useEffect } from 'react';

// Theme types
export type ThemeType = 'default' | 'christmas' | 'halloween' | 'thanksgiving';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Get theme from localStorage or use default
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('essence-theme');
    return (savedTheme as ThemeType) || 'default';
  });

  // Update theme when it changes
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('essence-theme', theme);
    
    // Apply theme classes to document
    document.body.classList.remove('theme-default', 'theme-christmas', 'theme-halloween', 'theme-thanksgiving');
    document.body.classList.add(`theme-${theme}`);

    // Update CSS variables for each theme
    const root = document.documentElement;
    
    if (theme === 'christmas') {
      root.style.setProperty('--theme-primary', '#E53E3E'); // Red
      root.style.setProperty('--theme-secondary', '#276749'); // Green
      root.style.setProperty('--theme-accent', '#F6E05E'); // Gold
      root.style.setProperty('--theme-bg-pattern', 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M29.5 27.5l1-1 1 1-1 1-1-1M35 30l.5.5-.5.5-.5-.5.5-.5M25 30l.5.5-.5.5-.5-.5.5-.5M30 35l.5.5-.5.5-.5-.5.5-.5\' fill=\'%23ffffff10\' fill-opacity=\'0.08\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")');
    } 
    else if (theme === 'halloween') {
      root.style.setProperty('--theme-primary', '#9c4221'); // Pumpkin orange
      root.style.setProperty('--theme-secondary', '#805ad5'); // Purple
      root.style.setProperty('--theme-accent', '#68d391'); // Slime green
      root.style.setProperty('--theme-bg-pattern', 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 30l1 1-1 1-1-1 1-1M28 25l1 1-1 1-1-1 1-1M32 25l1 1-1 1-1-1 1-1M30 34l1 1-1 1-1-1 1-1\' fill=\'%239c412127\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")');
    } 
    else if (theme === 'thanksgiving') {
      root.style.setProperty('--theme-primary', '#dd6b20'); // Orange
      root.style.setProperty('--theme-secondary', '#b7791f'); // Brown
      root.style.setProperty('--theme-accent', '#ecc94b'); // Yellow
      root.style.setProperty('--theme-bg-pattern', 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 32.5c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3M15 22.5c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3M45 42.5c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3\' fill=\'%23dd6b2020\' fill-opacity=\'0.08\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")');
    } 
    else {
      // Default theme - reset to original values
      root.style.removeProperty('--theme-primary');
      root.style.removeProperty('--theme-secondary');
      root.style.removeProperty('--theme-accent'); 
      root.style.removeProperty('--theme-bg-pattern');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}