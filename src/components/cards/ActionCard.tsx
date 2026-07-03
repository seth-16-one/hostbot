import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type ActionCardProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

export default function ActionCard({ title, icon, color }: ActionCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Pressable style={styles.card}>
      <Ionicons name={icon} size={28} color={color} />

      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      flex: 1,

      backgroundColor: theme.colors.card,

      borderRadius: 18,

      borderWidth: 1,
      borderColor: theme.colors.border,

      padding: 20,

      alignItems: "center",

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 4,
      },

      elevation: 3,
    },

    title: {
      marginTop: 10,

      color: theme.colors.text,

      fontSize: 14,
      fontWeight: "700",
      textAlign: "center",
    },
  });
}
