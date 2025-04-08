import React, { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowRight, Settings, HelpCircle, BarChart } from 'lucide-react';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import confetti from 'canvas-confetti';

export default function ThankYouPage() {
  const [, setLocation] = useLocation();
  const { config } = useSiteConfig();
  
  // Trigger confetti when the page loads
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Trigger confetti from both sides
      confetti({
        particleCount: Math.floor(randomInRange(particleCount/2, particleCount)),
        spread: randomInRange(35, 70),
        origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.5, 0.6) }
      });
      confetti({
        particleCount: Math.floor(randomInRange(particleCount/2, particleCount)),
        spread: randomInRange(35, 70),
        origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.5, 0.6) }
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container max-w-6xl mx-auto py-16 px-4">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Thanks for Adding <span className="text-primary">essence</span>!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          You've successfully added essence to your Discord server. Here's what you can do next:
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Configure the Bot</CardTitle>
            <CardDescription>Set up permissions and customize the bot to fit your server's needs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">/settings</code> command in your server to configure essence's behavior.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="https://discord.com/channels/@me" target="_blank" rel="noopener noreferrer">
                Go to Discord <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>View Commands</CardTitle>
            <CardDescription>Learn about all available commands and features</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Explore the full range of commands and learn how to make the most of essence in your server.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/commands">
                Browse Commands <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Get Support</CardTitle>
            <CardDescription>Join our community for help and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Have questions or need assistance? Join our support server to get help from our team and community.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href={config?.discordInviteUrl || "#"} target="_blank" rel="noopener noreferrer">
                Join Support Server <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-center mt-12">
        <Button onClick={() => setLocation('/')} size="lg">
          Return to Homepage
        </Button>
      </div>
    </div>
  );
}