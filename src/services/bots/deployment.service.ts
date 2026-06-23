import type {
  CreateDeploymentInput,
  Deployment,
  DeploymentStatus,
  PairingSession,
} from "@/types/deployment";

const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

const createId = (prefix: string) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const createPairCode = () =>
  Math.random().toString(36).substring(2, 10).toUpperCase();

export const deploymentService = {
  async createDeployment(input: CreateDeploymentInput): Promise<Deployment> {
    await wait();
    const now = new Date().toISOString();

    return {
      ...input,
      id: createId("dep"),
      status: "queued",
      createdAt: now,
      updatedAt: now,
    };
  },

  async generateSession(deployment: Deployment): Promise<PairingSession> {
    await wait();
    const now = new Date();
    const pairCode = createPairCode();

    return {
      id: createId("ses"),
      deploymentId: deployment.id,
      pairCode,
      qrValue: `hostbot://pair/${deployment.id}?code=${pairCode}`,
      expiresAt: new Date(now.getTime() + 5 * 60 * 1000).toISOString(),
      createdAt: now.toISOString(),
    };
  },

  async pairBot(deploymentId: string): Promise<DeploymentStatus> {
    await wait(500);
    return deploymentId ? "deploying" : "failed";
  },

  async deployBot(deploymentId: string): Promise<DeploymentStatus> {
    await wait(700);
    return deploymentId ? "online" : "failed";
  },

  async restartBot(): Promise<DeploymentStatus> {
    await wait();
    return "online";
  },

  async stopBot(): Promise<DeploymentStatus> {
    await wait();
    return "offline";
  },

  async deleteBot(): Promise<DeploymentStatus> {
    await wait();
    return "suspended";
  },

  async syncBotStatus(current: DeploymentStatus): Promise<DeploymentStatus> {
    await wait(250);
    return current;
  },
};
