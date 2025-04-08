import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface DevAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const DevAuthContext = createContext<DevAuthContextType | undefined>(undefined);

// This is a simple example password - in a real app, this would be stored securely
const CORRECT_PASSWORD = "essence2023";

export function DevAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user was previously authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem("devPortalAuth");
    if (authStatus === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("devPortalAuth", "authenticated");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("devPortalAuth");
  };

  return (
    <DevAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </DevAuthContext.Provider>
  );
}

export function useDevAuth() {
  const context = useContext(DevAuthContext);
  if (context === undefined) {
    throw new Error("useDevAuth must be used within a DevAuthProvider");
  }
  return context;
}