import type { TextInputProps } from "react-native";

import type { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type IconName = ComponentProps<typeof Ionicons>["name"];

export interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;

  error?: string;

  success?: string;

  leftIcon?: IconName;

  rightIcon?: IconName;

  loading?: boolean;

  containerStyle?: object;

  inputStyle?: object;

  required?: boolean;
}
