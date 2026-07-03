import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type Props = {
  title: string;
  description: string;
  time: string;
  type: string;
  onPress?: () => void;
};

export default function ActivityCard({
  title,
  description,
  time,
  type,
  onPress,
}: Props) {
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
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>{description}</Text>

        <Text style={styles.time}>{time}</Text>
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

      borderRadius: 22,

      borderWidth: 1,
      borderColor: theme.colors.border,

      padding: 16,

      marginBottom: 14,

      flexDirection: "row",
      alignItems: "center",

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 5,
      },

      elevation: 4,
    },

    iconContainer: {
      width: 52,
      height: 52,

      borderRadius: 26,

      backgroundColor: theme.colors.surface,

      justifyContent: "center",
      alignItems: "center",

      marginRight: 14,
    },

    content: {
      flex: 1,
    },

    title: {
      color: theme.colors.text,

      fontSize: 16,
      fontWeight: "800",
    },

    description: {
      color: theme.colors.secondaryText,

      fontSize: 14,

      marginTop: 4,

      lineHeight: 20,
    },

    time: {
      color: theme.colors.muted,

      fontSize: 12,

      marginTop: 8,

      fontWeight: "600",
    },
  });
}
