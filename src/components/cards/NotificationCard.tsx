import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type Props = {
  id: string;
  title: string;
  message: string;
  type: string;
};

export default function NotificationCard({ id, title, message, type }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const icon =
    type === "success"
      ? "checkmark-circle"
      : type === "warning"
        ? "warning"
        : "information-circle";

  const color =
    type === "success"
      ? theme.colors.success
      : type === "warning"
        ? theme.colors.warning
        : theme.colors.info;

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/notifications/[id]",
          params: { id },
        })
      }
    >
      <View style={styles.iconBox}>
        <Ionicons name={icon as any} size={22} color={color} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.message}>{message}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={theme.colors.iconLight}
      />
    </Pressable>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,

      borderRadius: 20,

      padding: 16,

      marginBottom: 14,

      flexDirection: "row",
      alignItems: "center",

      borderWidth: 1,
      borderColor: theme.colors.border,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 5,
      },

      elevation: 4,
    },

    iconBox: {
      width: 46,
      height: 46,

      borderRadius: 14,

      backgroundColor: theme.colors.surface,

      justifyContent: "center",
      alignItems: "center",

      marginRight: 14,
    },

    textContainer: {
      flex: 1,
    },

    title: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.colors.text,
    },

    message: {
      marginTop: 5,
      fontSize: 13,
      lineHeight: 19,
      color: theme.colors.muted,
    },
  });
}
