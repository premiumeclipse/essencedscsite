import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);
  // API routes setup
  
  // API routes
  const apiRouter = express.Router();
  
  // Features endpoint
  apiRouter.get("/features", async (_req: Request, res: Response) => {
    try {
      const features = await storage.getFeatures();
      res.json(features);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch features" });
    }
  });
  
  // Command categories endpoint
  apiRouter.get("/command-categories", async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getCommandCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch command categories" });
    }
  });
  
  // Commands for a specific category
  apiRouter.get("/commands/:categorySlug", async (req: Request, res: Response) => {
    try {
      const { categorySlug } = req.params;
      const category = await storage.getCommandCategoryBySlug(categorySlug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const commands = await storage.getCommandsByCategory(category.id);
      res.json(commands);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch commands" });
    }
  });
  
  // All commands endpoint
  apiRouter.get("/commands", async (_req: Request, res: Response) => {
    try {
      const commands = await storage.getCommands();
      res.json(commands);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch commands" });
    }
  });
  
  // Statistics endpoint
  apiRouter.get("/statistics", async (_req: Request, res: Response) => {
    try {
      const statistics = await storage.getStatistics();
      if (!statistics) {
        return res.status(404).json({ message: "Statistics not found" });
      }
      res.json(statistics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });
  
  // FAQs endpoint
  apiRouter.get("/faqs", async (_req: Request, res: Response) => {
    try {
      const faqs = await storage.getFaqs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch FAQs" });
    }
  });
  
  // Testimonials endpoint
  apiRouter.get("/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  // Global Theme endpoints
  apiRouter.get("/global-theme", async (_req: Request, res: Response) => {
    try {
      const theme = await storage.getGlobalTheme();
      if (!theme) {
        return res.status(404).json({ message: "Theme not found" });
      }
      res.json(theme);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch global theme" });
    }
  });
  
  apiRouter.post("/global-theme", async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      
      if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: "Invalid theme name" });
      }
      
      const validThemes = ['default', 'christmas', 'halloween', 'thanksgiving'];
      if (!validThemes.includes(name)) {
        return res.status(400).json({ message: "Invalid theme name. Must be one of: " + validThemes.join(', ') });
      }
      
      const updatedTheme = await storage.updateGlobalTheme(name);
      if (!updatedTheme) {
        return res.status(500).json({ message: "Failed to update global theme" });
      }
      
      res.json(updatedTheme);
    } catch (error) {
      res.status(500).json({ message: "Failed to update global theme" });
    }
  });
  
  // Site Config endpoints
  apiRouter.get("/site-config", async (_req: Request, res: Response) => {
    try {
      const config = await storage.getSiteConfig();
      if (!config) {
        return res.status(404).json({ message: "Site configuration not found" });
      }
      res.json(config);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch site configuration" });
    }
  });
  
  apiRouter.patch("/site-config/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const config = await storage.getSiteConfig();
      if (!config) {
        return res.status(404).json({ message: "Site configuration not found" });
      }
      
      const allowedFields = [
        'siteName', 'logoText', 'primaryColor', 'discordInviteUrl',
        'showStatistics', 'showTestimonials', 'maintenanceMode',
        'maintenanceMessage', 'footerText', 'customCss'
      ];
      
      // Validate input fields
      const updates: Record<string, any> = {};
      for (const field of allowedFields) {
        if (field in req.body) {
          const value = req.body[field];
          
          // Type validation for boolean fields
          if (['showStatistics', 'showTestimonials', 'maintenanceMode'].includes(field)) {
            if (typeof value !== 'boolean') {
              return res.status(400).json({ message: `Field '${field}' must be a boolean` });
            }
          }
          
          // Type validation for string fields
          if (['siteName', 'logoText', 'primaryColor', 'discordInviteUrl', 'maintenanceMessage', 'footerText', 'customCss'].includes(field)) {
            if (typeof value !== 'string') {
              return res.status(400).json({ message: `Field '${field}' must be a string` });
            }
          }
          
          updates[field] = value;
        }
      }
      
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" });
      }
      
      const updatedConfig = await storage.updateSiteConfig(id, updates);
      if (!updatedConfig) {
        return res.status(500).json({ message: "Failed to update site configuration" });
      }
      
      res.json(updatedConfig);
    } catch (error) {
      res.status(500).json({ message: "Failed to update site configuration" });
    }
  });

  // Register API routes with /api prefix
  app.use("/api", apiRouter);

  const httpServer = createServer(app);

  return httpServer;
}
