import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp,
  MessageSquareMore, 
  Book
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { Faq } from "@shared/schema";

type FAQItemProps = {
  question: string;
  answer: string;
};

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-muted pb-4">
      <button 
        className="w-full text-left flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="text-muted-foreground h-5 w-5" />
        ) : (
          <ChevronDown className="text-muted-foreground h-5 w-5" />
        )}
      </button>
      {isOpen && (
        <motion.div 
          className="mt-2 text-muted-foreground"
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

export default function SupportSection() {
  const { data: faqs } = useQuery<Faq[]>({
    queryKey: ['/api/faqs'],
  });
  
  return (
    <section id="support" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support & Resources</h2>
          <p className="text-muted-foreground">Get help with HarmonyBot and join our community.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-background p-8 rounded-xl border border-muted hover:border-primary/30 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <FaDiscord className="text-4xl text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
            <p className="text-muted-foreground mb-6">Get help from our team and other users, share your feedback, and stay updated on new features.</p>
            <Button asChild className="button-glow">
              <a href="https://discord.gg/harmonybot" target="_blank" rel="noopener noreferrer">
                Join Support Server
              </a>
            </Button>
          </motion.div>
          
          <motion.div 
            className="bg-background p-8 rounded-xl border border-muted hover:border-accent/30 transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <Book className="text-4xl text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Documentation</h3>
            <p className="text-muted-foreground mb-6">Explore our detailed guides, tutorials, and API documentation to get the most out of HarmonyBot.</p>
            <Button asChild className="bg-accent hover:bg-accent/90 button-glow-pink">
              <a href="#" target="_blank" rel="noopener noreferrer">
                View Documentation
              </a>
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-background p-8 rounded-xl border border-muted">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              {faqs?.map((faq) => (
                <FAQItem 
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
