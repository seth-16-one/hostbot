export type BotStatus = "active" | "maintenance" | "deprecated";

export interface BotDeploymentConfig {
  minCredits: number;
  hourlyUsage: number;
  defaultPrefix: string;
  sessionTtlSeconds: number;
}

export interface MarketplaceBot {
  id: number;
  icon: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  version: string;
  rating: number;
  featured: boolean;
  minimumCreditsRequired: number;
  runCreditsPerHour: number;
  status: BotStatus;
  totalDeployments: number;
  lastUpdated: string;
  features: string[];
  requirements: string[];
  deploymentConfig: BotDeploymentConfig;
}
