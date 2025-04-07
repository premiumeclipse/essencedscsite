import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
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
  
  // Register API routes with /api prefix
  app.use("/api", apiRouter);

  const httpServer = createServer(app);

  return httpServer;
}
