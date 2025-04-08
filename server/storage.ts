import { 
  users, 
  type User, 
  type InsertUser,
  features, 
  type Feature, 
  type InsertFeature,
  commandCategories, 
  type CommandCategory, 
  type InsertCommandCategory,
  commands, 
  type Command, 
  type InsertCommand,
  statistics, 
  type Statistic,
  type InsertStatistic,
  faqs, 
  type Faq,
  type InsertFaq,
  testimonials,
  type Testimonial,
  type InsertTestimonial,
  globalThemes,
  type GlobalTheme,
  type InsertGlobalTheme,
  siteConfigs,
  type SiteConfig,
  type InsertSiteConfig
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

// Expand the storage interface with CRUD methods
export interface IStorage {
  // Session store for authentication
  sessionStore: session.Store;
  
  // User methods (existing)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Features methods
  getFeatures(): Promise<Feature[]>;
  getFeature(id: number): Promise<Feature | undefined>;
  createFeature(feature: InsertFeature): Promise<Feature>;
  
  // Command Categories methods
  getCommandCategories(): Promise<CommandCategory[]>;
  getCommandCategory(id: number): Promise<CommandCategory | undefined>;
  getCommandCategoryBySlug(slug: string): Promise<CommandCategory | undefined>;
  createCommandCategory(category: InsertCommandCategory): Promise<CommandCategory>;
  
  // Commands methods
  getCommands(): Promise<Command[]>;
  getCommandsByCategory(categoryId: number): Promise<Command[]>;
  getCommand(id: number): Promise<Command | undefined>;
  createCommand(command: InsertCommand): Promise<Command>;
  
  // Statistics methods
  getStatistics(): Promise<Statistic | undefined>;
  createStatistics(stats: InsertStatistic): Promise<Statistic>;
  updateStatistics(id: number, stats: Partial<InsertStatistic>): Promise<Statistic | undefined>;
  
  // FAQ methods
  getFaqs(): Promise<Faq[]>;
  getFaq(id: number): Promise<Faq | undefined>;
  createFaq(faq: InsertFaq): Promise<Faq>;
  
  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Global Theme methods
  getGlobalTheme(): Promise<GlobalTheme | undefined>;
  createGlobalTheme(theme: InsertGlobalTheme): Promise<GlobalTheme>;
  updateGlobalTheme(name: string): Promise<GlobalTheme | undefined>;
  
  // Site Config methods
  getSiteConfig(): Promise<SiteConfig | undefined>;
  createSiteConfig(config: InsertSiteConfig): Promise<SiteConfig>;
  updateSiteConfig(id: number, config: Partial<InsertSiteConfig>): Promise<SiteConfig | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private features: Map<number, Feature>;
  private commandCategories: Map<number, CommandCategory>;
  private commands: Map<number, Command>;
  private statistics: Map<number, Statistic>;
  private faqs: Map<number, Faq>;
  private testimonials: Map<number, Testimonial>;
  private globalThemes: Map<number, GlobalTheme>;
  private siteConfigs: Map<number, SiteConfig>;
  
  // Session store for authentication
  sessionStore: session.Store;
  
  currentId: number;

  constructor() {
    this.users = new Map();
    this.features = new Map();
    this.commandCategories = new Map();
    this.commands = new Map();
    this.statistics = new Map();
    this.faqs = new Map();
    this.testimonials = new Map();
    this.globalThemes = new Map();
    this.siteConfigs = new Map();
    this.currentId = 1;
    
    // Initialize memory store for sessions
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Initialize with sample data
    this.initSampleData();
    
    // Initialize with default theme (directly to avoid async issues in constructor)
    const themeId = this.currentId++;
    const defaultTheme: GlobalTheme = { id: themeId, name: 'default' };
    this.globalThemes.set(themeId, defaultTheme);

    // Initialize with default site config (directly to avoid async issues in constructor)
    const configId = this.currentId++;
    const defaultConfig: SiteConfig = {
      id: configId,
      siteName: "essence",
      logoText: "essence",
      primaryColor: "#7c3aed",
      discordInviteUrl: "https://discord.com/oauth2/authorize",
      showStatistics: true,
      showTestimonials: true,
      maintenanceMode: false,
      maintenanceMessage: "We are currently performing maintenance. Please check back later.",
      footerText: "© 2025 essence bot. All rights reserved.",
      customCss: ""
    };
    this.siteConfigs.set(configId, defaultConfig);
  }

  private initSampleData() {
    // Features
    const featuresData: InsertFeature[] = [
      {
        title: "Advanced Moderation",
        description: "Powerful tools to keep your server safe. Auto-mod, anti-spam, custom warnings, and more.",
        icon: "shield-alt",
        iconBg: "bg-accent-primary/10",
        iconColor: "text-accent-primary"
      },
      {
        title: "High-Quality Music",
        description: "Stream crystal-clear music from Spotify, YouTube, SoundCloud and more with advanced queue controls.",
        icon: "music",
        iconBg: "bg-accent-secondary/10",
        iconColor: "text-accent-secondary"
      },
      {
        title: "Fun & Games",
        description: "Keep your community engaged with mini-games, trivia, memes, and interactive challenges.",
        icon: "gamepad",
        iconBg: "bg-discord-green/10",
        iconColor: "text-discord-green"
      },
      {
        title: "Server Statistics",
        description: "Track server growth, activity, and engagement with detailed analytics and leaderboards.",
        icon: "chart-line",
        iconBg: "bg-discord-yellow/10",
        iconColor: "text-discord-yellow"
      },
      {
        title: "Custom Notifications",
        description: "Set up alerts for Twitch, YouTube, Twitter, and Reddit to keep your community updated.",
        icon: "bell",
        iconBg: "bg-discord-blurple/10",
        iconColor: "text-discord-blurple"
      },
      {
        title: "Custom Commands",
        description: "Create your own commands and automated responses with our powerful customization system.",
        icon: "cog",
        iconBg: "bg-discord-red/10",
        iconColor: "text-discord-red"
      }
    ];
    
    // Add features synchronously for the init function
    for (const feature of featuresData) {
      const id = this.currentId++;
      const newFeature: Feature = { ...feature, id };
      this.features.set(id, newFeature);
    }
    
    // Command Categories
    const categories: InsertCommandCategory[] = [
      { name: "Moderation", slug: "moderation" },
      { name: "Music", slug: "music" },
      { name: "Fun", slug: "fun" },
      { name: "Utility", slug: "utility" },
      { name: "Settings", slug: "settings" }
    ];
    
    // Handle the command categories synchronously for the init function
    const categoryIds: Record<string, number> = {};
    
    for (const category of categories) {
      const id = this.currentId++;
      const createdCategory: CommandCategory = { ...category, id };
      this.commandCategories.set(id, createdCategory);
      categoryIds[category.slug] = id;
    }
    
    // Commands
    const commandsData: InsertCommand[] = [
      {
        categoryId: categoryIds.moderation,
        name: "ban",
        syntax: "/ban @user [reason]",
        description: "Ban a user from your server with optional reason",
        permission: "Admin"
      },
      {
        categoryId: categoryIds.moderation,
        name: "kick",
        syntax: "/kick @user [reason]",
        description: "Kick a user from your server with optional reason",
        permission: "Mod"
      },
      {
        categoryId: categoryIds.moderation,
        name: "warn",
        syntax: "/warn @user [reason]",
        description: "Issue a warning to a user that is logged in the system",
        permission: "Mod"
      },
      {
        categoryId: categoryIds.moderation,
        name: "mute",
        syntax: "/mute @user [duration] [reason]",
        description: "Temporarily mute a user for a specified duration",
        permission: "Mod"
      },
      {
        categoryId: categoryIds.moderation,
        name: "purge",
        syntax: "/purge number [user]",
        description: "Delete a specific number of messages, optionally from a specific user",
        permission: "Mod"
      },
      {
        categoryId: categoryIds.moderation,
        name: "lockdown",
        syntax: "/lockdown channel [duration]",
        description: "Temporarily restrict messages in a channel for a specified duration",
        permission: "Admin"
      },
      {
        categoryId: categoryIds.music,
        name: "play",
        syntax: "/play song or URL",
        description: "Play a song from YouTube, Spotify, or other supported platforms",
        permission: "Everyone"
      },
      {
        categoryId: categoryIds.music,
        name: "pause",
        syntax: "/pause",
        description: "Pause the currently playing song",
        permission: "Everyone"
      },
      {
        categoryId: categoryIds.music,
        name: "skip",
        syntax: "/skip",
        description: "Skip to the next song in the queue",
        permission: "Everyone"
      },
      {
        categoryId: categoryIds.fun,
        name: "meme",
        syntax: "/meme [category]",
        description: "Get a random meme, optionally from a specific category",
        permission: "Everyone"
      },
      {
        categoryId: categoryIds.fun,
        name: "trivia",
        syntax: "/trivia [category]",
        description: "Start a trivia game in the current channel",
        permission: "Everyone"
      },
      {
        categoryId: categoryIds.utility,
        name: "poll",
        syntax: "/poll question option1 option2 [option3]...",
        description: "Create a poll with up to 10 options",
        permission: "Everyone"
      },
      {
        categoryId: categoryIds.utility,
        name: "remind",
        syntax: "/remind time message",
        description: "Set a reminder for a specified time",
        permission: "Everyone"
      },
      {
        categoryId: categoryIds.settings,
        name: "prefix",
        syntax: "/prefix [new_prefix]",
        description: "View or change the bot prefix for your server",
        permission: "Admin"
      },
      {
        categoryId: categoryIds.settings,
        name: "welcome",
        syntax: "/welcome channel [#channel] message [text]",
        description: "Configure welcome messages for new members",
        permission: "Admin"
      }
    ];
    
    // Add commands synchronously for the init function
    for (const command of commandsData) {
      const id = this.currentId++;
      const newCommand: Command = { ...command, id };
      this.commands.set(id, newCommand);
    }
    
    // Statistics
    const statsId = this.currentId++;
    const statsData: Statistic = {
      id: statsId,
      servers: 25432,
      users: 4700000,
      commands_executed: 142000000,
      uptime: "99.9%"
    };
    this.statistics.set(statsId, statsData);
    
    // FAQs
    const faqsData: InsertFaq[] = [
      {
        question: "How do I add Essence to my server?",
        answer: "Click the \"Add to Discord\" button on our website, sign in to Discord if prompted, select your server from the dropdown, and authorize the bot with the requested permissions."
      },
      {
        question: "Is Essence free to use?",
        answer: "Yes! Essence offers a generous free tier with access to most features. We also offer premium tiers with additional features and higher usage limits for power users."
      },
      {
        question: "What permissions does Essence need?",
        answer: "Essence requires different permissions based on the features you want to use. For basic functionality, it needs \"Read Messages\" and \"Send Messages\". For moderation features, it needs additional permissions like \"Kick Members\" or \"Ban Members\"."
      },
      {
        question: "How do I configure Essence for my server?",
        answer: "Use the `/settings` command in your server to access the configuration dashboard. From there, you can customize moderation settings, command permissions, and more."
      },
      {
        question: "Can I suggest new features for Essence?",
        answer: "Absolutely! Join our support server and use the #suggestions channel to share your ideas. We regularly implement community suggestions in our updates."
      }
    ];
    
    // Add FAQs synchronously for the init function
    for (const faq of faqsData) {
      const id = this.currentId++;
      const newFaq: Faq = { ...faq, id };
      this.faqs.set(id, newFaq);
    }
    
    // Testimonials
    const testimonialsData: InsertTestimonial[] = [
      {
        name: "Alex Johnson",
        community: "Gaming Community",
        content: "Essence transformed our server. The music quality is unmatched and moderation tools save us hours of work each week.",
        rating: 5
      },
      {
        name: "Sarah Miller",
        community: "Art Community",
        content: "The custom commands are a game-changer for our art prompts. And the Twitch notifications keep everyone updated on livestreams.",
        rating: 4.5
      },
      {
        name: "Michael Davies",
        community: "Study Group",
        content: "We use Essence for our study sessions. The pomodoro timer and background music features help us stay productive together.",
        rating: 5
      }
    ];
    
    // Add testimonials synchronously for the init function
    for (const testimonial of testimonialsData) {
      const id = this.currentId++;
      const newTestimonial: Testimonial = { ...testimonial, id };
      this.testimonials.set(id, newTestimonial);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Features methods
  async getFeatures(): Promise<Feature[]> {
    return Array.from(this.features.values());
  }
  
  async getFeature(id: number): Promise<Feature | undefined> {
    return this.features.get(id);
  }
  
  async createFeature(insertFeature: InsertFeature): Promise<Feature> {
    const id = this.currentId++;
    const feature: Feature = { ...insertFeature, id };
    this.features.set(id, feature);
    return feature;
  }
  
  // Command Categories methods
  async getCommandCategories(): Promise<CommandCategory[]> {
    return Array.from(this.commandCategories.values());
  }
  
  async getCommandCategory(id: number): Promise<CommandCategory | undefined> {
    return this.commandCategories.get(id);
  }
  
  async getCommandCategoryBySlug(slug: string): Promise<CommandCategory | undefined> {
    return Array.from(this.commandCategories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCommandCategory(insertCategory: InsertCommandCategory): Promise<CommandCategory> {
    const id = this.currentId++;
    const category: CommandCategory = { ...insertCategory, id };
    this.commandCategories.set(id, category);
    return category;
  }
  
  // Commands methods
  async getCommands(): Promise<Command[]> {
    return Array.from(this.commands.values());
  }
  
  async getCommandsByCategory(categoryId: number): Promise<Command[]> {
    return Array.from(this.commands.values()).filter(
      (command) => command.categoryId === categoryId,
    );
  }
  
  async getCommand(id: number): Promise<Command | undefined> {
    return this.commands.get(id);
  }
  
  async createCommand(insertCommand: InsertCommand): Promise<Command> {
    const id = this.currentId++;
    const command: Command = { ...insertCommand, id };
    this.commands.set(id, command);
    return command;
  }
  
  // Statistics methods
  async getStatistics(): Promise<Statistic | undefined> {
    // Just return the first statistics entry as we only need one
    return Array.from(this.statistics.values())[0];
  }
  
  async createStatistics(insertStats: InsertStatistic): Promise<Statistic> {
    const id = this.currentId++;
    const stats: Statistic = { ...insertStats, id };
    this.statistics.set(id, stats);
    return stats;
  }
  
  async updateStatistics(id: number, partialStats: Partial<InsertStatistic>): Promise<Statistic | undefined> {
    const currentStats = this.statistics.get(id);
    if (!currentStats) return undefined;
    
    const updatedStats: Statistic = { ...currentStats, ...partialStats };
    this.statistics.set(id, updatedStats);
    return updatedStats;
  }
  
  // FAQ methods
  async getFaqs(): Promise<Faq[]> {
    return Array.from(this.faqs.values());
  }
  
  async getFaq(id: number): Promise<Faq | undefined> {
    return this.faqs.get(id);
  }
  
  async createFaq(insertFaq: InsertFaq): Promise<Faq> {
    const id = this.currentId++;
    const faq: Faq = { ...insertFaq, id };
    this.faqs.set(id, faq);
    return faq;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Global Theme methods
  async getGlobalTheme(): Promise<GlobalTheme | undefined> {
    // There should only be one global theme, so return the first one
    return Array.from(this.globalThemes.values())[0];
  }
  
  async createGlobalTheme(insertTheme: InsertGlobalTheme): Promise<GlobalTheme> {
    const id = this.currentId++;
    const theme: GlobalTheme = { ...insertTheme, id };
    this.globalThemes.set(id, theme);
    return theme;
  }
  
  async updateGlobalTheme(name: string): Promise<GlobalTheme | undefined> {
    const theme = await this.getGlobalTheme();
    if (!theme) {
      // If no theme exists, create a new one
      return this.createGlobalTheme({ name });
    }
    
    // Update the existing theme
    const updatedTheme: GlobalTheme = { ...theme, name };
    this.globalThemes.set(theme.id, updatedTheme);
    return updatedTheme;
  }

  // Site Config methods
  async getSiteConfig(): Promise<SiteConfig | undefined> {
    // There should only be one site config, so return the first one
    return Array.from(this.siteConfigs.values())[0];
  }

  async createSiteConfig(insertConfig: InsertSiteConfig): Promise<SiteConfig> {
    const id = this.currentId++;
    // Explicitly create a SiteConfig object with all required properties
    const config: SiteConfig = {
      id,
      siteName: insertConfig.siteName,
      logoText: insertConfig.logoText,
      primaryColor: insertConfig.primaryColor,
      discordInviteUrl: insertConfig.discordInviteUrl,
      showStatistics: insertConfig.showStatistics,
      showTestimonials: insertConfig.showTestimonials,
      maintenanceMode: insertConfig.maintenanceMode,
      maintenanceMessage: insertConfig.maintenanceMessage,
      footerText: insertConfig.footerText,
      customCss: insertConfig.customCss,
    };
    this.siteConfigs.set(id, config);
    return config;
  }

  async updateSiteConfig(id: number, partialConfig: Partial<InsertSiteConfig>): Promise<SiteConfig | undefined> {
    const currentConfig = this.siteConfigs.get(id);
    if (!currentConfig) return undefined;
    
    // Ensure we maintain the required type structure by combining the objects properly
    // All properties that might be undefined in partialConfig will keep their values from currentConfig
    const updatedConfig: SiteConfig = {
      id: currentConfig.id,
      siteName: partialConfig.siteName !== undefined ? partialConfig.siteName : currentConfig.siteName,
      logoText: partialConfig.logoText !== undefined ? partialConfig.logoText : currentConfig.logoText,
      primaryColor: partialConfig.primaryColor !== undefined ? partialConfig.primaryColor : currentConfig.primaryColor,
      discordInviteUrl: partialConfig.discordInviteUrl !== undefined ? partialConfig.discordInviteUrl : currentConfig.discordInviteUrl,
      showStatistics: partialConfig.showStatistics !== undefined ? partialConfig.showStatistics : currentConfig.showStatistics,
      showTestimonials: partialConfig.showTestimonials !== undefined ? partialConfig.showTestimonials : currentConfig.showTestimonials,
      maintenanceMode: partialConfig.maintenanceMode !== undefined ? partialConfig.maintenanceMode : currentConfig.maintenanceMode,
      maintenanceMessage: partialConfig.maintenanceMessage !== undefined ? partialConfig.maintenanceMessage : currentConfig.maintenanceMessage,
      footerText: partialConfig.footerText !== undefined ? partialConfig.footerText : currentConfig.footerText,
      customCss: partialConfig.customCss !== undefined ? partialConfig.customCss : currentConfig.customCss,
    };
    
    this.siteConfigs.set(id, updatedConfig);
    return updatedConfig;
  }
}

export const storage = new MemStorage();
