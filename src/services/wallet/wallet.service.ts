import { apiClient } from "@/services/api/client";
import type {
  PaymentMethod,
  RechargePackage,
  RechargeSession,
  WalletBalance,
  WalletTransaction,
} from "@/types/wallet";

export const rechargePackages: RechargePackage[] = [
  { id: "starter", credits: 100, price: 150, currency: "KES" },
  { id: "growth", credits: 500, price: 650, currency: "KES", bonusCredits: 50 },
  { id: "scale", credits: 1200, price: 1400, currency: "KES", bonusCredits: 200 },
];

export const walletService = {
  async getBalance(): Promise<WalletBalance> {
    const response = await apiClient.get<WalletBalance>("/wallet/balance");
    return response.data;
  },

  async getTransactions(): Promise<WalletTransaction[]> {
    const response =
      await apiClient.get<WalletTransaction[]>("/wallet/transactions");
    return response.data;
  },

  async getPackages(): Promise<RechargePackage[]> {
    const response =
      await apiClient.get<RechargePackage[]>("/wallet/packages");
    return response.data;
  },

  async createRecharge(
    packageId: string,
    method: PaymentMethod,
  ): Promise<RechargeSession> {
    const response = await apiClient.post<RechargeSession>("/wallet/recharge", {
      packageId,
      method,
    });
    return response.data;
  },

  async verifyPayment(session: RechargeSession): Promise<RechargeSession> {
    const response = await apiClient.post<RechargeSession>(
      `/wallet/recharge/${session.id}/verify`,
    );
    return response.data;
  },
};
