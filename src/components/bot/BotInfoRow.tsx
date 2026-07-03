import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type BotInfoRowProps = {
  label: string;
  value: string;
};

export default function BotInfoRow({ label, value }: BotInfoRowProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      paddingVertical: 12,

      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },

    label: {
      color: theme.colors.muted,

      fontSize: 14,

      fontWeight: "500",
    },

    value: {
      color: theme.colors.text,

      fontSize: 14,

      fontWeight: "700",
    },
  });
}
