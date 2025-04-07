import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings, Lock, Key, LogOut, UserCircle, Loader2 } from "lucide-react";
import DevPortal from "./DevPortal";
import { useDevAuth } from "@/contexts/DevAuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/use-auth";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const { user, logoutMutation } = useAuth();
  
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
          
          {/* CTA Button & User dropdown */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <UserCircle className="h-5 w-5" />
                      <span>{user.username}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className={`
                    ${theme === 'christmas' ? 'border-red-600/30' : ''}
                    ${theme === 'halloween' ? 'border-orange-600/30' : ''}
                    ${theme === 'thanksgiving' ? 'border-amber-600/30' : ''}
                  `}>
                    <DropdownMenuItem onClick={() => navigate("/")}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => logoutMutation.mutate()}
                      disabled={logoutMutation.isPending}
                      className="text-red-500 focus:text-red-500"
                    >
                      {logoutMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging out...
                        </>
                      ) : (
                        <>
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate("/auth")}
                className="hidden md:flex"
              >
                Login
              </Button>
            )}
            
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
              
              {user ? (
                <>
                  <div className="w-full border-t border-border my-2 pt-2">
                    <div className="flex items-center px-2 py-1 text-muted-foreground">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Logged in as: {user.username}</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 transition-colors py-2"
                    onClick={() => {
                      logoutMutation.mutate();
                      closeMobileMenu();
                    }}
                    disabled={logoutMutation.isPending}
                  >
                    {logoutMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging out...
                      </>
                    ) : (
                      <>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline"
                  className="w-full justify-start transition-colors py-2"
                  onClick={() => {
                    navigate("/auth");
                    closeMobileMenu();
                  }}
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  Login/Register
                </Button>
              )}
              
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
        <DialogContent className={`sm:max-w-md
          ${theme === 'christmas' ? 'border-red-600 bg-gradient-to-b from-red-950/30 to-green-950/30' : ''}
          ${theme === 'halloween' ? 'border-orange-600 bg-gradient-to-b from-orange-950/30 to-purple-950/30' : ''}
          ${theme === 'thanksgiving' ? 'border-amber-600 bg-gradient-to-b from-amber-950/30 to-orange-950/30' : ''}
        `}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-500" />
              Developer Authentication
            </DialogTitle>
            <DialogDescription>
              Please enter the developer password to access settings and customization options.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAuthentication} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="dev-password">Developer Password</Label>
              <Input
                id="dev-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="off"
                className={`
                  ${theme === 'christmas' ? 'border-red-600/30 focus-visible:ring-red-500' : ''}
                  ${theme === 'halloween' ? 'border-orange-600/30 focus-visible:ring-orange-500' : ''}
                  ${theme === 'thanksgiving' ? 'border-amber-600/30 focus-visible:ring-amber-500' : ''}
                `}
              />
            </div>
            
            <div className="flex justify-center pt-4">
              <Key className={`h-16 w-16 text-muted-foreground/30
                ${theme === 'christmas' ? 'text-red-600/40' : ''}
                ${theme === 'halloween' ? 'text-orange-600/40' : ''}
                ${theme === 'thanksgiving' ? 'text-amber-600/40' : ''}
              `} />
            </div>
            
            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAuthModalOpen(false)}
                className={`
                  ${theme === 'christmas' ? 'border-red-600/30 hover:bg-red-950/20' : ''}
                  ${theme === 'halloween' ? 'border-orange-600/30 hover:bg-orange-950/20' : ''}
                  ${theme === 'thanksgiving' ? 'border-amber-600/30 hover:bg-amber-950/20' : ''}
                `}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className={`
                  ${theme === 'christmas' ? 'bg-red-600 hover:bg-red-700' : ''}
                  ${theme === 'halloween' ? 'bg-orange-600 hover:bg-orange-700' : ''}
                  ${theme === 'thanksgiving' ? 'bg-amber-600 hover:bg-amber-700' : ''}
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
