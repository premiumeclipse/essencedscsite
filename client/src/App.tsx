import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import CommandsPage from "@/pages/CommandsPage";
import SupportPage from "@/pages/SupportPage";
import AuthPage from "@/pages/auth-page";
import MainLayout from "@/layouts/MainLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DevAuthProvider } from "@/contexts/DevAuthContext";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import ThemeEffectsManager from "@/components/theme-effects/ThemeEffectsManager";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={HomePage} />
      <Route path="/commands" component={CommandsPage} />
      <Route path="/support" component={SupportPage} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <DevAuthProvider>
            <ThemeEffectsManager />
            <MainLayout>
              <Router />
            </MainLayout>
            <Toaster />
          </DevAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
