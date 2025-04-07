import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CommandCategory, Command } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import CTASection from "@/components/CTASection";

export default function CommandsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("moderation");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const { data: categories } = useQuery<CommandCategory[]>({
    queryKey: ['/api/command-categories'],
  });
  
  const { data: allCommands } = useQuery<Command[]>({
    queryKey: ['/api/commands'],
  });
  
  // Filter commands by search query and category
  const filteredCommands = allCommands?.filter(command => {
    const matchesSearch = !searchQuery || 
      command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      command.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !activeCategory || 
      (categories?.find(c => c.slug === activeCategory)?.id === command.categoryId);
    
    return matchesSearch && matchesCategory;
  });
  
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
    <>
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Command Documentation</h1>
            <p className="text-muted-foreground">Explore HarmonyBot's extensive library of powerful commands to enhance your Discord server.</p>
          </motion.div>
          
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search all commands..."
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div 
              className="md:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-secondary rounded-lg p-4">
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${activeCategory === "" ? "bg-muted" : ""}`}
                    onClick={() => setActiveCategory("")}
                  >
                    All Commands
                  </Button>
                  
                  {categories?.map((category) => (
                    <Button 
                      key={category.id} 
                      variant="ghost" 
                      className={`w-full justify-start ${activeCategory === category.slug ? "bg-muted" : ""}`}
                      onClick={() => setActiveCategory(category.slug)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {filteredCommands?.length === 0 ? (
                <div className="bg-secondary rounded-lg p-8 text-center">
                  <h3 className="text-xl font-medium mb-2">No commands found</h3>
                  <p className="text-muted-foreground">
                    No commands match your search criteria. Try adjusting your search or category filter.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeCategory && !searchQuery && (
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold mb-2">
                        {categories?.find(c => c.slug === activeCategory)?.name} Commands
                      </h2>
                      <p className="text-muted-foreground">
                        All available commands in the {categories?.find(c => c.slug === activeCategory)?.name.toLowerCase()} category.
                      </p>
                    </div>
                  )}
                  
                  {searchQuery && (
                    <div className="mb-4">
                      <h2 className="text-xl font-medium mb-2">
                        Search results for "{searchQuery}"
                      </h2>
                      <p className="text-muted-foreground">
                        Found {filteredCommands?.length} commands matching your search.
                      </p>
                    </div>
                  )}
                  
                  {filteredCommands?.map((command) => (
                    <div 
                      key={command.id}
                      className="bg-secondary p-5 rounded-lg hover:bg-secondary/70 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          {formatSyntax(command.syntax)}
                          <p className="text-muted-foreground">{command.description}</p>
                          
                          {/* If search is active, show which category this command belongs to */}
                          {(searchQuery || !activeCategory) && (
                            <div className="mt-2">
                              <span className="text-xs bg-muted px-2 py-1 rounded">
                                {categories?.find(c => c.id === command.categoryId)?.name}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="bg-muted/50 text-xs px-2 py-1 rounded text-muted-foreground">
                          {command.permission}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      <CTASection />
    </>
  );
}
