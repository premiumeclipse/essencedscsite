import express, { Router } from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import { storage } from '../../server/storage';
import { User, Feature, CommandCategory, Command, Faq, Testimonial, GlobalTheme, SiteConfig } from '../../shared/schema';

// Create an Express app
const app = express();
const router = Router();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Simple session setup for serverless environment
// Note: In production, you might want a more robust session store
app.use(session({
  secret: 'essence-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Define API routes
router.get('/features', async (_req, res) => {
  try {
    const features = await storage.getFeatures();
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch features' });
  }
});

router.get('/command-categories', async (_req, res) => {
  try {
    const categories = await storage.getCommandCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch command categories' });
  }
});

router.get('/commands/:categorySlug', async (req, res) => {
  try {
    const category = await storage.getCommandCategoryBySlug(req.params.categorySlug);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    const commands = await storage.getCommandsByCategory(category.id);
    res.json(commands);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch commands' });
  }
});

router.get('/commands', async (_req, res) => {
  try {
    const commands = await storage.getCommands();
    res.json(commands);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch commands' });
  }
});

router.get('/statistics', async (_req, res) => {
  try {
    const stats = await storage.getStatistics();
    res.json(stats || { servers: 0, users: 0, commandsExecuted: 0, uptime: '0' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

router.get('/faqs', async (_req, res) => {
  try {
    const faqs = await storage.getFaqs();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

router.get('/testimonials', async (_req, res) => {
  try {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

router.get('/global-theme', async (_req, res) => {
  try {
    const theme = await storage.getGlobalTheme();
    res.json(theme);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch global theme' });
  }
});

router.post('/global-theme', async (req, res) => {
  try {
    const { name } = req.body;
    const updatedTheme = await storage.updateGlobalTheme(name);
    res.json(updatedTheme);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update global theme' });
  }
});

router.get('/site-config', async (_req, res) => {
  try {
    const config = await storage.getSiteConfig();
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch site config' });
  }
});

router.patch('/site-config/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedConfig = await storage.updateSiteConfig(id, req.body);
    
    if (!updatedConfig) {
      return res.status(404).json({ error: 'Site config not found' });
    }
    
    res.json(updatedConfig);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update site config' });
  }
});

// Use the router
app.use('/.netlify/functions/api', router);

// Export the serverless function
export const handler = serverless(app);