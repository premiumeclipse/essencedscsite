import { createContext, ReactNode, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type SiteConfig = {
  id: number;
  siteName: string;
  logoText: string;
  primaryColor: string;
  discordInviteUrl: string;
  showStatistics: boolean;
  showTestimonials: boolean;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  footerText: string;
  customCss: string;
};

type UpdateSiteConfigData = Partial<Omit<SiteConfig, "id">>;

interface SiteConfigContextType {
  config: SiteConfig | null;
  isLoading: boolean;
  error: Error | null;
  updateConfig: (id: number, data: UpdateSiteConfigData) => void;
  isPendingUpdate: boolean;
}

export const SiteConfigContext = createContext<SiteConfigContextType | null>(null);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  
  const {
    data: config,
    error,
    isLoading,
  } = useQuery<SiteConfig>({
    queryKey: ["/api/site-config"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const {
    mutate: updateConfig,
    isPending: isPendingUpdate,
  } = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateSiteConfigData }) => {
      const res = await fetch(`/api/site-config/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update site configuration");
      }
      
      return await res.json();
    },
    onSuccess: (updatedConfig: SiteConfig) => {
      queryClient.setQueryData(["/api/site-config"], updatedConfig);
      toast({
        title: "Configuration Updated",
        description: "The site configuration has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleUpdateConfig = (id: number, data: UpdateSiteConfigData) => {
    updateConfig({ id, data });
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config: config || null,
        isLoading,
        error: error as Error,
        updateConfig: handleUpdateConfig,
        isPendingUpdate,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
}