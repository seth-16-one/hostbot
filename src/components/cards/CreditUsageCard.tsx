import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type Props = {
  requiredCredits: number;
  availableCredits: number;
  hourlyUsage: number;
};

export default function CreditUsageCard({
  requiredCredits,
  availableCredits,
  hourlyUsage,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const enoughCredits = availableCredits >= requiredCredits;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Deployment Requirements</Text>

      <Text style={styles.item}>Required Credits: {requiredCredits}</Text>

      <Text style={styles.item}>Available Credits: {availableCredits}</Text>

      <Text style={styles.item}>Estimated Usage: {hourlyUsage} Credits/hr</Text>

      <View
        style={[
          styles.statusBadge,
          enoughCredits ? styles.successBadge : styles.dangerBadge,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            {
              color: enoughCredits ? theme.colors.success : theme.colors.danger,
            },
          ]}
        >
          {enoughCredits ? "✓ Ready To Deploy" : "⚠ Not Enough Credits"}
        </Text>
      </View>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,

      margin: 16,

      padding: 20,

      borderRadius: 22,

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

    title: {
      color: theme.colors.text,

      fontSize: 17,
      fontWeight: "800",

      marginBottom: 16,
    },

    item: {
      color: theme.colors.secondaryText,

      fontSize: 14,

      marginBottom: 10,

      lineHeight: 20,
    },

    statusBadge: {
      marginTop: 14,

      paddingVertical: 10,
      paddingHorizontal: 14,

      borderRadius: 14,

      alignSelf: "flex-start",
    },

    successBadge: {
      backgroundColor: theme.colors.successLight,
    },

    dangerBadge: {
      backgroundColor: theme.colors.dangerLight,
    },

    statusText: {
      fontWeight: "800",
      fontSize: 14,
    },
  });
}
