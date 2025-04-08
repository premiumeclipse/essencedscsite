import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme, ThemeType } from "@/contexts/ThemeContext";
import { Check, Snowflake, Skull, Leaf, Lock, X, Loader2, Settings, Cog } from "lucide-react";
import { useDevAuth } from "@/contexts/DevAuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import SiteSettingsPanel from "@/components/SiteSettingsPanel";

interface DevPortalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DevPortal({ open, onOpenChange }: DevPortalProps) {
  const { theme, setTheme, isLoading } = useTheme();
  const [selectedTab, setSelectedTab] = useState<string>("themes");
  const { isAuthenticated, login, logout } = useDevAuth();
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();

  const themeOptions: { 
    label: string; 
    value: ThemeType; 
    icon: React.ReactNode;
    colors: {
      bg: string;
      text: string;
      hoverBg: string;
      borderActive: string;
    }
  }[] = [
    { 
      label: "Default", 
      value: "default", 
      icon: <Check className="h-4 w-4" />,
      colors: {
        bg: "bg-secondary",
        text: "text-foreground",
        hoverBg: "hover:bg-accent",
        borderActive: "border-primary",
      }
    },
    { 
      label: "Christmas", 
      value: "christmas", 
      icon: <Snowflake className="h-4 w-4 text-white" />,
      colors: {
        bg: "bg-red-600/80",
        text: "text-white",
        hoverBg: "hover:bg-red-700",
        borderActive: "border-green-600",
      }
    },
    { 
      label: "Halloween", 
      value: "halloween", 
      icon: <Skull className="h-4 w-4 text-white" />,
      colors: {
        bg: "bg-orange-600/80",
        text: "text-white",
        hoverBg: "hover:bg-orange-700",
        borderActive: "border-purple-600",
      }
    },
    { 
      label: "Thanksgiving", 
      value: "thanksgiving", 
      icon: <Leaf className="h-4 w-4 text-white" />,
      colors: {
        bg: "bg-amber-600/80",
        text: "text-white",
        hoverBg: "hover:bg-amber-700",
        borderActive: "border-amber-300",
      }
    },
  ];

