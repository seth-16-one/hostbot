export type DeploymentStatus =
  | "queued"
  | "creating_session"
  | "pairing"
  | "deploying"
  | "online"
  | "offline"
  | "failed"
  | "expired"
  | "suspended";

export interface PairingSession {
  id: string;
  deploymentId: string;
  pairCode: string;
  qrValue: string;
  expiresAt: string;
  createdAt: string;
}

export interface Deployment {
  id: string;
  botId: number;
  botName: string;
  ownerNumber: string;
  prefix: string;
  sessionName: string;
  status: DeploymentStatus;
  session?: PairingSession;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeploymentInput {
  botId: number;
  botName: string;
  ownerNumber: string;
  prefix: string;
  sessionName: string;
}
