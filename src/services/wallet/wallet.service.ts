import { apiClient } from "@/services/api/client";
import type {
  RechargePackage,
  RechargeRequest,
  RechargeSession,
  WalletBalance,
  WalletTransaction,
} from "@/types/wallet";

export const walletSettings = {
  minimumRecharge: 100,
  creditRate: 1,
};

export const rechargePackages: RechargePackage[] = [
  {
    id: "starter",
    title: "Starter",
    credits: 100,
    price: 150,
    currency: "KES",
    bonusCredits: 10,
    badge: "Starter",
  },
  {
    id: "growth",
    title: "Growth",
    credits: 500,
    price: 650,
    currency: "KES",
    bonusCredits: 75,
    featured: true,
    badge: "Most Popular",
  },
  {
    id: "scale",
    title: "Scale",
    credits: 1200,
    price: 1400,
    currency: "KES",
    bonusCredits: 200,
    badge: "Best Value",
  },
];

export const walletService = {
  async getWallet() {
    const response = await apiClient.get<{
      success: boolean;
      wallet: {
        id: string;
        userId: string;
        credits: number;
        createdAt: string;
        updatedAt: string;
      };
    }>("/wallet");

    return response.data.wallet;
  },

  async getBalance(): Promise<WalletBalance> {
    const wallet = await this.getWallet();

    return {
      credits: wallet.credits,
      updatedAt: wallet.updatedAt,
    };
  },

  async getTransactions(): Promise<WalletTransaction[]> {
    const response = await apiClient.get<WalletTransaction[]>(
      "/wallet/transactions",
    );
    return response.data;
  },

  async getPackages(): Promise<RechargePackage[]> {
    const response = await apiClient.get<RechargePackage[]>("/wallet/packages");
    return response.data;
  },

  async createRecharge(payload: RechargeRequest): Promise<RechargeSession> {
    const response = await apiClient.post<RechargeSession>(
      "/wallet/recharge",
      payload,
    );

    return response.data;
  },

  async verifyPayment(session: RechargeSession): Promise<RechargeSession> {
    const response = await apiClient.post<RechargeSession>(
      `/wallet/recharge/${session.id}/verify`,
    );
    return response.data;
  },
};
