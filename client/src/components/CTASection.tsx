import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import { Link } from "wouter";

export default function CTASection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="bg-gradient-to-r from-muted to-secondary rounded-2xl p-8 md:p-12 border border-muted overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <FaDiscord className="text-9xl" />
          </div>
          
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your Discord server?</h2>
            <p className="text-muted-foreground text-lg mb-8">Add <span className="font-semibold">essence</span> to your server today and unlock the full potential of your community.</p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild className="button-glow">
                <Link href="/discord/callback">
                  <FaDiscord className="mr-2" /> Add to Discord
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/support">
                  Join Support Server
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 text-muted-foreground">
              <p>No credit card required. Free tier available with premium options.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
