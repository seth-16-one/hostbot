export type WalletTransactionType = "credit" | "debit" | "refund" | "bonus";
export type WalletTransactionStatus = "pending" | "completed" | "failed";
export type PaymentMethod = "mpesa" | "card" | "paypal";

export interface WalletSettings {
  minimumRecharge: number;
  creditRate: number;
}

export interface WalletBalance {
  credits: number;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  type: WalletTransactionType;
  status: WalletTransactionStatus;
  amount: number;
  description: string;
  reference: string;
  createdAt: string;
}

export interface RechargePackage {
  id: string;
  title: string;
  credits: number;
  price: number;
  currency: "KES" | "USD";
  bonusCredits?: number;
  featured?: boolean;
  badge?: string;
}

export interface RechargeRequest {
  packageId?: string;
  amount?: number;
  method: PaymentMethod;
  phoneNumber?: string;
  promoCode?: string;
}

export interface RechargeSession {
  id: string;
  status: WalletTransactionStatus;
  amount: number;
  credits: number;
  paymentMethod: PaymentMethod;
  checkoutUrl?: string;
  createdAt: string;
}
