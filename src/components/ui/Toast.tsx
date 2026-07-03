import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

type ToastType = "success" | "error" | "warning" | "info";

type Props = {
  visible: boolean;
  type?: ToastType;
  title: string;
  message: string;
  duration?: number;
  onHide: () => void;
};

export default function Toast({
  visible,
  type = "success",
  title,
  message,
  duration = 3000,
  onHide,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const translateY = useRef(new Animated.Value(-150)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.sequence([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }),

      Animated.delay(duration),

      Animated.timing(translateY, {
        toValue: -150,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(onHide);
  }, [visible]);

  if (!visible) return null;

  const tone = {
    success: {
      icon: "checkmark-circle",
      color: theme.colors.success,
      background: theme.colors.successLight,
    },
    error: {
      icon: "close-circle",
      color: theme.colors.danger,
      background: theme.colors.dangerLight,
    },
    warning: {
      icon: "warning",
      color: theme.colors.warning,
      background: theme.colors.warningLight,
    },
    info: {
      icon: "information-circle",
      color: theme.colors.info,
      background: theme.colors.infoLight,
    },
  } as const;

  const item = tone[type];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          transform: [{ translateY }],
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: item.background,
          },
        ]}
      >
        <Ionicons name={item.icon as any} size={22} color={item.color} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      position: "absolute",

      top: 60,
      left: 20,
      right: 20,

      zIndex: 9999,

      flexDirection: "row",
      alignItems: "center",

      borderRadius: 18,

      padding: 16,

      borderWidth: 1,
      borderColor: theme.colors.border,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.12,
      shadowRadius: 12,
      shadowOffset: {
        width: 0,
        height: 6,
      },

      elevation: 8,
    },

    iconContainer: {
      width: 46,
      height: 46,

      borderRadius: 14,

      justifyContent: "center",
      alignItems: "center",

      marginRight: 14,
    },

    content: {
      flex: 1,
    },

    title: {
      color: theme.colors.text,

      fontSize: 15,
      fontWeight: "800",
    },

    message: {
      marginTop: 3,

      color: theme.colors.secondaryText,

      fontSize: 13,
      lineHeight: 20,
    },
  });
}
