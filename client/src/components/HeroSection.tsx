import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Statistic } from "@shared/schema";

export default function HeroSection() {
  const { data: statistics } = useQuery<Statistic>({
    queryKey: ['/api/statistics'],
    staleTime: 60 * 1000, // 1 minute
  });
  
  // Server count with animation
  const formattedServerCount = statistics?.servers 
    ? Math.floor(statistics.servers / 1000) * 1000 + "+" 
    : "25,000+";
  
  return (
    <section className="pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mt-10 md:mt-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Take your Discord server to the <span className="gradient-text">next level</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl">
              essence enhances your Discord community with powerful moderation, music, games, and utility commands. All in one sleek, modern package.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild className="button-glow">
                <a href="https://discord.com/oauth2/authorize" target="_blank" rel="noopener noreferrer">
                  <FaDiscord className="mr-2" /> Add to Discord
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/commands">
                  View Commands
                </Link>
              </Button>
            </div>
            <motion.div 
              className="mt-8 flex items-center space-x-1 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex -space-x-2">
                {/* Avatars are decorative and not functional */}
                <div className="w-8 h-8 rounded-full border-2 border-background bg-muted"></div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-muted"></div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-muted"></div>
              </div>
              <p className="text-sm">Trusted by <span id="server-count" className="font-semibold text-white">{formattedServerCount}</span> servers</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
              
              <motion.div 
                className="bg-secondary p-4 rounded-lg border border-muted relative z-10 shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
              >
                <div className="bg-muted rounded-lg p-2">
                  <div className="flex items-center mb-4">
                    <div className="ml-3">
                      <div className="text-sm font-semibold">essence</div>
                      <div className="text-xs text-muted-foreground">BOT</div>
                    </div>
                    <div className="ml-auto px-2 py-1 bg-[#57F287]/20 text-[#57F287] text-xs rounded-full">
                      Online
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background"></div>
                      <div className="ml-3 bg-background px-3 py-2 rounded-lg rounded-tl-none">
                        <p className="text-sm">/help</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="ml-11 bg-primary/10 px-3 py-3 rounded-lg rounded-tl-none w-full">
                        <div className="text-xs text-primary font-medium mb-2">essence</div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">🔧 Moderation</span>
                            <span className="text-xs text-muted-foreground">/mod</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">🎵 Music Player</span>
                            <span className="text-xs text-muted-foreground">/play</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">🎮 Fun & Games</span>
                            <span className="text-xs text-muted-foreground">/games</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background"></div>
                      <div className="ml-3 bg-background px-3 py-2 rounded-lg rounded-tl-none">
                        <p className="text-sm">/play lofi beats</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="ml-11 bg-primary/10 px-3 py-3 rounded-lg rounded-tl-none">
                        <div className="text-xs text-primary font-medium mb-2">essence</div>
                        <p className="text-sm">🎵 Now playing: Lofi Beats to Study/Relax to</p>
                        <div className="mt-2 bg-background rounded-md h-2 w-full overflow-hidden">
                          <div className="bg-primary h-full w-1/3"></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>1:24</span>
                          <span>4:12</span>
                        </div>
                        <div className="flex space-x-2 mt-2">
                          <button className="p-1 text-muted-foreground hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                            </svg>
                          </button>
                          <button className="p-1 text-white bg-primary rounded-full w-6 h-6 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button className="p-1 text-muted-foreground hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
