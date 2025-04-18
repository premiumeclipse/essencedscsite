import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';

// Theme types
export type ThemeType = 'default' | 'christmas' | 'halloween' | 'thanksgiving';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isLoading: boolean;
}

interface GlobalTheme {
  id: number;
  name: ThemeType;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// API endpoint for global theme
const THEME_API = '/api/global-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Get initial theme from localStorage as a backup
  const initialTheme = (() => {
    const savedTheme = localStorage.getItem('essence-theme');
    return (savedTheme as ThemeType) || 'default';
  })();

  const [theme, setLocalTheme] = useState<ThemeType>(initialTheme);
  
  // Query to fetch global theme
  const { isLoading: isQueryLoading } = useQuery<GlobalTheme>({
    queryKey: [THEME_API],
    queryFn: async () => {
      try {
        const response = await fetch(THEME_API);
        if (!response.ok) {
          // If fetch fails, use local theme
          return { id: 1, name: initialTheme };
        }
        const data = await response.json();
        setLocalTheme(data.name); // Update local state with global theme
        return data;
      } catch (error) {
        // If server error, use local theme
        console.error("Failed to fetch global theme:", error);
        return { id: 1, name: initialTheme };
      }
    },
    staleTime: 60 * 1000, // 1 minute
  });

  // Mutation to update global theme
  const themeMutation = useMutation({
    mutationFn: async (newTheme: ThemeType) => {
      try {
        const res = await apiRequest('POST', THEME_API, { name: newTheme });
        return await res.json();
      } catch (error) {
        // If server error, just update local
        console.error("Failed to update global theme:", error);
        return { id: 1, name: newTheme };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [THEME_API] });
    }
  });

  // Combined loading state
  const isLoading = isQueryLoading || themeMutation.isPending;

  // Function to update both local and global theme
  const setTheme = (newTheme: ThemeType) => {
    if (newTheme === theme && !isQueryLoading) return; // Prevent unnecessary update
    
    setLocalTheme(newTheme);
    localStorage.setItem('essence-theme', newTheme);
    themeMutation.mutate(newTheme);
  };

  // Update theme styling when it changes
  useEffect(() => {
    // Apply theme classes to document
    document.body.classList.remove('theme-default', 'theme-christmas', 'theme-halloween', 'theme-thanksgiving');
    document.body.classList.add(`theme-${theme}`);

    // Update CSS variables for each theme
    const root = document.documentElement;
    
    if (theme === 'christmas') {
      // Christmas theme - Red, Green, Gold
      root.style.setProperty('--theme-primary', '#E53E3E'); // Red
      root.style.setProperty('--theme-secondary', '#276749'); // Green
      root.style.setProperty('--theme-accent', '#F6E05E'); // Gold
      root.style.setProperty('--theme-bg-pattern', 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M29.5 27.5l1-1 1 1-1 1-1-1M35 30l.5.5-.5.5-.5-.5.5-.5M25 30l.5.5-.5.5-.5-.5.5-.5M30 35l.5.5-.5.5-.5-.5.5-.5\' fill=\'%23ffffff10\' fill-opacity=\'0.08\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")');
      
      // Additional Christmas theme enhancements for various elements
      root.style.setProperty('--primary', '#E53E3E'); // Button primary color
      root.style.setProperty('--primary-foreground', '#ffffff'); // Text on primary
      root.style.setProperty('--secondary', '#276749'); // Secondary button color
      root.style.setProperty('--border', 'rgba(229, 62, 62, 0.2)'); // Border color with red tint
      root.style.setProperty('--ring', 'rgba(229, 62, 62, 0.5)'); // Focus ring
      root.style.setProperty('--accent', 'rgba(229, 62, 62, 0.1)'); // Accent background
      root.style.setProperty('--accent-foreground', '#E53E3E'); // Accent text
      
      // Adjust card and dialog background with a slight theme tint
      root.style.setProperty('--card', 'rgba(20, 20, 20, 0.95)');
      root.style.setProperty('--card-foreground', '#ffffff');
      root.style.setProperty('--dialog', 'rgba(20, 20, 20, 0.95)');
      root.style.setProperty('--dialog-foreground', '#ffffff');
    } 
    else if (theme === 'halloween') {
      // Halloween theme - Orange, Purple, Green
      root.style.setProperty('--theme-primary', '#9c4221'); // Pumpkin orange
      root.style.setProperty('--theme-secondary', '#805ad5'); // Purple
      root.style.setProperty('--theme-accent', '#68d391'); // Slime green
      root.style.setProperty('--theme-bg-pattern', 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 30l1 1-1 1-1-1 1-1M28 25l1 1-1 1-1-1 1-1M32 25l1 1-1 1-1-1 1-1M30 34l1 1-1 1-1-1 1-1\' fill=\'%239c412127\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")');
      
      // Additional Halloween theme enhancements for various elements
      root.style.setProperty('--primary', '#9c4221'); // Button primary color
      root.style.setProperty('--primary-foreground', '#ffffff'); // Text on primary
      root.style.setProperty('--secondary', '#805ad5'); // Secondary color
      root.style.setProperty('--border', 'rgba(156, 66, 33, 0.2)'); // Border color with orange tint
      root.style.setProperty('--ring', 'rgba(156, 66, 33, 0.5)'); // Focus ring
      root.style.setProperty('--accent', 'rgba(156, 66, 33, 0.1)'); // Accent background
      root.style.setProperty('--accent-foreground', '#9c4221'); // Accent text
      
      // Adjust card and dialog background with a slight theme tint
      root.style.setProperty('--card', 'rgba(20, 20, 20, 0.95)');
      root.style.setProperty('--card-foreground', '#ffffff');
      root.style.setProperty('--dialog', 'rgba(20, 20, 20, 0.95)');
      root.style.setProperty('--dialog-foreground', '#ffffff');
    } 
    else if (theme === 'thanksgiving') {
      // Thanksgiving theme - Orange, Brown, Yellow
      root.style.setProperty('--theme-primary', '#dd6b20'); // Orange
      root.style.setProperty('--theme-secondary', '#b7791f'); // Brown
      root.style.setProperty('--theme-accent', '#ecc94b'); // Yellow
      root.style.setProperty('--theme-bg-pattern', 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 32.5c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3M15 22.5c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3M45 42.5c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3\' fill=\'%23dd6b2020\' fill-opacity=\'0.08\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")');
      
      // Additional Thanksgiving theme enhancements for various elements
      root.style.setProperty('--primary', '#dd6b20'); // Button primary color  
      root.style.setProperty('--primary-foreground', '#ffffff'); // Text on primary
      root.style.setProperty('--secondary', '#b7791f'); // Secondary color
      root.style.setProperty('--border', 'rgba(221, 107, 32, 0.2)'); // Border color with orange tint
      root.style.setProperty('--ring', 'rgba(221, 107, 32, 0.5)'); // Focus ring
      root.style.setProperty('--accent', 'rgba(221, 107, 32, 0.1)'); // Accent background
      root.style.setProperty('--accent-foreground', '#dd6b20'); // Accent text
      
      // Adjust card and dialog background with a slight theme tint
      root.style.setProperty('--card', 'rgba(20, 20, 20, 0.95)');
      root.style.setProperty('--card-foreground', '#ffffff');
      root.style.setProperty('--dialog', 'rgba(20, 20, 20, 0.95)');
      root.style.setProperty('--dialog-foreground', '#ffffff');
    } 
    else {
      // Default theme - reset to original values
      root.style.removeProperty('--theme-primary');
      root.style.removeProperty('--theme-secondary');
      root.style.removeProperty('--theme-accent'); 
      root.style.removeProperty('--theme-bg-pattern');
      
      // Reset Tailwind CSS variables
      root.style.removeProperty('--primary');
      root.style.removeProperty('--primary-foreground');
      root.style.removeProperty('--secondary');
      root.style.removeProperty('--border');
      root.style.removeProperty('--ring');
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-foreground');
      root.style.removeProperty('--card');
      root.style.removeProperty('--card-foreground');
      root.style.removeProperty('--dialog');
      root.style.removeProperty('--dialog-foreground');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isLoading }}>
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