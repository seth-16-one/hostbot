import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type Props = {
  name: string;
  uptime: string;
  status: string;
  onPress?: () => void;
};

export default function ServerStatusCard({
  name,
  uptime,
  status,
  onPress,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const color =
    status === "online"
      ? theme.colors.success
      : status === "warning"
        ? theme.colors.warning
        : theme.colors.danger;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        <View style={[styles.statusDot, { backgroundColor: color }]} />

        <View>
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.uptime}>Uptime {uptime}</Text>
        </View>
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

      padding: 18,

      marginBottom: 14,

      flexDirection: "row",
      justifyContent: "space-between",
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

    left: {
      flexDirection: "row",
      alignItems: "center",
    },

    statusDot: {
      width: 12,
      height: 12,

      borderRadius: 6,

      marginRight: 16,
    },

    name: {
      fontSize: 16,
      fontWeight: "800",

      color: theme.colors.text,
    },

    uptime: {
      marginTop: 4,

      fontSize: 13,

      color: theme.colors.muted,
    },
  });
}
