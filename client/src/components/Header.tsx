import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings } from "lucide-react";
import DevPortal from "./DevPortal";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDevPortalOpen, setIsDevPortalOpen] = useState(false);
  const [location] = useLocation();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "Commands", href: "/commands" },
    { name: "Statistics", href: "/#statistics" },
    { name: "Support", href: "/support" }
  ];
  
  const isActive = (path: string) => {
    if (path.startsWith("/#")) {
      return location === "/";
    }
    return location === path;
  };
  
  const openDevPortal = () => {
    setIsDevPortalOpen(true);
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 blur-bg bg-background/80 border-b border-muted/40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">Essence</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`${
                  isActive(item.href) 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                } transition-colors`}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={openDevPortal}
            >
              DevAccess
            </Button>
          </nav>
          
          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button asChild className="hidden md:flex button-glow">
              <a href="https://discord.com/oauth2/authorize" target="_blank" rel="noopener noreferrer">
                Add to Discord
              </a>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-secondary border-t border-muted/40">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive(item.href) 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  } transition-colors py-2`}
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
              <Button 
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={openDevPortal}
              >
                <Settings className="mr-2 h-4 w-4" />
                DevAccess
              </Button>
              <Button asChild className="w-full mt-2 button-glow">
                <a 
                  href="https://discord.com/oauth2/authorize" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  Add to Discord
                </a>
              </Button>
            </nav>
          </div>
        </div>
      )}
      
      {/* Dev Portal Dialog */}
      <DevPortal 
        open={isDevPortalOpen} 
        onOpenChange={setIsDevPortalOpen} 
      />
    </header>
  );
}
