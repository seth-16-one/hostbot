import { apiClient } from "@/services/api/client";
import type {
  CreateDeploymentInput,
  Deployment,
  DeploymentStatus,
  PairingSession,
} from "@/types/deployment";

interface PairingSessionResponse {
  sessionId?: string;
  id?: string;
  deploymentId: string;
  phone?: string;
  pairingCode?: string;
  pairCode?: string;
  qr?: string;
  qrValue?: string;
  expiresAt: string;
  status: PairingSession["status"];
  deploymentStatus?: DeploymentStatus;
  connectedAt?: string | null;
}

function mapPairingSession(response: PairingSessionResponse): PairingSession {
  const pairCode = response.pairingCode ?? response.pairCode ?? "";
  const qrValue = response.qr ?? response.qrValue ?? pairCode;

  return {
    id: response.sessionId ?? response.id ?? response.deploymentId,
    deploymentId: response.deploymentId,
    pairCode,
    qrValue,
    expiresAt: response.expiresAt,
    createdAt: new Date().toISOString(),
    status: response.status,
    connectedAt: response.connectedAt,
    phone: response.phone,
  };
}

export const deploymentService = {
  async getDeployments(): Promise<Deployment[]> {
    const response = await apiClient.get<Deployment[]>("/deployments");
    return response.data;
  },

  async getDeployment(deploymentId: string): Promise<Deployment> {
    const response = await apiClient.get<Deployment>(
      `/deployments/${deploymentId}`,
    );
    return response.data;
  },

  async createDeployment(input: CreateDeploymentInput): Promise<Deployment> {
    const response = await apiClient.post<Deployment>("/deployments", input);
    return response.data;
  },

  async generateSession(deployment: Deployment): Promise<PairingSession> {
    const response = await apiClient.post<PairingSessionResponse>(
      `/deployments/${deployment.id}/session`,
    );
    return mapPairingSession(response.data);
  },

  async refreshSession(deploymentId: string): Promise<PairingSession> {
    const response = await apiClient.post<PairingSessionResponse>(
      `/pair/${deploymentId}/refresh`,
    );
    return mapPairingSession(response.data);
  },

  async getPairingSession(sessionId: string): Promise<PairingSession> {
    const response = await apiClient.get<PairingSessionResponse>(
      `/pair/${sessionId}`,
      { retry: false, timeoutMs: 10000 },
    );
    return mapPairingSession(response.data);
  },

  async startBot(deploymentId: string): Promise<DeploymentStatus> {
    const response = await apiClient.post<{ status: DeploymentStatus }>(
      `/deployments/${deploymentId}/start`,
    );
    return response.data.status;
  },

  async deployBot(deploymentId: string): Promise<DeploymentStatus> {
    const response = await apiClient.post<{ status: DeploymentStatus }>(
      `/deployments/${deploymentId}/deploy`,
    );
    return response.data.status;
  },

  async pairBot(deploymentId: string): Promise<DeploymentStatus> {
    return this.startBot(deploymentId);
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

  async syncBotStatus(deploymentId: string): Promise<Deployment> {
    const response = await apiClient.get<Deployment>(`/deployments/${deploymentId}`);
    return response.data;
  },
};
