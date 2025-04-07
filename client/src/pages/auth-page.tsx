import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { useTheme, ThemeType } from "@/contexts/ThemeContext";
import { Loader2, Bot, User, Key, LogIn } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { theme } = useTheme();
  const [, navigate] = useLocation();
  const { user, isLoading, loginMutation, registerMutation } = useAuth();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmitLogin = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  const onSubmitRegister = (data: RegisterFormValues) => {
    // Remove confirmPassword before sending to API
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registrationData } = data;
    registerMutation.mutate(registrationData);
  };

  // Helper function for theme-dependent styling
  const getThemeColors = () => {
    switch (theme) {
      case 'christmas':
        return {
          accentColor: 'bg-red-600',
          hoverColor: 'hover:bg-red-700',
          textColor: 'text-red-500',
          gradientFrom: 'from-red-600/20',
          gradientTo: 'to-green-600/20',
          borderColor: 'border-red-500'
        };
      case 'halloween':
        return {
          accentColor: 'bg-orange-600',
          hoverColor: 'hover:bg-orange-700',
          textColor: 'text-orange-500',
          gradientFrom: 'from-orange-600/20',
          gradientTo: 'to-purple-600/20',
          borderColor: 'border-orange-500'
        };
      case 'thanksgiving':
        return {
          accentColor: 'bg-amber-600',
          hoverColor: 'hover:bg-amber-700',
          textColor: 'text-amber-500',
          gradientFrom: 'from-amber-600/20',
          gradientTo: 'to-amber-800/20',
          borderColor: 'border-amber-500'
        };
      default:
        return {
          accentColor: 'bg-primary',
          hoverColor: 'hover:bg-primary/90',
          textColor: 'text-primary',
          gradientFrom: 'from-primary/20',
          gradientTo: 'to-primary/10',
          borderColor: 'border-primary'
        };
    }
  };

  const colors = getThemeColors();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-4 md:p-8">
      {/* Login/Register Form */}
      <div className="w-full max-w-md p-4 md:p-0 md:pr-8">
        <Card className={`border-2 ${colors.borderColor} shadow-lg`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <Bot className={`h-6 w-6 ${colors.textColor}`} />
              <span className={colors.textColor}>Essence</span>
            </CardTitle>
            <CardDescription className="text-center">
              Login or create an account to manage your Discord bot settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" />
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={loginForm.handleSubmit(onSubmitLogin)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        type="text" 
                        placeholder="Enter username" 
                        {...loginForm.register("username")}
                        className={loginForm.formState.errors.username ? "border-red-500" : ""}
                      />
                      {loginForm.formState.errors.username && (
                        <p className="text-red-500 text-xs mt-1">
                          {loginForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter password" 
                        {...loginForm.register("password")}
                        className={loginForm.formState.errors.password ? "border-red-500" : ""}
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className={`w-full ${colors.accentColor} ${colors.hoverColor}`}
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        <>
                          <Key className="mr-2 h-4 w-4" />
                          Login
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={registerForm.handleSubmit(onSubmitRegister)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Username</Label>
                      <Input 
                        id="register-username" 
                        type="text" 
                        placeholder="Choose a username" 
                        {...registerForm.register("username")}
                        className={registerForm.formState.errors.username ? "border-red-500" : ""}
                      />
                      {registerForm.formState.errors.username && (
                        <p className="text-red-500 text-xs mt-1">
                          {registerForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input 
                        id="register-password" 
                        type="password" 
                        placeholder="Create a password" 
                        {...registerForm.register("password")}
                        className={registerForm.formState.errors.password ? "border-red-500" : ""}
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="Confirm your password" 
                        {...registerForm.register("confirmPassword")}
                        className={registerForm.formState.errors.confirmPassword ? "border-red-500" : ""}
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">
                          {registerForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className={`w-full ${colors.accentColor} ${colors.hoverColor}`}
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          <User className="mr-2 h-4 w-4" />
                          Register
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center text-sm">
            <p className="text-muted-foreground">
              {activeTab === "login" ? (
                <>
                  Don't have an account?{" "}
                  <span 
                    className={`${colors.textColor} cursor-pointer`}
                    onClick={() => setActiveTab("register")}
                  >
                    Register
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span 
                    className={`${colors.textColor} cursor-pointer`}
                    onClick={() => setActiveTab("login")}
                  >
                    Login
                  </span>
                </>
              )}
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Hero Section */}
      <div className="w-full max-w-md p-4 md:p-0 md:pl-8 mt-8 md:mt-0">
        <div className={`bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} rounded-lg shadow-lg p-8 h-full`}>
          <h2 className={`text-2xl font-bold mb-4 ${colors.textColor}`}>
            Unleash the Power of Essence
          </h2>
          <p className="text-muted-foreground mb-6">
            The Discord bot that brings your server to life with moderation, music, games, and more.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className={`rounded-full p-1 ${colors.accentColor} text-white mt-1`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Powerful Moderation</h3>
                <p className="text-sm text-muted-foreground">Protect your server with automated tools and custom rules</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className={`rounded-full p-1 ${colors.accentColor} text-white mt-1`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Crystal-Clear Music</h3>
                <p className="text-sm text-muted-foreground">Stream high-quality music from top platforms with advanced controls</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className={`rounded-full p-1 ${colors.accentColor} text-white mt-1`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Engage Your Community</h3>
                <p className="text-sm text-muted-foreground">Keep members active with games, polls, and interactive challenges</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-muted">
            <p className="text-sm text-muted-foreground italic">
              "Essence transformed our server. The music quality is unmatched and moderation tools save us hours of work each week."
            </p>
            <p className="text-sm font-medium mt-2">
              — Alex Johnson, Gaming Community
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}