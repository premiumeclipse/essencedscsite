// Common constants used throughout the application

// Social media links
export const SOCIAL_LINKS = {
  DISCORD: "https://discord.gg/essence",
  TWITTER: "https://twitter.com/essencebot",
  GITHUB: "https://github.com/essencebot",
  PATREON: "https://patreon.com/essencebot"
};

// Bot invite URL
export const BOT_INVITE_URL = "https://discord.com/oauth2/authorize";

// Discord permissions for the bot
export const BOT_PERMISSIONS = {
  BASIC: ["READ_MESSAGES", "SEND_MESSAGES"],
  MODERATION: ["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_CHANNELS"],
  MUSIC: ["CONNECT", "SPEAK", "USE_VAD"],
  ADMIN: ["ADMINISTRATOR"]
};

// Feature icons and colors mapping
export const FEATURE_ICONS = {
  MODERATION: {
    name: "shield-alt",
    bg: "bg-primary/10",
    color: "text-primary"
  },
  MUSIC: {
    name: "music",
    bg: "bg-accent/10",
    color: "text-accent"
  },
  FUN: {
    name: "gamepad",
    bg: "bg-[#57F287]/10",
    color: "text-[#57F287]"
  },
  STATS: {
    name: "chart-line",
    bg: "bg-[#FEE75C]/10",
    color: "text-[#FEE75C]"
  },
  NOTIFICATIONS: {
    name: "bell",
    bg: "bg-[#5865F2]/10",
    color: "text-[#5865F2]"
  },
  CUSTOM: {
    name: "cog",
    bg: "bg-[#ED4245]/10",
    color: "text-[#ED4245]"
  }
};

// FAQ Categories
export const FAQ_CATEGORIES = [
  { id: "general", name: "General", icon: "info" },
  { id: "setup", name: "Setup & Security", icon: "shield" },
  { id: "features", name: "Features", icon: "heart" },
  { id: "troubleshooting", name: "Troubleshooting", icon: "message-square" }
];
