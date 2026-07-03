import { apiClient } from "@/services/api/client";

export interface Deployment {
  id: string;
  botId: number;
  botName: string;
  ownerNumber?: string;
  sessionName?: string;
  status: string;
  createdAt: string;
  bot: {
    id: number;
    name: string;
    icon?: string;
    category?: string;
  };
}

export const deploymentService = {
  async getMyDeployments(): Promise<Deployment[]> {
    const response = await apiClient.get<Deployment[]>("/deployments");
    return response.data;
  },
};