  const handleThemeChange = (newTheme: ThemeType) => {
    if (isLoading) return; // Prevent multiple rapid changes
    
    setTheme(newTheme);
    
    toast({
      title: "Theme Updated",
      description: `The theme has been changed to ${newTheme} for all users.`,
      variant: "default"
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = login(password);
    
    if (success) {
      toast({
        title: "Success",
        description: "You've been authenticated.",
        variant: "default"
      });
      setIsLoggingIn(false);
    } else {
      toast({
        title: "Authentication failed",
        description: "Incorrect password. Please try again.",
        variant: "destructive"
      });
    }
    
    setPassword("");
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You've been logged out of the developer portal.",
      variant: "default"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`w-[95%] max-w-md mx-auto relative overflow-hidden
        ${theme === 'christmas' ? 'border-red-600 bg-gradient-to-b from-red-950/40 to-green-950/40' : ''}
        ${theme === 'halloween' ? 'border-orange-600 bg-gradient-to-b from-orange-950/40 to-purple-950/40' : ''}
        ${theme === 'thanksgiving' ? 'border-amber-600 bg-gradient-to-b from-amber-950/40 to-orange-950/40' : ''}
      `}>
        {/* Background Pattern based on theme */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0" 
             style={{ backgroundImage: 'var(--theme-bg-pattern)' }}></div>
        
        <DialogHeader className="relative z-10">
          <DialogTitle className={`text-xl font-bold flex items-center gap-2
            ${theme === 'christmas' ? 'text-red-500' : ''}
            ${theme === 'halloween' ? 'text-orange-500' : ''}
            ${theme === 'thanksgiving' ? 'text-amber-500' : ''}
            ${theme === 'default' ? 'text-primary' : ''}
          `}>
            <Settings className="h-5 w-5" />
            Developer Portal
          </DialogTitle>
          <DialogDescription>
            Access development tools and customization options for essence.
          </DialogDescription>
        </DialogHeader>

        {isAuthenticated ? (
          <>
            <Tabs defaultValue="themes" value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className={`grid w-full grid-cols-3 bg-transparent border 
              ${theme === 'christmas' ? 'border-red-600/30 [&>*[data-state=active]]:bg-red-600/20 [&>*[data-state=active]]:text-red-600' : ''}
              ${theme === 'halloween' ? 'border-orange-600/30 [&>*[data-state=active]]:bg-orange-600/20 [&>*[data-state=active]]:text-orange-600' : ''}
              ${theme === 'thanksgiving' ? 'border-amber-600/30 [&>*[data-state=active]]:bg-amber-600/20 [&>*[data-state=active]]:text-amber-600' : ''}
              ${theme === 'default' ? 'border-border [&>*[data-state=active]]:bg-accent [&>*[data-state=active]]:text-accent-foreground' : ''}
            `}>
                <TabsTrigger value="themes" className={`
                  data-[state=active]:shadow-none
                  ${theme === 'christmas' ? 'hover:bg-red-600/10 hover:text-red-500' : ''}
                  ${theme === 'halloween' ? 'hover:bg-orange-600/10 hover:text-orange-500' : ''}
                  ${theme === 'thanksgiving' ? 'hover:bg-amber-600/10 hover:text-amber-500' : ''}
                  ${theme === 'default' ? 'hover:bg-accent/80 hover:text-accent-foreground' : ''}
                `}>
                  <div className="flex items-center gap-1">
                    <span>Themes</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="settings" className={`
                  data-[state=active]:shadow-none
                  ${theme === 'christmas' ? 'hover:bg-red-600/10 hover:text-red-500' : ''}
                  ${theme === 'halloween' ? 'hover:bg-orange-600/10 hover:text-orange-500' : ''}
                  ${theme === 'thanksgiving' ? 'hover:bg-amber-600/10 hover:text-amber-500' : ''}
                  ${theme === 'default' ? 'hover:bg-accent/80 hover:text-accent-foreground' : ''}
                `}>Settings</TabsTrigger>
                <TabsTrigger value="about" className={`
                  data-[state=active]:shadow-none
                  ${theme === 'christmas' ? 'hover:bg-red-600/10 hover:text-red-500' : ''}
                  ${theme === 'halloween' ? 'hover:bg-orange-600/10 hover:text-orange-500' : ''}
                  ${theme === 'thanksgiving' ? 'hover:bg-amber-600/10 hover:text-amber-500' : ''}
                  ${theme === 'default' ? 'hover:bg-accent/80 hover:text-accent-foreground' : ''}
                `}>About</TabsTrigger>
              </TabsList>

              <TabsContent value="themes" className="py-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Seasonal Themes</h3>
                  <p className="text-sm text-muted-foreground">
                    Change the appearance of the essence website with these seasonal themes.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {themeOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={theme === option.value ? "default" : "outline"}
                        className={`flex items-center justify-center gap-2
                          ${theme === option.value 
                            ? `${option.colors.borderActive} ${option.colors.bg} ${option.colors.text}`
                            : "hover:bg-transparent"
                          }
                          ${option.value === 'christmas' && 'hover:bg-red-600/20 hover:text-red-500 hover:border-red-500'}
                          ${option.value === 'halloween' && 'hover:bg-orange-600/20 hover:text-orange-500 hover:border-orange-500'}
                          ${option.value === 'thanksgiving' && 'hover:bg-amber-600/20 hover:text-amber-500 hover:border-amber-500'}
                        `}
                        onClick={() => handleThemeChange(option.value)}
                        disabled={isLoading}
                      >
                        {isLoading && theme === option.value ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          option.icon
                        )}
                        {option.label}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-xs text-muted-foreground">
                    <p>Note: Theme settings will be remembered across visits.</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="py-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Cog className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Site Configuration</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Manage global settings for the essence website.
                  </p>
                  
                  <div className="mt-4">
                    <SiteSettingsPanel />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="about" className="py-4">
                <div className="space-y-4">
                  <h3 className="font-medium">About essence</h3>
                  <p className="text-sm text-muted-foreground">
                    essence is a powerful Discord bot designed to enhance your server experience.
                  </p>
                  
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground">Version 1.0.0</p>
                    <p className="text-xs text-muted-foreground">© 2025 essence bot</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                size="sm"
                className={`
                  mb-2 sm:mb-0
                  ${theme === 'christmas' ? 'border-red-600/40 hover:bg-red-950/30 text-foreground' : ''}
                  ${theme === 'halloween' ? 'border-orange-600/40 hover:bg-orange-950/30 text-foreground' : ''}
                  ${theme === 'thanksgiving' ? 'border-amber-600/40 hover:bg-amber-950/30 text-foreground' : ''}
                  ${theme === 'default' ? 'border-border/80 hover:bg-accent text-foreground' : ''}
                `}
              >
                <Lock className="mr-2 h-4 w-4" /> Logout
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => onOpenChange(false)}
                className={`
                  w-full sm:w-auto
                  ${theme === 'christmas' ? 'bg-red-600/20 hover:bg-red-600/30 text-red-700' : ''}
                  ${theme === 'halloween' ? 'bg-orange-600/20 hover:bg-orange-600/30 text-orange-700' : ''}
                  ${theme === 'thanksgiving' ? 'bg-amber-600/20 hover:bg-amber-600/30 text-amber-700' : ''}
                `}
              >
                Close
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            {isLoggingIn ? (
              <div className="py-6 flex flex-col items-center">
                {/* Close Button */}
                <div className="absolute right-4 top-4">
                  <DialogClose asChild>
                    <button 
                      className={`rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none
                        ${theme === 'christmas' ? 'text-red-300 hover:text-red-100' : ''}
                        ${theme === 'halloween' ? 'text-orange-300 hover:text-orange-100' : ''}
                        ${theme === 'thanksgiving' ? 'text-amber-300 hover:text-amber-100' : ''}
                      `}
                      onClick={() => setIsLoggingIn(false)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </button>
                  </DialogClose>
                </div>
                
                <form onSubmit={handleLoginSubmit} className="space-y-4 relative z-10 w-full max-w-[280px] mx-auto">
                  <div className="space-y-2 text-center">
                    <Label htmlFor="password" className={`
                      block text-center
                      ${theme === 'christmas' ? 'text-red-200' : ''}
                      ${theme === 'halloween' ? 'text-orange-200' : ''}
                      ${theme === 'thanksgiving' ? 'text-amber-200' : ''}
                    `}>Developer Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter developer password"
                      autoComplete="off"
                      className={`
                        text-center
                        ${theme === 'christmas' ? 'border-red-600/40 focus-visible:ring-red-500 bg-background/60' : ''}
                        ${theme === 'halloween' ? 'border-orange-600/40 focus-visible:ring-orange-500 bg-background/60' : ''}
                        ${theme === 'thanksgiving' ? 'border-amber-600/40 focus-visible:ring-amber-500 bg-background/60' : ''}
                        ${theme === 'default' ? 'border-border/80 bg-background/60' : ''}
                      `}
                    />
                  </div>
                  <div className="flex justify-center py-4">
                    <div className={`rounded-full p-3 
                      ${theme === 'christmas' ? 'bg-red-600/10' : ''}
                      ${theme === 'halloween' ? 'bg-orange-600/10' : ''}
                      ${theme === 'thanksgiving' ? 'bg-amber-600/10' : ''}
                      ${theme === 'default' ? 'bg-primary/10' : ''}
                    `}>
                      <Lock className={`h-14 w-14
                        ${theme === 'christmas' ? 'text-red-500/70' : ''}
                        ${theme === 'halloween' ? 'text-orange-500/70' : ''}
                        ${theme === 'thanksgiving' ? 'text-amber-500/70' : ''}
                        ${theme === 'default' ? 'text-primary/60' : ''}
                      `} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Enter the developer password to access additional settings and options.
                    <span className="block mt-1 opacity-70">
                      This area is restricted to authorized personnel only.
                    </span>
                  </p>
                  
                  <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsLoggingIn(false)}
                      className={`
                        mb-2 sm:mb-0
                        ${theme === 'christmas' ? 'border-red-600/40 hover:bg-red-950/30 text-foreground' : ''}
                        ${theme === 'halloween' ? 'border-orange-600/40 hover:bg-orange-950/30 text-foreground' : ''}
                        ${theme === 'thanksgiving' ? 'border-amber-600/40 hover:bg-amber-950/30 text-foreground' : ''}
                        ${theme === 'default' ? 'border-border/80 hover:bg-accent text-foreground' : ''}
                      `}
                    >
                      <X className="mr-2 h-4 w-4" /> Cancel
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
                  </div>
                </form>
              </div>
            ) : (
              <>
                <Tabs defaultValue="themes" value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className={`grid w-full ${isAuthenticated ? 'grid-cols-3' : 'grid-cols-2'} bg-transparent border 
                  ${theme === 'christmas' ? 'border-red-600/30 [&>*[data-state=active]]:bg-red-600/20 [&>*[data-state=active]]:text-red-600' : ''}
                  ${theme === 'halloween' ? 'border-orange-600/30 [&>*[data-state=active]]:bg-orange-600/20 [&>*[data-state=active]]:text-orange-600' : ''}
                  ${theme === 'thanksgiving' ? 'border-amber-600/30 [&>*[data-state=active]]:bg-amber-600/20 [&>*[data-state=active]]:text-amber-600' : ''}
                  ${theme === 'default' ? 'border-border [&>*[data-state=active]]:bg-accent [&>*[data-state=active]]:text-accent-foreground' : ''}
                `}>
                    <TabsTrigger value="themes" className={`
                      data-[state=active]:shadow-none
                      ${theme === 'christmas' ? 'hover:bg-red-600/10 hover:text-red-500' : ''}
                      ${theme === 'halloween' ? 'hover:bg-orange-600/10 hover:text-orange-500' : ''}
                      ${theme === 'thanksgiving' ? 'hover:bg-amber-600/10 hover:text-amber-500' : ''}
                      ${theme === 'default' ? 'hover:bg-accent/80 hover:text-accent-foreground' : ''}
                    `}>
                      <div className="flex items-center gap-1">
                        <span>Themes</span>
                      </div>
                    </TabsTrigger>
                    {isAuthenticated && <TabsTrigger value="settings" className={`
                      data-[state=active]:shadow-none
                      ${theme === 'christmas' ? 'hover:bg-red-600/10 hover:text-red-500' : ''}
                      ${theme === 'halloween' ? 'hover:bg-orange-600/10 hover:text-orange-500' : ''}
                      ${theme === 'thanksgiving' ? 'hover:bg-amber-600/10 hover:text-amber-500' : ''}
                      ${theme === 'default' ? 'hover:bg-accent/80 hover:text-accent-foreground' : ''}
                    `}>Settings</TabsTrigger>}
                    <TabsTrigger value="about" className={`
                      data-[state=active]:shadow-none
                      ${theme === 'christmas' ? 'hover:bg-red-600/10 hover:text-red-500' : ''}
                      ${theme === 'halloween' ? 'hover:bg-orange-600/10 hover:text-orange-500' : ''}
                      ${theme === 'thanksgiving' ? 'hover:bg-amber-600/10 hover:text-amber-500' : ''}
                      ${theme === 'default' ? 'hover:bg-accent/80 hover:text-accent-foreground' : ''}
                    `}>About</TabsTrigger>
                  </TabsList>

                  <TabsContent value="themes" className="py-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Seasonal Themes</h3>
                      <p className="text-sm text-muted-foreground">
                        Change the appearance of the essence website with these seasonal themes.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {themeOptions.map((option) => (
                          <Button
                            key={option.value}
                            variant={theme === option.value ? "default" : "outline"}
                            className={`flex items-center justify-center gap-2
                              ${theme === option.value 
                                ? `${option.colors.borderActive} ${option.colors.bg} ${option.colors.text}`
                                : "hover:bg-transparent"
                              }
                              ${option.value === 'christmas' && 'hover:bg-red-600/20 hover:text-red-500 hover:border-red-500'}
                              ${option.value === 'halloween' && 'hover:bg-orange-600/20 hover:text-orange-500 hover:border-orange-500'}
                              ${option.value === 'thanksgiving' && 'hover:bg-amber-600/20 hover:text-amber-500 hover:border-amber-500'}
                            `}
                            onClick={() => handleThemeChange(option.value)}
                            disabled={isLoading}
                          >
                            {isLoading && theme === option.value ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              option.icon
                            )}
                            {option.label}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="mt-6 text-xs text-muted-foreground">
                        <p>Note: Theme settings will be remembered across visits.</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="py-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Advanced Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        These settings are for developer use only.
                      </p>
                      
                      <div className="mt-4 p-4 bg-muted rounded-md">
                        <p className="text-xs mb-4">
                          Developer settings are only available to authorized team members.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsLoggingIn(true)}
                          className={`
                            w-full sm:w-auto flex items-center justify-center
                            ${theme === 'christmas' ? 'border-red-600/40 hover:bg-red-600/20 text-red-600 hover:text-red-700' : ''}
                            ${theme === 'halloween' ? 'border-orange-600/40 hover:bg-orange-600/20 text-orange-600 hover:text-orange-700' : ''}
                            ${theme === 'thanksgiving' ? 'border-amber-600/40 hover:bg-amber-600/20 text-amber-600 hover:text-amber-700' : ''}
                          `}
                        >
                          <Lock className={`mr-2 h-4 w-4
                            ${theme === 'christmas' ? 'text-red-500' : ''}
                            ${theme === 'halloween' ? 'text-orange-500' : ''}
                            ${theme === 'thanksgiving' ? 'text-amber-500' : ''}
                          `} /> Developer Login
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="about" className="py-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">About essence</h3>
                      <p className="text-sm text-muted-foreground">
                        essence is a powerful Discord bot designed to enhance your server experience.
                      </p>
                      
                      <div className="mt-4">
                        <p className="text-xs text-muted-foreground">Version 1.0.0</p>
                        <p className="text-xs text-muted-foreground">© 2025 essence bot</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => onOpenChange(false)}
                    className={`
                      w-full sm:w-auto
                      ${theme === 'christmas' ? 'bg-red-600/20 hover:bg-red-600/30 text-red-700' : ''}
                      ${theme === 'halloween' ? 'bg-orange-600/20 hover:bg-orange-600/30 text-orange-700' : ''}
                      ${theme === 'thanksgiving' ? 'bg-amber-600/20 hover:bg-amber-600/30 text-amber-700' : ''}
                    `}
                  >
                    Close
                  </Button>
                </DialogFooter>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}