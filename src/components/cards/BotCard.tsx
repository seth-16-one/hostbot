import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type BotCardProps = {
  name: string;
  platform: string;
  status: string;
};

export default function BotCard({ name, platform, status }: BotCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const isRunning = status === "Running";

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <View style={styles.iconBox}>
            <Ionicons
              name="hardware-chip-outline"
              size={24}
              color={theme.colors.primary}
            />
          </View>

          <View>
            <Text style={styles.name}>{name}</Text>

            <Text style={styles.platform}>{platform}</Text>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: isRunning
                ? theme.colors.successLight
                : theme.colors.dangerLight,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: isRunning ? theme.colors.success : theme.colors.danger,
              },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>Logs</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>Restart</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,

      borderRadius: 22,

      borderWidth: 1,
      borderColor: theme.colors.border,

      padding: 18,

      marginBottom: 14,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 5,
      },

      elevation: 4,
    },

    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    left: {
      flexDirection: "row",
      alignItems: "center",
    },

    iconBox: {
      width: 48,
      height: 48,

      borderRadius: 14,

      backgroundColor: theme.colors.successLight,

      justifyContent: "center",
      alignItems: "center",

      marginRight: 14,
    },

    name: {
      color: theme.colors.text,

      fontSize: 16,
      fontWeight: "800",
    },

    platform: {
      marginTop: 3,

      color: theme.colors.secondaryText,

      fontSize: 13,
    },

    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 12,
    },

    statusText: {
      fontWeight: "700",
      fontSize: 13,
    },

    actions: {
      flexDirection: "row",
      gap: 10,

      marginTop: 18,
    },

    actionButton: {
      backgroundColor: theme.colors.surface,

      borderRadius: 12,

      borderWidth: 1,
      borderColor: theme.colors.border,

      paddingHorizontal: 14,
      paddingVertical: 10,
    },

    actionText: {
      color: theme.colors.text,
      fontWeight: "700",
      fontSize: 13,
    },
  });
}
