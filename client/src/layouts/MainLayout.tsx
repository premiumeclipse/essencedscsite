import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeEffectsManager from "@/components/theme-effects/ThemeEffectsManager";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col relative
      ${theme === 'christmas' ? 'theme-christmas' : ''}
      ${theme === 'halloween' ? 'theme-halloween' : ''}
      ${theme === 'thanksgiving' ? 'theme-thanksgiving' : ''}
    `}>
      {/* Themed background overlay */}
      <div className={`fixed inset-0 pointer-events-none opacity-5 z-0
        ${theme === 'christmas' ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500 to-green-700' : ''}
        ${theme === 'halloween' ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500 to-purple-900' : ''}
        ${theme === 'thanksgiving' ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400 to-amber-800' : ''}
      `}></div>
      
      {/* Theme effects */}
      <ThemeEffectsManager />
      
      <Header />
      <main className={`flex-grow relative z-10 
        ${theme === 'christmas' ? 'christmas-content' : ''}
        ${theme === 'halloween' ? 'halloween-content' : ''}
        ${theme === 'thanksgiving' ? 'thanksgiving-content' : ''}
      `}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
