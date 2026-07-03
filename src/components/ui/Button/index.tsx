import { ActivityIndicator, Pressable, Text } from "react-native";

import { useTheme } from "@/theme";

import { styles } from "./styles";
import type { ButtonProps } from "./types";

export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  fullWidth = true,
  variant = "primary",
  size = "medium",
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const { theme } = useTheme();

  const backgroundColor =
    variant === "primary"
      ? theme.colors.primary
      : variant === "secondary"
        ? theme.colors.surface
        : variant === "danger"
          ? theme.colors.danger
          : variant === "success"
            ? theme.colors.success
            : variant === "ghost"
              ? "transparent"
              : "transparent";

  const borderColor =
    variant === "outline"
      ? theme.colors.primary
      : variant === "ghost"
        ? "transparent"
        : backgroundColor;

  const textColor =
    variant === "outline" || variant === "ghost"
      ? theme.colors.primary
      : variant === "secondary"
        ? theme.colors.text
        : theme.colors.white;

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,

        styles[size],

        fullWidth && styles.fullWidth,

        variant === "outline" && styles.outline,

        {
          backgroundColor,
          borderColor,
        },

        disabled && styles.disabled,

        pressed && [
          styles.pressed,
          variant === "primary" && {
            backgroundColor: theme.colors.primaryDark,
          },
        ],
      ]}
    >
      {loading ? (
        <>
          <ActivityIndicator
            size="small"
            color={textColor}
            style={{ marginRight: 8 }}
          />

          <Text
            style={[
              styles.text,
              {
                color: textColor,
              },
            ]}
          >
            Please wait...
          </Text>
        </>
      ) : (
        <>
          {leftIcon}

          <Text
            style={[
              styles.text,
              {
                color: textColor,
              },
            ]}
          >
            {title}
          </Text>

          {rightIcon}
        </>
      )}
    </Pressable>
  );
}
