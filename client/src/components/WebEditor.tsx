import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";

type Command = {
  id: number;
  name: string;
  description: string;
  usage: string;
  categoryId: number;
};

type CommandCategory = {
  id: number;
  name: string;
  description: string;
  slug: string;
};

type GeneralSettings = {
  id: number;
  botName: string;
  botDescription: string;
  botInviteUrl: string;
  mainHeadingText: string;
  subHeadingText: string;
};

type AppearanceSettings = {
  id: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoFont: string;
  headingFont: string;
  bodyFont: string;
  heroBackgroundType: 'color' | 'gradient';
  heroBackgroundColor: string;
  heroBackgroundGradient: string;
};

export default function WebEditor() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("general");

  // General settings state
  const [generalSettings, setGeneralSettings] = useState<Partial<GeneralSettings>>({
    botName: "essence",
    botDescription: "A powerful Discord bot",
    botInviteUrl: "https://discord.com/oauth2/authorize",
    mainHeadingText: "The ultimate Discord bot for your server",
    subHeadingText: "Powerful moderation, high quality music, and fun commands",
  });

  // Appearance settings state
  const [appearanceSettings, setAppearanceSettings] = useState<Partial<AppearanceSettings>>({
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    accentColor: "#ec4899",
    logoFont: "Inter",
    headingFont: "Poppins",
    bodyFont: "Inter",
    heroBackgroundType: "gradient",
    heroBackgroundColor: "#111827",
    heroBackgroundGradient: "linear-gradient(to right, #111827, #1f2937)",
  });

  // Text content state
  const [textContent, setTextContent] = useState({
    heroTitle: "Take your Discord server to the next level",
    heroSubtitle: "essence is a feature-rich Discord bot offering moderation, music, utilities and more",
    featuresTitle: "Why choose essence",
    featuresDescription: "Designed with both simplicity and power in mind.",
    ctaTitle: "Ready to enhance your Discord server?",
    ctaDescription: "Add essence to your server today and unlock its full potential.",
    ctaButtonText: "Add to Discord",
    footerText: "© 2023 essence bot. All rights reserved.",
  });

  // Features state
  const [features, setFeatures] = useState([
    {
      id: 1,
      title: "Advanced Moderation",
      description: "Keep your server safe with powerful moderation tools",
      icon: "shield",
    },
    {
      id: 2,
      title: "High-Quality Music",
      description: "Stream crystal-clear music from multiple sources",
      icon: "music",
    },
    {
      id: 3,
      title: "Fun & Games",
      description: "Keep your community engaged with mini-games and challenges",
      icon: "gamepad",
    },
  ]);

  // Commands & Categories Queries
  const { data: commands, isLoading: isLoadingCommands } = useQuery<Command[]>({
    queryKey: ["/api/commands"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery<CommandCategory[]>({
    queryKey: ["/api/command-categories"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // General Settings Mutation
  const updateGeneralSettingsMutation = useMutation({
    mutationFn: async (data: Partial<GeneralSettings>) => {
      const res = await apiRequest("PATCH", "/api/general-settings/1", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/general-settings"] });
      toast({
        title: "Success",
        description: "General settings updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update general settings",
        variant: "destructive",
      });
    }
  });

  // Appearance Settings Mutation
  const updateAppearanceSettingsMutation = useMutation({
    mutationFn: async (data: Partial<AppearanceSettings>) => {
      const res = await apiRequest("PATCH", "/api/appearance-settings/1", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appearance-settings"] });
      toast({
        title: "Success",
        description: "Appearance settings updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update appearance settings",
        variant: "destructive",
      });
    }
  });

  // Text Content Mutation
  const updateTextContentMutation = useMutation({
    mutationFn: async (data: typeof textContent) => {
      const res = await apiRequest("PATCH", "/api/text-content/1", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/text-content"] });
      toast({
        title: "Success",
        description: "Text content updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update text content",
        variant: "destructive",
      });
    }
  });

  // Features Mutation
  const updateFeaturesMutation = useMutation({
    mutationFn: async (data: typeof features) => {
      const res = await apiRequest("PATCH", "/api/features", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/features"] });
      toast({
        title: "Success",
        description: "Features updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update features",
        variant: "destructive",
      });
    }
  });

  // Event handlers
  const handleGeneralSettingsSave = () => {
    updateGeneralSettingsMutation.mutate(generalSettings);
  };

  const handleAppearanceSettingsSave = () => {
    updateAppearanceSettingsMutation.mutate(appearanceSettings);
  };

  const handleTextContentSave = () => {
    updateTextContentMutation.mutate(textContent);
  };

  const handleFeaturesSave = () => {
    updateFeaturesMutation.mutate(features);
  };

  // Feature update handlers
  const updateFeature = (id: number, key: keyof typeof features[0], value: string) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, [key]: value } : feature
    ));
  };

  if (!user) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-xl mb-8">Please log in to access the Web Editor.</p>
        <Button asChild>
          <a href="/auth">Log In</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Global Web Editor</h1>
        <p className="text-muted-foreground">
          Edit content and appearance settings that will be shown to all visitors.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="text">Text Content</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic information about your Discord bot.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="bot-name">Bot Name</Label>
                <Input
                  id="bot-name"
                  value={generalSettings.botName}
                  onChange={(e) => setGeneralSettings({...generalSettings, botName: e.target.value})}
                  placeholder="essence"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bot-description">Bot Description</Label>
                <Textarea
                  id="bot-description"
                  value={generalSettings.botDescription}
                  onChange={(e) => setGeneralSettings({...generalSettings, botDescription: e.target.value})}
                  placeholder="A powerful Discord bot"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bot-invite-url">Bot Invite URL</Label>
                <Input
                  id="bot-invite-url"
                  value={generalSettings.botInviteUrl}
                  onChange={(e) => setGeneralSettings({...generalSettings, botInviteUrl: e.target.value})}
                  placeholder="https://discord.com/oauth2/authorize"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="main-heading">Main Heading Text</Label>
                <Input
                  id="main-heading"
                  value={generalSettings.mainHeadingText}
                  onChange={(e) => setGeneralSettings({...generalSettings, mainHeadingText: e.target.value})}
                  placeholder="The ultimate Discord bot for your server"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sub-heading">Sub Heading Text</Label>
                <Input
                  id="sub-heading"
                  value={generalSettings.subHeadingText}
                  onChange={(e) => setGeneralSettings({...generalSettings, subHeadingText: e.target.value})}
                  placeholder="Powerful moderation, high quality music, and fun commands"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleGeneralSettingsSave}
                disabled={updateGeneralSettingsMutation.isPending}
              >
                {updateGeneralSettingsMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how your website looks with colors and fonts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Colors</h3>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-md border" 
                        style={{ backgroundColor: appearanceSettings.primaryColor }}
                      />
                      <Input
                        value={appearanceSettings.primaryColor}
                        onChange={(e) => setAppearanceSettings({...appearanceSettings, primaryColor: e.target.value})}
                        placeholder="#6366f1"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-md border" 
                        style={{ backgroundColor: appearanceSettings.secondaryColor }}
                      />
                      <Input
                        value={appearanceSettings.secondaryColor}
                        onChange={(e) => setAppearanceSettings({...appearanceSettings, secondaryColor: e.target.value})}
                        placeholder="#8b5cf6"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-md border" 
                        style={{ backgroundColor: appearanceSettings.accentColor }}
                      />
                      <Input
                        value={appearanceSettings.accentColor}
                        onChange={(e) => setAppearanceSettings({...appearanceSettings, accentColor: e.target.value})}
                        placeholder="#ec4899"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Fonts</h3>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="logo-font">Logo Font</Label>
                    <Input
                      id="logo-font"
                      value={appearanceSettings.logoFont}
                      onChange={(e) => setAppearanceSettings({...appearanceSettings, logoFont: e.target.value})}
                      placeholder="Inter"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="heading-font">Heading Font</Label>
                    <Input
                      id="heading-font"
                      value={appearanceSettings.headingFont}
                      onChange={(e) => setAppearanceSettings({...appearanceSettings, headingFont: e.target.value})}
                      placeholder="Poppins"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="body-font">Body Font</Label>
                    <Input
                      id="body-font"
                      value={appearanceSettings.bodyFont}
                      onChange={(e) => setAppearanceSettings({...appearanceSettings, bodyFont: e.target.value})}
                      placeholder="Inter"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Hero Background</h3>
                <RadioGroup 
                  value={appearanceSettings.heroBackgroundType}
                  onValueChange={(value) => setAppearanceSettings({
                    ...appearanceSettings, 
                    heroBackgroundType: value as 'color' | 'gradient'
                  })}
                  className="mb-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="color" id="bg-color" />
                    <Label htmlFor="bg-color">Solid Color</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gradient" id="bg-gradient" />
                    <Label htmlFor="bg-gradient">Gradient</Label>
                  </div>
                </RadioGroup>

                {appearanceSettings.heroBackgroundType === 'color' ? (
                  <div className="grid gap-2">
                    <Label htmlFor="bg-color-input">Background Color</Label>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-md border" 
                        style={{ backgroundColor: appearanceSettings.heroBackgroundColor }}
                      />
                      <Input
                        id="bg-color-input"
                        value={appearanceSettings.heroBackgroundColor}
                        onChange={(e) => setAppearanceSettings({...appearanceSettings, heroBackgroundColor: e.target.value})}
                        placeholder="#111827"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <Label htmlFor="bg-gradient-input">Background Gradient</Label>
                    <Input
                      id="bg-gradient-input"
                      value={appearanceSettings.heroBackgroundGradient}
                      onChange={(e) => setAppearanceSettings({...appearanceSettings, heroBackgroundGradient: e.target.value})}
                      placeholder="linear-gradient(to right, #111827, #1f2937)"
                    />
                    <div 
                      className="w-full h-12 rounded-md mt-2" 
                      style={{ background: appearanceSettings.heroBackgroundGradient }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleAppearanceSettingsSave}
                disabled={updateAppearanceSettingsMutation.isPending}
              >
                {updateAppearanceSettingsMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Text Content Tab */}
        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Text Content</CardTitle>
              <CardDescription>
                Edit the textual content displayed on your website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="hero-title">Hero Title</Label>
                <Input
                  id="hero-title"
                  value={textContent.heroTitle}
                  onChange={(e) => setTextContent({...textContent, heroTitle: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                <Input
                  id="hero-subtitle"
                  value={textContent.heroSubtitle}
                  onChange={(e) => setTextContent({...textContent, heroSubtitle: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="features-title">Features Section Title</Label>
                <Input
                  id="features-title"
                  value={textContent.featuresTitle}
                  onChange={(e) => setTextContent({...textContent, featuresTitle: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="features-description">Features Description</Label>
                <Textarea
                  id="features-description"
                  value={textContent.featuresDescription}
                  onChange={(e) => setTextContent({...textContent, featuresDescription: e.target.value})}
                  rows={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cta-title">CTA Section Title</Label>
                <Input
                  id="cta-title"
                  value={textContent.ctaTitle}
                  onChange={(e) => setTextContent({...textContent, ctaTitle: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cta-description">CTA Description</Label>
                <Textarea
                  id="cta-description"
                  value={textContent.ctaDescription}
                  onChange={(e) => setTextContent({...textContent, ctaDescription: e.target.value})}
                  rows={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cta-button">CTA Button Text</Label>
                <Input
                  id="cta-button"
                  value={textContent.ctaButtonText}
                  onChange={(e) => setTextContent({...textContent, ctaButtonText: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="footer-text">Footer Text</Label>
                <Input
                  id="footer-text"
                  value={textContent.footerText}
                  onChange={(e) => setTextContent({...textContent, footerText: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleTextContentSave}
                disabled={updateTextContentMutation.isPending}
              >
                {updateTextContentMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Edit the main features showcased on your homepage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {features.map((feature) => (
                  <div key={feature.id} className="border rounded-lg p-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`feature-title-${feature.id}`}>Feature Title</Label>
                        <Input
                          id={`feature-title-${feature.id}`}
                          value={feature.title}
                          onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`feature-desc-${feature.id}`}>Feature Description</Label>
                        <Textarea
                          id={`feature-desc-${feature.id}`}
                          value={feature.description}
                          onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`feature-icon-${feature.id}`}>Icon Name</Label>
                        <Input
                          id={`feature-icon-${feature.id}`}
                          value={feature.icon}
                          onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                          placeholder="shield, music, gamepad, etc."
                        />
                        <p className="text-xs text-muted-foreground">
                          Use icon names from Lucide React (shield, music, gamepad, etc.)
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleFeaturesSave}
                disabled={updateFeaturesMutation.isPending}
              >
                {updateFeaturesMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}