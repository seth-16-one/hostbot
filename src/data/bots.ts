import type { MarketplaceBot } from "@/types/bot";

const withDeploymentConfig = (bot: Omit<MarketplaceBot, "deploymentConfig">) => ({
  ...bot,
  deploymentConfig: {
    minCredits: bot.minimumCreditsRequired,
    hourlyUsage: bot.runCreditsPerHour,
    defaultPrefix: ".",
    sessionTtlSeconds: 300,
  },
});

const bots: { marketplace: MarketplaceBot[] } = {
  marketplace: [
    withDeploymentConfig({
      id: 1,
      icon: "hardware-chip-outline",
      name: "SethBot-MD",
      description: "WhatsApp Multi Device Bot",
      longDescription:
        "A powerful WhatsApp Multi-Device bot with automation, moderation, AI integration, downloads, and business tools.",

      category: "WhatsApp",
      version: "v3.0.0",

      rating: 4.9,
      featured: true,

      minimumCreditsRequired: 100,
      runCreditsPerHour: 5,

      status: "active",

      totalDeployments: 1240,
      lastUpdated: "2026-06-20",

      features: [
        "Auto Reply",
        "Group Management",
        "AI Integration",
        "Media Downloader",
        "Anti-Link Protection",
      ],

      requirements: [
        "WhatsApp Number",
        "Internet Connection",
        "Host Bot Credits",
      ],
    }),

    withDeploymentConfig({
      id: 2,
      icon: "chatbubble-ellipses-outline",
      name: "Black-MD",
      description: "WhatsApp Single Device Bot",
      longDescription:
        "Lightweight WhatsApp bot designed for personal automation and small communities.",

      category: "WhatsApp",
      version: "v2.4.1",

      rating: 4.7,
      featured: false,

      minimumCreditsRequired: 50,
      runCreditsPerHour: 3,

      status: "active",

      totalDeployments: 860,
      lastUpdated: "2026-06-18",

      features: ["Auto Reply", "Commands", "Sticker Tools", "Media Downloads"],

      requirements: ["WhatsApp Number", "Internet Connection"],
    }),

    withDeploymentConfig({
      id: 3,
      icon: "logo-whatsapp",
      name: "SniperBot-MD",
      description: "WhatsApp Business Bot",
      longDescription:
        "Business-focused WhatsApp bot with customer support and marketing tools.",

      category: "Business",
      version: "v1.8.0",

      rating: 4.8,
      featured: true,

      minimumCreditsRequired: 150,
      runCreditsPerHour: 8,

      status: "active",

      totalDeployments: 520,
      lastUpdated: "2026-06-15",

      features: [
        "Customer Support",
        "Bulk Messaging",
        "Lead Collection",
        "Analytics",
      ],

      requirements: ["WhatsApp Business Number", "Internet Connection"],
    }),

    withDeploymentConfig({
      id: 4,
      icon: "cart-outline",
      name: "Shop Bot",
      description: "E-commerce Assistant",
      longDescription:
        "Automate product sales, customer support, and order management.",

      category: "E-commerce",
      version: "v1.2.0",

      rating: 4.6,
      featured: false,

      minimumCreditsRequired: 200,
      runCreditsPerHour: 10,

      status: "maintenance",

      totalDeployments: 310,
      lastUpdated: "2026-06-10",

      features: [
        "Product Catalog",
        "Order Tracking",
        "Customer Support",
        "Payment Integration",
      ],

      requirements: ["Store Setup", "Internet Connection"],
    }),
  ],
};

export default bots;
