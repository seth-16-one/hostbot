import type { ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "success";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  title: string;

  onPress?: () => void;

  loading?: boolean;

  disabled?: boolean;

  fullWidth?: boolean;

  variant?: ButtonVariant;

  size?: ButtonSize;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;
}
