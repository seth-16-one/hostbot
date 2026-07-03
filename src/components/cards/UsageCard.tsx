import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type Props = {
  title: string;
  value: string;
  icon: any;
  color: string;
};

export default function UsageCard({ title, value, icon, color }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: `${color}20`,
          },
        ]}
      >
        <Ionicons name={icon} size={24} color={color} />
      </View>

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      flex: 1,

      backgroundColor: theme.colors.card,

      padding: 18,

      borderRadius: 20,

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

    iconContainer: {
      width: 48,
      height: 48,

      borderRadius: 24,

      justifyContent: "center",
      alignItems: "center",

      marginBottom: 12,
    },

    value: {
      fontSize: 24,
      fontWeight: "800",

      color: theme.colors.text,
    },

    title: {
      marginTop: 6,

      fontSize: 13,

      color: theme.colors.muted,
    },
  });
}
