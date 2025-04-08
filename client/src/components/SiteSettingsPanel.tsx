import { useState } from 'react';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

export default function SiteSettingsPanel() {
  const { config, isLoading, updateConfig, isPendingUpdate } = useSiteConfig();
  const [activeTab, setActiveTab] = useState('general');

  // If config is not loaded yet, we can't pre-populate the form
  if (isLoading || !config) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Form state initialization
  const [formData, setFormData] = useState({
    siteName: config.siteName,
    logoText: config.logoText,
    primaryColor: config.primaryColor,
    discordInviteUrl: config.discordInviteUrl,
    showStatistics: config.showStatistics,
    showTestimonials: config.showTestimonials,
    maintenanceMode: config.maintenanceMode,
    maintenanceMessage: config.maintenanceMessage,
    footerText: config.footerText,
    customCss: config.customCss
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    updateConfig(config.id, formData);
  };
  
  const hasChanges = () => {
    return (
      formData.siteName !== config.siteName ||
      formData.logoText !== config.logoText ||
      formData.primaryColor !== config.primaryColor ||
      formData.discordInviteUrl !== config.discordInviteUrl ||
      formData.showStatistics !== config.showStatistics ||
      formData.showTestimonials !== config.showTestimonials ||
      formData.maintenanceMode !== config.maintenanceMode ||
      formData.maintenanceMessage !== config.maintenanceMessage ||
      formData.footerText !== config.footerText ||
      formData.customCss !== config.customCss
    );
  };
  
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
        <CardDescription>
          Configure global settings for the essence bot website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={formData.siteName}
                    onChange={(e) => handleChange('siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logoText">Logo Text</Label>
                  <Input
                    id="logoText"
                    value={formData.logoText}
                    onChange={(e) => handleChange('logoText', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discordInviteUrl">Discord Invite URL</Label>
                <Input
                  id="discordInviteUrl"
                  value={formData.discordInviteUrl}
                  onChange={(e) => handleChange('discordInviteUrl', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="footerText">Footer Text</Label>
                <Input
                  id="footerText"
                  value={formData.footerText}
                  onChange={(e) => handleChange('footerText', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="display">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    value={formData.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="flex-1"
                  />
                  <div 
                    className="w-10 h-10 rounded border" 
                    style={{ backgroundColor: formData.primaryColor }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showStatistics">Show Statistics</Label>
                  <div className="text-xs text-muted-foreground">
                    Display the bot statistics section on the homepage
                  </div>
                </div>
                <Switch
                  id="showStatistics"
                  checked={formData.showStatistics}
                  onCheckedChange={(checked) => handleChange('showStatistics', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showTestimonials">Show Testimonials</Label>
                  <div className="text-xs text-muted-foreground">
                    Display the testimonials section on the homepage
                  </div>
                </div>
                <Switch
                  id="showTestimonials"
                  checked={formData.showTestimonials}
                  onCheckedChange={(checked) => handleChange('showTestimonials', checked)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode" className="text-red-500 font-semibold">Maintenance Mode</Label>
                  <div className="text-xs text-muted-foreground">
                    Put the website in maintenance mode to restrict access
                  </div>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={formData.maintenanceMode}
                  onCheckedChange={(checked) => handleChange('maintenanceMode', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                <Input
                  id="maintenanceMessage"
                  value={formData.maintenanceMessage}
                  onChange={(e) => handleChange('maintenanceMessage', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customCss">Custom CSS</Label>
                <Textarea
                  id="customCss"
                  value={formData.customCss}
                  onChange={(e) => handleChange('customCss', e.target.value)}
                  rows={5}
                  placeholder="/* Add your custom CSS here */"
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isPendingUpdate || !hasChanges()}
            className="w-24"
          >
            {isPendingUpdate ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}