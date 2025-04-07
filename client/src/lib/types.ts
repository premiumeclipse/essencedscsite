// Additional types for client-side use, extending schema types

import { 
  Feature, 
  Command, 
  CommandCategory, 
  Statistic,
  Testimonial,
  Faq
} from "@shared/schema";

// Extend Feature with computed properties if needed
export interface FeatureWithComputed extends Feature {
  // Add any computed properties here
}

// Command with category information
export interface CommandWithCategory extends Command {
  categoryName: string;
}

// Stats with formatted numbers
export interface FormattedStats {
  servers: string;
  users: string;
  commandsExecuted: string;
  uptime: string;
}
