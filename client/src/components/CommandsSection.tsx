import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { 
  CommandCategory, 
  Command as CommandType 
} from "@shared/schema";
import { 
  Input
} from "@/components/ui/input";
import { Search } from "lucide-react";

export default function CommandsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("moderation");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: categories } = useQuery<CommandCategory[]>({
    queryKey: ['/api/command-categories'],
  });

  const { data: commands } = useQuery<CommandType[]>({
    queryKey: ['/api/commands', activeCategory],
    enabled: Boolean(activeCategory),
  });
  
  // Filter commands by search query
  const filteredCommands = commands?.filter(command => {
    if (!searchQuery) return true;
    return (
      command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      command.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCategoryChange = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    setSearchQuery("");
  };

  // Format command syntax with highlighting
  const formatSyntax = (syntax: string) => {
    // Split the syntax string to highlight different parts
    const parts = syntax.split(/(\[.*?\])|(@user)/g).filter(Boolean);
    
    return (
      <div className="font-medium text-lg mb-1">
        {parts.map((part, index) => {
          if (part.startsWith("[") && part.endsWith("]")) {
            return <span key={index} className="text-accent">{part}</span>;
          }
          if (part === "@user") {
            return <span key={index} className="text-primary">{part}</span>;
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <section id="commands" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Command Library</h2>
          <p className="text-muted-foreground">HarmonyBot offers a wide range of slash commands to enhance your Discord experience.</p>
        </motion.div>
        
        <motion.div 
          className="bg-background rounded-xl border border-muted overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="border-b border-muted">
            <div className="flex overflow-x-auto no-scrollbar">
              {categories?.map((category) => (
                <button
                  key={category.id}
                  className={`px-6 py-4 font-medium whitespace-nowrap ${
                    activeCategory === category.slug
                      ? "text-white bg-muted"
                      : "text-muted-foreground hover:text-white"
                  }`}
                  onClick={() => handleCategoryChange(category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="command-content p-6">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search commands..."
                  className="w-full pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2 command-list">
              {filteredCommands?.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No commands found matching "{searchQuery}"
                </div>
              ) : (
                <>
                  {filteredCommands?.map((command) => (
                    <motion.div 
                      key={command.id}
                      className="command-item p-4 rounded-lg cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          {formatSyntax(command.syntax)}
                          <p className="text-muted-foreground">{command.description}</p>
                        </div>
                        <div className="bg-muted/50 text-xs px-2 py-1 rounded text-muted-foreground">
                          {command.permission}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="pt-4 flex justify-center">
                    <button className="text-primary hover:text-white transition-colors">
                      View all {categories?.find(c => c.slug === activeCategory)?.name} commands <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
