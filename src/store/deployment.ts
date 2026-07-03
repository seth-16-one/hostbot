import { deploymentService } from "@/services/bots/deployment.service";
import type {
  CreateDeploymentInput,
  Deployment,
  DeploymentStatus,
  PairingSession,
} from "@/types/deployment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DeploymentStore {
  deployments: Deployment[];
  activeDeploymentId: string | null;
  loading: boolean;
  error: string | null;
  loadDeployments: () => Promise<void>;
  fetchDeployment: (deploymentId: string) => Promise<Deployment>;
  createDeployment: (input: CreateDeploymentInput) => Promise<Deployment>;
  generateSession: (deploymentId: string) => Promise<PairingSession>;
  refreshSession: (deploymentId: string) => Promise<PairingSession>;
  pollPairingSession: (deploymentId: string) => Promise<PairingSession | null>;
  pairBot: (deploymentId: string) => Promise<void>;
  deployBot: (deploymentId: string) => Promise<void>;
  restartBot: (deploymentId: string) => Promise<void>;
  stopBot: (deploymentId: string) => Promise<void>;
  deleteBot: (deploymentId: string) => Promise<void>;
  syncBotStatus: (deploymentId: string) => Promise<void>;
  updateDeployment: (
    id: string,
    status: DeploymentStatus,
    patch?: Partial<Deployment>,
  ) => void;
  removeDeployment: (id: string) => void;
}

const patchDeployment = (
  deployments: Deployment[],
  id: string,
  patch: Partial<Deployment>,
) =>
  deployments.map((deployment) =>
    deployment.id === id
      ? { ...deployment, ...patch, updatedAt: new Date().toISOString() }
      : deployment,
  );

export const useDeploymentStore = create<DeploymentStore>()(
  persist(
    (set, get) => ({
      deployments: [],
      activeDeploymentId: null,
      loading: false,
      error: null,

      loadDeployments: async () => {
        set({ loading: true, error: null });
        try {
          const deployments = await deploymentService.getDeployments();
          set({ deployments, loading: false });
        } catch (error) {
          set({ loading: false, error: (error as Error).message });
          throw error;
        }
      },

      fetchDeployment: async (deploymentId) => {
        const deployment = await deploymentService.getDeployment(deploymentId);
        set((state) => ({
          deployments: state.deployments.some((item) => item.id === deployment.id)
            ? patchDeployment(state.deployments, deployment.id, deployment)
            : [deployment, ...state.deployments],
          activeDeploymentId: deployment.id,
        }));
        return deployment;
      },

      createDeployment: async (input) => {
        set({ loading: true, error: null });
        try {
          const deployment = await deploymentService.createDeployment(input);
          set((state) => ({
            deployments: [deployment, ...state.deployments],
            activeDeploymentId: deployment.id,
            loading: false,
          }));
          return deployment;
        } catch (error) {
          set({ loading: false, error: (error as Error).message });
          throw error;
        }
      },

      generateSession: async (deploymentId) => {
        const deployment = get().deployments.find((item) => item.id === deploymentId);
        if (!deployment) {
          throw new Error("Deployment not found");
        }

        get().updateDeployment(deploymentId, "creating_session");
        const session = await deploymentService.generateSession(deployment);
        get().updateDeployment(deploymentId, "pairing", { session });
        return session;
      },

      refreshSession: async (deploymentId) => {
        get().updateDeployment(deploymentId, "creating_session");
        const session = await deploymentService.refreshSession(deploymentId);
        get().updateDeployment(deploymentId, "pairing", { session });
        return session;
      },

      pollPairingSession: async (deploymentId) => {
        const deployment = get().deployments.find((item) => item.id === deploymentId);
        const sessionId = deployment?.session?.id;
        if (!deployment || !sessionId) return null;

        const session = await deploymentService.getPairingSession(sessionId);
        const nextStatus =
          session.status === "connected"
            ? "online"
            : session.status === "expired"
              ? "expired"
              : session.status === "closed"
                ? "offline"
                : "pairing";

        get().updateDeployment(deploymentId, nextStatus, { session });
        return session;
      },

      pairBot: async (deploymentId) => {
        const status = await deploymentService.pairBot(deploymentId);
        get().updateDeployment(deploymentId, status);
      },

      deployBot: async (deploymentId) => {
        get().updateDeployment(deploymentId, "deploying");
        const status = await deploymentService.deployBot(deploymentId);
        get().updateDeployment(deploymentId, status);
      },

      restartBot: async (deploymentId) => {
        const status = await deploymentService.restartBot(deploymentId);
        get().updateDeployment(deploymentId, status);
      },

      stopBot: async (deploymentId) => {
        const status = await deploymentService.stopBot(deploymentId);
        get().updateDeployment(deploymentId, status);
      },

      deleteBot: async (deploymentId) => {
        const status = await deploymentService.deleteBot(deploymentId);
        if (status === "deleted") {
          get().removeDeployment(deploymentId);
          return;
        }
        get().updateDeployment(deploymentId, status);
      },

      syncBotStatus: async (deploymentId) => {
        const deployment = get().deployments.find((item) => item.id === deploymentId);
        if (!deployment) {
          return;
        }

        const latest = await deploymentService.syncBotStatus(deploymentId);
        get().updateDeployment(deploymentId, latest.status, latest);
      },

      updateDeployment: (id, status, patch) =>
        set((state) => ({
          deployments: patchDeployment(state.deployments, id, {
            ...patch,
            status,
          }),
        })),

      removeDeployment: (id) =>
        set((state) => ({
          deployments: state.deployments.filter((item) => item.id !== id),
          activeDeploymentId:
            state.activeDeploymentId === id ? null : state.activeDeploymentId,
        })),
    }),
    {
      name: "hostbot-deployments",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        deployments: state.deployments,
        activeDeploymentId: state.activeDeploymentId,
      }),
    },
  ),
);
