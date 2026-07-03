import { apiClient } from "@/services/api/client";
import type { MarketplaceBot } from "@/types/bot";

function normalizeBot(bot: MarketplaceBot): MarketplaceBot {
  return {
    ...bot,
    icon: bot.icon || "hardware-chip-outline",
    description: bot.description || "",
    longDescription: bot.longDescription || bot.description || "",
    category: bot.category || "WhatsApp",
    version: bot.version || "-",
    rating: bot.rating || 0,
    featured: Boolean(bot.featured),
    totalDeployments: bot.totalDeployments || 0,
    lastUpdated: bot.lastUpdated || "-",
    features: bot.features || [],
    requirements: bot.requirements || [],
    minimumCreditsRequired: bot.minimumCreditsRequired || 0,
    runCreditsPerHour: bot.runCreditsPerHour || 0,
    deploymentConfig: bot.deploymentConfig || {
      minCredits: bot.minimumCreditsRequired || 0,
      hourlyUsage: bot.runCreditsPerHour || 0,
      defaultPrefix: ".",
      sessionTtlSeconds: 300,
    },
  };
}

export const botsService = {
  async getMarketplace(): Promise<MarketplaceBot[]> {
    const response = await apiClient.get<MarketplaceBot[]>("/bots");
    return response.data.map(normalizeBot);
  },

  async getBot(id: number): Promise<MarketplaceBot> {
    const response = await apiClient.get<MarketplaceBot>(`/bots/${id}`);
    return normalizeBot(response.data);
  },
};
