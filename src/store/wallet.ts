import {
  rechargePackages,
  walletService,
} from "@/services/wallet/wallet.service";
import type {
  RechargeRequest,
  RechargeSession,
  WalletTransaction,
} from "@/types/wallet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WalletStore {
  balance: number;
  transactions: WalletTransaction[];
  loading: boolean;
  error: string | null;

  packages: typeof rechargePackages;

  refreshBalance: () => Promise<void>;
  refreshTransactions: () => Promise<void>;

  createRecharge: (payload: RechargeRequest) => Promise<RechargeSession>;

  verifyPayment: (session: RechargeSession) => Promise<RechargeSession>;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      balance: 0,
      transactions: [],
      loading: false,
      error: null,

      packages: rechargePackages,

      refreshBalance: async () => {
        set({
          loading: true,
          error: null,
        });

        try {
          const response = await walletService.getBalance();

          set({
            balance: response.credits,
            loading: false,
          });
        } catch (error) {
          set({
            loading: false,
            error: (error as Error).message,
          });
        }
      },

      refreshTransactions: async () => {
        try {
          const transactions = await walletService.getTransactions();

          set({ transactions });
        } catch (error) {
          set({
            error: (error as Error).message,
          });
        }
      },

      createRecharge: async (payload) => {
        return walletService.createRecharge(payload);
      },

      verifyPayment: async (session) => {
        const verified = await walletService.verifyPayment(session);

        await get().refreshBalance();
        await get().refreshTransactions();

        return verified;
      },
    }),
    {
      name: "hostbot-wallet",

      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        balance: state.balance,
        transactions: state.transactions,
      }),
    },
  ),
);
