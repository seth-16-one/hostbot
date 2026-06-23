import { apiClient } from "@/services/api/client";
import type {
  CreateDeploymentInput,
  Deployment,
  DeploymentStatus,
  PairingSession,
} from "@/types/deployment";

export const deploymentService = {
  async createDeployment(input: CreateDeploymentInput): Promise<Deployment> {
    const response = await apiClient.post<Deployment>("/deployments", input);
    return response.data;
  },

  async generateSession(deployment: Deployment): Promise<PairingSession> {
    const response = await apiClient.post<PairingSession>(
      `/deployments/${deployment.id}/session`,
    );
    return response.data;
  },

  async pairBot(deploymentId: string): Promise<DeploymentStatus> {
    const response = await apiClient.post<{ status: DeploymentStatus }>(
      `/deployments/${deploymentId}/pair`,
    );
    return response.data.status;
  },

  async deployBot(deploymentId: string): Promise<DeploymentStatus> {
    const response = await apiClient.post<{ status: DeploymentStatus }>(
      `/deployments/${deploymentId}/deploy`,
    );
    return response.data.status;
  },

  async restartBot(deploymentId: string): Promise<DeploymentStatus> {
    const response = await apiClient.post<{ status: DeploymentStatus }>(
      `/deployments/${deploymentId}/restart`,
    );
    return response.data.status;
  },

  async stopBot(deploymentId: string): Promise<DeploymentStatus> {
    const response = await apiClient.post<{ status: DeploymentStatus }>(
      `/deployments/${deploymentId}/stop`,
    );
    return response.data.status;
  },

  async deleteBot(deploymentId: string): Promise<DeploymentStatus> {
    const response = await apiClient.delete<{ status: DeploymentStatus }>(
      `/deployments/${deploymentId}`,
    );
    return response.data.status;
  },

  async syncBotStatus(deploymentId: string): Promise<DeploymentStatus> {
    const response = await apiClient.get<{ status: DeploymentStatus }>(
      `/deployments/${deploymentId}/status`,
    );
    return response.data.status;
  },
};
