import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings, Lock, Key } from "lucide-react";
import DevPortal from "./DevPortal";
import { useDevAuth } from "@/contexts/DevAuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDevPortalOpen, setIsDevPortalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [location, navigate] = useLocation();
  const { isAuthenticated, login } = useDevAuth();
  const { theme } = useTheme();
  const { toast } = useToast();
  
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
  
  const handleAuthentication = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const success = login(password);
    
    if (success) {
      toast({
        title: "Success",
        description: "You've been authenticated.",
        variant: "default"
      });
      setIsAuthModalOpen(false);
      setIsDevPortalOpen(true);
    } else {
      toast({
        title: "Authentication failed",
        description: "Incorrect password. Please try again.",
        variant: "destructive"
      });
    }
    
    setPassword("");
  };
  
  const openDevPortal = () => {
    if (isAuthenticated) {
      setIsDevPortalOpen(true);
    } else {
      // Prompt user for password 
      setIsAuthModalOpen(true);
    }
    
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
      
      {/* Auth Modal Dialog */}
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className={`w-[95%] max-w-md mx-auto relative overflow-hidden
          ${theme === 'christmas' ? 'border-red-600 bg-gradient-to-b from-red-950/40 to-green-950/40' : ''}
          ${theme === 'halloween' ? 'border-orange-600 bg-gradient-to-b from-orange-950/40 to-purple-950/40' : ''}
          ${theme === 'thanksgiving' ? 'border-amber-600 bg-gradient-to-b from-amber-950/40 to-orange-950/40' : ''}
        `}>
          {/* Background Pattern based on theme */}
          <div className="absolute inset-0 opacity-10 pointer-events-none z-0" 
               style={{ backgroundImage: 'var(--theme-bg-pattern)' }}></div>
          
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Lock className={`h-5 w-5 
                ${theme === 'christmas' ? 'text-red-500' : ''}
                ${theme === 'halloween' ? 'text-orange-500' : ''}
                ${theme === 'thanksgiving' ? 'text-amber-500' : ''}
                ${theme === 'default' ? 'text-red-500' : ''}
              `} />
              Developer Authentication
            </DialogTitle>
            <DialogDescription>
              Please enter the developer password to access settings and customization options.
              <span className="block mt-1 text-xs opacity-70">
                This area is restricted to authorized personnel only.
              </span>
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAuthentication} className="space-y-4 py-4 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="dev-password" className={`
                ${theme === 'christmas' ? 'text-red-200' : ''}
                ${theme === 'halloween' ? 'text-orange-200' : ''}
                ${theme === 'thanksgiving' ? 'text-amber-200' : ''}
              `}>Developer Password</Label>
              <Input
                id="dev-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="off"
                className={`
                  ${theme === 'christmas' ? 'border-red-600/40 focus-visible:ring-red-500 bg-background/60' : ''}
                  ${theme === 'halloween' ? 'border-orange-600/40 focus-visible:ring-orange-500 bg-background/60' : ''}
                  ${theme === 'thanksgiving' ? 'border-amber-600/40 focus-visible:ring-amber-500 bg-background/60' : ''}
                  ${theme === 'default' ? 'border-border/80 bg-background/60' : ''}
                `}
              />
            </div>
            
            <div className="flex justify-center pt-4">
              <div className={`rounded-full p-3 
                ${theme === 'christmas' ? 'bg-red-600/10' : ''}
                ${theme === 'halloween' ? 'bg-orange-600/10' : ''}
                ${theme === 'thanksgiving' ? 'bg-amber-600/10' : ''}
                ${theme === 'default' ? 'bg-primary/10' : ''}
              `}>
                <Key className={`h-14 w-14
                  ${theme === 'christmas' ? 'text-red-500/70' : ''}
                  ${theme === 'halloween' ? 'text-orange-500/70' : ''}
                  ${theme === 'thanksgiving' ? 'text-amber-500/70' : ''}
                  ${theme === 'default' ? 'text-primary/60' : ''}
                `} />
              </div>
            </div>
            
            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between pt-4 gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAuthModalOpen(false)}
                className={`
                  mb-2 sm:mb-0
                  ${theme === 'christmas' ? 'border-red-600/40 hover:bg-red-950/30 text-foreground' : ''}
                  ${theme === 'halloween' ? 'border-orange-600/40 hover:bg-orange-950/30 text-foreground' : ''}
                  ${theme === 'thanksgiving' ? 'border-amber-600/40 hover:bg-amber-950/30 text-foreground' : ''}
                  ${theme === 'default' ? 'border-border/80 hover:bg-accent text-foreground' : ''}
                `}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className={`
                  w-full sm:w-auto
                  ${theme === 'christmas' ? 'bg-red-600 hover:bg-red-700 text-white' : ''}
                  ${theme === 'halloween' ? 'bg-orange-600 hover:bg-orange-700 text-white' : ''}
                  ${theme === 'thanksgiving' ? 'bg-amber-600 hover:bg-amber-700 text-white' : ''}
                  ${theme === 'default' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}
                `}
              >
                <Lock className="mr-2 h-4 w-4" /> Authenticate
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Dev Portal Dialog */}
      <DevPortal 
        open={isDevPortalOpen} 
        onOpenChange={setIsDevPortalOpen} 
      />
    </header>
  );
}
