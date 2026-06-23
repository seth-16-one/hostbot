import type {
  PaymentMethod,
  RechargePackage,
  RechargeSession,
  WalletBalance,
  WalletTransaction,
} from "@/types/wallet";

const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const rechargePackages: RechargePackage[] = [
  { id: "starter", credits: 100, price: 150, currency: "KES" },
  { id: "growth", credits: 500, price: 650, currency: "KES", bonusCredits: 50 },
  { id: "scale", credits: 1200, price: 1400, currency: "KES", bonusCredits: 200 },
];

let balance = 450;

let transactions: WalletTransaction[] = [
  {
    id: "txn_seed_credit",
    type: "credit",
    status: "completed",
    amount: 500,
    description: "Initial credit purchase",
    reference: "MPESA-SEED",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "txn_seed_debit",
    type: "debit",
    status: "completed",
    amount: 50,
    description: "SethBot-MD runtime",
    reference: "BOT-RUN-001",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const walletService = {
  async getBalance(): Promise<WalletBalance> {
    await wait();
    return { credits: balance, updatedAt: new Date().toISOString() };
  },

  async getTransactions(): Promise<WalletTransaction[]> {
    await wait();
    return transactions;
  },

  async createRecharge(
    packageId: string,
    method: PaymentMethod,
  ): Promise<RechargeSession> {
    await wait(500);
    const selected = rechargePackages.find((item) => item.id === packageId);

    if (!selected) {
      throw new Error("Recharge package not found");
    }

    return {
      id: `rch_${Date.now()}`,
      status: "pending",
      amount: selected.price,
      credits: selected.credits + (selected.bonusCredits ?? 0),
      paymentMethod: method,
      createdAt: new Date().toISOString(),
    };
  },

  async verifyPayment(session: RechargeSession): Promise<RechargeSession> {
    await wait(900);
    balance += session.credits;

    transactions = [
      {
        id: `txn_${session.id}`,
        type: "credit",
        status: "completed",
        amount: session.credits,
        description: "Wallet recharge",
        reference: session.id,
        createdAt: new Date().toISOString(),
      },
      ...transactions,
    ];

    return { ...session, status: "completed" };
  },
};
