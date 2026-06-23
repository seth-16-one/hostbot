import { apiClient } from "@/services/api/client";
import type { MarketplaceBot } from "@/types/bot";

export const botsService = {
  async getMarketplace(): Promise<MarketplaceBot[]> {
    const response = await apiClient.get<MarketplaceBot[]>("/bots");
    return response.data;
  },

  async getBot(id: number): Promise<MarketplaceBot> {
    const response = await apiClient.get<MarketplaceBot>(`/bots/${id}`);
    return response.data;
  },
};
