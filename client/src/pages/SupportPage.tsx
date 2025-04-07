import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  ChevronUp,
  Book,
  MessageSquare,
  Heart,
  Info,
  Shield
} from "lucide-react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { Faq } from "@shared/schema";
import CTASection from "@/components/CTASection";

type FAQItemProps = {
  question: string;
  answer: string;
};

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-muted pb-4">
      <button 
        className="w-full text-left flex justify-between items-center py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="text-muted-foreground h-5 w-5 flex-shrink-0" />
        ) : (
          <ChevronDown className="text-muted-foreground h-5 w-5 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <motion.div 
          className="mt-2 text-muted-foreground pb-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
}

export default function SupportPage() {
  const { data: faqs } = useQuery<Faq[]>({
    queryKey: ['/api/faqs'],
  });
  
  return (
    <>
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Center</h1>
            <p className="text-muted-foreground">Get help with Essence, find answers to common questions, and connect with our community.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div 
              className="bg-secondary p-8 rounded-xl border border-muted hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <FaDiscord className="text-3xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Discord Support Server</h3>
              <p className="text-muted-foreground mb-6">Join our active community for real-time support, feature updates, and to connect with other Essence users.</p>
              <Button asChild size="lg" className="button-glow">
                <a href="https://discord.gg/essence" target="_blank" rel="noopener noreferrer">
                  <FaDiscord className="mr-2" /> Join Our Discord
                </a>
              </Button>
            </motion.div>
            
            <motion.div 
              className="bg-secondary p-8 rounded-xl border border-muted hover:border-accent/30 transition-all duration-300"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Book className="text-3xl text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Documentation & Guides</h3>
              <p className="text-muted-foreground mb-6">Explore our comprehensive documentation with setup guides, command references, and tutorials.</p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 button-glow-pink">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Browse Documentation
                </a>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-secondary rounded-xl border border-muted overflow-hidden mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Tabs defaultValue="general">
              <div className="px-4 pt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="general" className="flex items-center gap-2">
                    <Info className="h-4 w-4" /> General
                  </TabsTrigger>
                  <TabsTrigger value="setup" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Setup & Security
                  </TabsTrigger>
                  <TabsTrigger value="features" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" /> Features
                  </TabsTrigger>
                  <TabsTrigger value="troubleshooting" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Troubleshooting
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="general" className="p-6">
                <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-1">
                  {faqs?.slice(0, 3).map((faq) => (
                    <FAQItem 
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="setup" className="p-6">
                <h3 className="text-2xl font-bold mb-4">Setup & Security FAQ</h3>
                <div className="space-y-1">
                  <FAQItem 
                    question="What permissions does Essence need to function properly?"
                    answer="Essence requires different permissions depending on the features you want to use. At minimum, it needs 'Read Messages' and 'Send Messages'. For moderation features, it requires additional permissions like 'Kick Members', 'Ban Members', and 'Manage Messages'. You can customize which permissions to grant during the bot setup process."
                  />
                  <FAQItem 
                    question="Is it safe to give Essence administrator permissions?"
                    answer="While Essence can function with administrator permissions, we recommend only giving it the specific permissions it needs for the features you plan to use. This follows the principle of least privilege, which is a security best practice."
                  />
                  <FAQItem 
                    question="How do I set up role-based command permissions?"
                    answer="You can configure role-based command permissions using the `/settings permissions` command. This allows you to restrict certain commands to specific roles in your server, giving you fine-grained control over who can use which features."
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="p-6">
                <h3 className="text-2xl font-bold mb-4">Features FAQ</h3>
                <div className="space-y-1">
                  <FAQItem 
                    question="Does Essence support music from Spotify?"
                    answer="Yes! Essence can play music from Spotify, YouTube, SoundCloud, and other popular streaming platforms. Simply use the `/play` command followed by a song name, URL, or playlist link."
                  />
                  <FAQItem 
                    question="How many custom commands can I create?"
                    answer="Free users can create up to 10 custom commands per server. Premium subscribers can create up to 50 custom commands with advanced response options including embeds, buttons, and more."
                  />
                  <FAQItem 
                    question="Can Essence send welcome messages with images?"
                    answer="Yes, Essence's welcome system supports text, embeds, images, and even custom variables like {user}, {server}, and {memberCount} to create personalized welcome messages."
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="troubleshooting" className="p-6">
                <h3 className="text-2xl font-bold mb-4">Troubleshooting FAQ</h3>
                <div className="space-y-1">
                  <FAQItem 
                    question="Essence isn't responding to commands. What should I do?"
                    answer="First, check that Essence has the necessary permissions in your server and the specific channel. Make sure you're using the correct prefix or slash commands. If the issue persists, try removing and re-adding the bot, or join our support Discord for assistance."
                  />
                  <FAQItem 
                    question="Music playback stops unexpectedly. How can I fix this?"
                    answer="Music playback issues can occur due to server load or internet connectivity problems. Try using the `/play` command again or try a different song. If you experience consistent issues, consider upgrading to our premium tier for dedicated audio resources."
                  />
                  <FAQItem 
                    question="How do I report a bug or suggest a feature?"
                    answer="Join our Discord support server and use the #bug-reports channel to report issues or the #suggestions channel to request new features. You can also contact us via Twitter @EssenceBot."
                  />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          <motion.div 
            className="bg-secondary p-8 rounded-xl border border-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Still Need Help?</h3>
              <p className="text-muted-foreground">Our support team is always available to assist you.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaDiscord className="text-xl text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Discord Support</h4>
                <p className="text-muted-foreground text-sm mb-4">Join our server for real-time help from our team.</p>
                <Button asChild variant="outline" size="sm">
                  <a href="https://discord.gg/essence" target="_blank" rel="noopener noreferrer">
                    Join Discord
                  </a>
                </Button>
              </div>
              
              <div className="bg-background p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-[#1DA1F2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTwitter className="text-xl text-[#1DA1F2]" />
                </div>
                <h4 className="font-semibold mb-2">Twitter Support</h4>
                <p className="text-muted-foreground text-sm mb-4">Tweet us @EssenceBot for assistance or updates.</p>
                <Button asChild variant="outline" size="sm">
                  <a href="https://twitter.com/essencebot" target="_blank" rel="noopener noreferrer">
                    Tweet Us
                  </a>
                </Button>
              </div>
              
              <div className="bg-background p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-xl text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Email Support</h4>
                <p className="text-muted-foreground text-sm mb-4">Send us an email for non-urgent inquiries.</p>
                <Button asChild variant="outline" size="sm">
                  <a href="mailto:support@essencebot.com">
                    Email Us
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <CTASection />
    </>
  );
}
