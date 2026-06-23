import { create } from "zustand";

export type DeploymentStatus =
  | "queued"
  | "pairing"
  | "deploying"
  | "online"
  | "offline"
  | "failed";

export interface Deployment {
  id: string;
  botId: number;
  botName: string;
  ownerNumber: string;
  prefix: string;
  status: DeploymentStatus;
  createdAt: string;
}

interface DeploymentStore {
  deployments: Deployment[];

  addDeployment: (deployment: Deployment) => void;

  updateDeployment: (id: string, status: DeploymentStatus) => void;

  removeDeployment: (id: string) => void;
}

export const useDeploymentStore = create<DeploymentStore>((set) => ({
  deployments: [],

  addDeployment: (deployment) =>
    set((state) => ({
      deployments: [deployment, ...state.deployments],
    })),

  removeDeployment: (id) =>
    set((state) => ({
      deployments: state.deployments.filter(
        (deployment) => deployment.id !== id,
      ),
    })),

  updateDeployment: (id, status) =>
    set((state) => ({
      deployments: state.deployments.map((deployment) =>
        deployment.id === id
          ? {
              ...deployment,
              status,
            }
          : deployment,
      ),
    })),
}));
