import type { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type StatusTone = "success" | "warning" | "error" | "info";

export type IconName = ComponentProps<typeof Ionicons>["name"];

export interface StatusBannerProps {
  type?: StatusTone;

  title: string;

  message?: string;

  icon?: IconName;

  dismissible?: boolean;

  onDismiss?: () => void;
}
