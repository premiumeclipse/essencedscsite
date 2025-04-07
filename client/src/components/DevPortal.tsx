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
import { Check, Snowflake, Skull, Leaf } from "lucide-react";

interface DevPortalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DevPortal({ open, onOpenChange }: DevPortalProps) {
  const { theme, setTheme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<string>("themes");

  const themeOptions: { label: string; value: ThemeType; icon: React.ReactNode }[] = [
    { label: "Default", value: "default", icon: <Check className="h-4 w-4" /> },
    { label: "Christmas", value: "christmas", icon: <Snowflake className="h-4 w-4" /> },
    { label: "Halloween", value: "halloween", icon: <Skull className="h-4 w-4" /> },
    { label: "Thanksgiving", value: "thanksgiving", icon: <Leaf className="h-4 w-4" /> },
  ];

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
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
                <p className="text-xs">
                  Developer settings are only available to authorized team members.
                  Please contact the administrator for access.
                </p>
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
      </DialogContent>
    </Dialog>
  );
}