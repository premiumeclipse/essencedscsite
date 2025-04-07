import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme, ThemeType } from "@/contexts/ThemeContext";
import { Check, Snowflake, Skull, Leaf, Lock, X } from "lucide-react";
import { useDevAuth } from "@/contexts/DevAuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface DevPortalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DevPortal({ open, onOpenChange }: DevPortalProps) {
  const { theme, setTheme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<string>("themes");
  const { isAuthenticated, login, logout } = useDevAuth();
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();

  const themeOptions: { label: string; value: ThemeType; icon: React.ReactNode }[] = [
    { label: "Default", value: "default", icon: <Check className="h-4 w-4" /> },
    { label: "Christmas", value: "christmas", icon: <Snowflake className="h-4 w-4" /> },
    { label: "Halloween", value: "halloween", icon: <Skull className="h-4 w-4" /> },
    { label: "Thanksgiving", value: "thanksgiving", icon: <Leaf className="h-4 w-4" /> },
  ];

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Developer Portal</DialogTitle>
          <DialogDescription>
            Access development tools and customization options for Essence.
          </DialogDescription>
        </DialogHeader>

        {isAuthenticated ? (
          <>
            <Tabs defaultValue="themes" value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="themes">Themes</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              <TabsContent value="themes" className="py-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Seasonal Themes</h3>
                  <p className="text-sm text-muted-foreground">
                    Change the appearance of the Essence website with these seasonal themes.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {themeOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={theme === option.value ? "default" : "outline"}
                        className={`flex items-center justify-center gap-2 ${
                          theme === option.value ? "border-primary" : ""
                        }`}
                        onClick={() => handleThemeChange(option.value)}
                      >
                        {option.icon}
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
                    Access to developer-only settings and configurations.
                  </p>
                  
                  <div className="mt-4 space-y-4">
                    <div className="p-4 bg-muted rounded-md">
                      <h4 className="text-sm font-medium mb-2">Debug Mode</h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        Enable advanced logging and debugging features.
                      </p>
                      <Button size="sm" variant="outline">
                        Enable Debug Mode
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-md">
                      <h4 className="text-sm font-medium mb-2">API Configuration</h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        Configure API endpoints and settings.
                      </p>
                      <Button size="sm" variant="outline">
                        Manage API Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="about" className="py-4">
                <div className="space-y-4">
                  <h3 className="font-medium">About Essence</h3>
                  <p className="text-sm text-muted-foreground">
                    Essence is a powerful Discord bot designed to enhance your server experience.
                  </p>
                  
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground">Version 1.0.0</p>
                    <p className="text-xs text-muted-foreground">© 2025 Essence Bot</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                size="sm"
              >
                <Lock className="mr-2 h-4 w-4" /> Logout
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            {isLoggingIn ? (
              <div className="py-6">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Developer Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter developer password"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex justify-center">
                    <Lock className="text-muted-foreground h-16 w-16 mb-2" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Enter the developer password to access additional settings and options.
                  </p>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsLoggingIn(false)}
                    >
                      <X className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                    <Button type="submit">
                      <Lock className="mr-2 h-4 w-4" /> Authenticate
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <Tabs defaultValue="themes" value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="themes">Themes</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                  </TabsList>

                  <TabsContent value="themes" className="py-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Seasonal Themes</h3>
                      <p className="text-sm text-muted-foreground">
                        Change the appearance of the Essence website with these seasonal themes.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {themeOptions.map((option) => (
                          <Button
                            key={option.value}
                            variant={theme === option.value ? "default" : "outline"}
                            className={`flex items-center justify-center gap-2 ${
                              theme === option.value ? "border-primary" : ""
                            }`}
                            onClick={() => handleThemeChange(option.value)}
                          >
                            {option.icon}
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
                        >
                          <Lock className="mr-2 h-4 w-4" /> Developer Login
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="about" className="py-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">About Essence</h3>
                      <p className="text-sm text-muted-foreground">
                        Essence is a powerful Discord bot designed to enhance your server experience.
                      </p>
                      
                      <div className="mt-4">
                        <p className="text-xs text-muted-foreground">Version 1.0.0</p>
                        <p className="text-xs text-muted-foreground">© 2025 Essence Bot</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => onOpenChange(false)}
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