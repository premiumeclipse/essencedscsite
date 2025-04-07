import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Feature } from "@shared/schema";
import { 
  ShieldAlert, 
  Music, 
  Gamepad2, 
  LineChart, 
  Bell, 
  Settings 
} from "lucide-react";

// Map of icon types to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  "shield-alt": <ShieldAlert className="text-xl" />,
  "music": <Music className="text-xl" />,
  "gamepad": <Gamepad2 className="text-xl" />,
  "chart-line": <LineChart className="text-xl" />,
  "bell": <Bell className="text-xl" />,
  "cog": <Settings className="text-xl" />
};

export default function FeaturesSection() {
  const { data: features, isLoading } = useQuery<Feature[]>({
    queryKey: ['/api/features'],
  });
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <section id="features" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Your Community</h2>
          <p className="text-muted-foreground">HarmonyBot comes packed with everything you need to run a successful Discord server.</p>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-background p-6 rounded-xl border border-muted h-40 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features?.map((feature) => (
              <motion.div 
                key={feature.id}
                className="feature-card bg-background p-6 rounded-xl border border-muted hover:border-primary/30"
                variants={item}
              >
                <div className={`w-12 h-12 rounded-lg ${feature.iconBg} flex items-center justify-center mb-4`}>
                  <span className={feature.iconColor}>
                    {iconMap[feature.icon]}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
