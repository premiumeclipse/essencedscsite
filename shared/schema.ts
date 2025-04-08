import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Feature schema for the bot features
export const features = pgTable("features", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  iconBg: text("icon_bg").notNull(),
  iconColor: text("icon_color").notNull(),
});

export const insertFeatureSchema = createInsertSchema(features).pick({
  title: true,
  description: true,
  icon: true,
  iconBg: true,
  iconColor: true,
});

export type InsertFeature = z.infer<typeof insertFeatureSchema>;
export type Feature = typeof features.$inferSelect;

// Command schema for bot commands documentation
export const commandCategories = pgTable("command_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const insertCommandCategorySchema = createInsertSchema(commandCategories).pick({
  name: true,
  slug: true,
});

export type InsertCommandCategory = z.infer<typeof insertCommandCategorySchema>;
export type CommandCategory = typeof commandCategories.$inferSelect;

export const commands = pgTable("commands", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  name: text("name").notNull(),
  syntax: text("syntax").notNull(),
  description: text("description").notNull(),
  permission: text("permission").notNull(),
});

export const insertCommandSchema = createInsertSchema(commands).pick({
  categoryId: true,
  name: true,
  syntax: true,
  description: true,
  permission: true,
});

export type InsertCommand = z.infer<typeof insertCommandSchema>;
export type Command = typeof commands.$inferSelect;

// Statistics schema
export const statistics = pgTable("statistics", {
  id: serial("id").primaryKey(),
  servers: integer("servers").notNull(),
  users: integer("users").notNull(),
  commands_executed: integer("commands_executed").notNull(),
  uptime: text("uptime").notNull(),
});

export const insertStatisticSchema = createInsertSchema(statistics).pick({
  servers: true,
  users: true,
  commands_executed: true,
  uptime: true,
});

export type InsertStatistic = z.infer<typeof insertStatisticSchema>;
export type Statistic = typeof statistics.$inferSelect;

// FAQ schema
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
});

export const insertFaqSchema = createInsertSchema(faqs).pick({
  question: true,
  answer: true,
});

export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type Faq = typeof faqs.$inferSelect;

// Testimonial schema
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  community: text("community").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  community: true,
  content: true,
  rating: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Export existing schema for users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Global Theme schema
export const globalThemes = pgTable("global_themes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const insertGlobalThemeSchema = createInsertSchema(globalThemes).pick({
  name: true,
});

export type InsertGlobalTheme = z.infer<typeof insertGlobalThemeSchema>;
export type GlobalTheme = typeof globalThemes.$inferSelect;

// Site Configuration schema
export const siteConfigs = pgTable("site_configs", {
  id: serial("id").primaryKey(),
  siteName: text("site_name").notNull().default("essence"),
  logoText: text("logo_text").notNull().default("essence"),
  primaryColor: text("primary_color").notNull().default("#7c3aed"),
  discordInviteUrl: text("discord_invite_url").notNull().default("https://discord.com/oauth2/authorize"),
  showStatistics: boolean("show_statistics").notNull().default(true),
  showTestimonials: boolean("show_testimonials").notNull().default(true),
  maintenanceMode: boolean("maintenance_mode").notNull().default(false),
  maintenanceMessage: text("maintenance_message").default("We are currently performing maintenance. Please check back later."),
  footerText: text("footer_text").notNull().default("© 2025 essence bot. All rights reserved."),
  customCss: text("custom_css").default(""),
});

export const insertSiteConfigSchema = createInsertSchema(siteConfigs).pick({
  siteName: true,
  logoText: true,
  primaryColor: true,
  discordInviteUrl: true,
  showStatistics: true,
  showTestimonials: true,
  maintenanceMode: true,
  maintenanceMessage: true,
  footerText: true,
  customCss: true,
});

export type InsertSiteConfig = z.infer<typeof insertSiteConfigSchema>;
export type SiteConfig = typeof siteConfigs.$inferSelect;
