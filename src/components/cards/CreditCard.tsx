import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type CreditsCardProps = {
  credits: number;
};

export default function CreditsCard({ credits }: CreditsCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Ionicons
            name="wallet-outline"
            size={26}
            color={theme.colors.success}
          />
        </View>

        <View>
          <Text style={styles.label}>Credits Balance</Text>

          <Text style={styles.value}>{credits}</Text>

          <Text style={styles.subText}>Available Credits</Text>
        </View>
      </View>

      <Pressable style={styles.button}>
        <Ionicons
          name="add-circle-outline"
          size={18}
          color={theme.colors.success}
        />

        <Text style={styles.buttonText}>Recharge</Text>
      </Pressable>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.primary,

      borderRadius: 22,

      padding: 18,

      marginTop: 10,

      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      shadowColor: theme.colors.primary,
      shadowOpacity: 0.25,
      shadowRadius: 15,
      shadowOffset: {
        width: 0,
        height: 6,
      },

      elevation: 8,
    },

    left: {
      flexDirection: "row",
      alignItems: "center",
    },

    iconBox: {
      width: 55,
      height: 55,

      borderRadius: 18,

      backgroundColor: theme.colors.card,

      justifyContent: "center",
      alignItems: "center",

      marginRight: 12,
    },

    label: {
      color: theme.colors.white,
      fontSize: 13,
      fontWeight: "600",
    },

    value: {
      color: theme.colors.white,
      fontSize: 30,
      fontWeight: "800",
    },

    subText: {
      color: "rgba(255,255,255,0.80)",
      fontSize: 12,
      marginTop: 2,
    },

    button: {
      flexDirection: "row",
      alignItems: "center",

      gap: 6,

      backgroundColor: theme.colors.card,

      paddingHorizontal: 14,
      paddingVertical: 10,

      borderRadius: 14,
    },

    buttonText: {
      color: theme.colors.success,
      fontWeight: "700",
      fontSize: 14,
    },
  });
}
