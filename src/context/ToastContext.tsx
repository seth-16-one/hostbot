import { createContext, useContext } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export type ToastData = {
  title: string;
  message: string;
  type?: ToastType;
};

type ToastContextType = {
  showToast: (toast: ToastData) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
};
