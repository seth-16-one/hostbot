import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/theme";

import { styles } from "./styles";
import type { StatusBannerProps } from "./types";

export default function StatusBanner({
  type = "info",
  title,
  message,
  icon,
  dismissible = false,
  onDismiss,
}: StatusBannerProps) {
  const { theme } = useTheme();

  const config = {
    success: {
      icon: "checkmark-circle",
      background: theme.colors.successBg,
      color: theme.colors.success,
    },

    warning: {
      icon: "warning",
      background: theme.colors.warningBg,
      color: theme.colors.warning,
    },

    error: {
      icon: "close-circle",
      background: theme.colors.dangerBg,
      color: theme.colors.danger,
    },

    info: {
      icon: "information-circle",
      background: theme.colors.infoBg,
      color: theme.colors.info,
    },
  }[type];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: config.background,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={(icon ?? config.icon) as any}
          size={24}
          color={config.color}
        />
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: config.color,
            },
          ]}
        >
          {title}
        </Text>

        {message ? (
          <Text
            style={[
              styles.message,
              {
                color: theme.colors.secondaryText,
              },
            ]}
          >
            {message}
          </Text>
        ) : null}
      </View>

      {dismissible && (
        <Pressable onPress={onDismiss} style={styles.closeButton}>
          <Ionicons name="close" size={20} color={theme.colors.muted} />
        </Pressable>
      )}
    </View>
  );
}
