import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import CommandsPage from "@/pages/CommandsPage";
import SupportPage from "@/pages/SupportPage";
import AuthPage from "@/pages/auth-page";
import EditorPage from "@/pages/EditorPage";
import MainLayout from "@/layouts/MainLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DevAuthProvider } from "@/contexts/DevAuthContext";
import { SiteConfigProvider } from "@/contexts/SiteConfigContext";
import ThemeEffectsManager from "@/components/theme-effects/ThemeEffectsManager";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/editor" component={EditorPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/commands" component={CommandsPage} />
      <Route path="/support" component={SupportPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <DevAuthProvider>
            <SiteConfigProvider>
              <ThemeEffectsManager />
              <MainLayout>
                <Router />
              </MainLayout>
              <Toaster />
            </SiteConfigProvider>
          </DevAuthProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
