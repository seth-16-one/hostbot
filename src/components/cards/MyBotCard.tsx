import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type MyBotCardProps = {
  id: string;
  icon: string;
  name: string;
  platform: string;
  status: string;
  messages?: number;
  onPress?: () => void;
};

export default function MyBotCard({
  icon,
  name,
  platform,
  status,
  messages,
  onPress,
}: MyBotCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const isOnline = status === "Online";

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Ionicons name={icon as any} size={22} color={theme.colors.success} />
        </View>

        <View>
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.platform}>{platform}</Text>

          <Text style={isOnline ? styles.online : styles.offline}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        {messages && <Text style={styles.messages}>{messages}</Text>}

        <Ionicons
          name={isOnline ? "checkmark-circle" : "close-circle"}
          size={26}
          color={isOnline ? theme.colors.primary : theme.colors.danger}
        />
      </View>
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

    iconBox: {
      width: 52,
      height: 52,

      borderRadius: 16,

      backgroundColor: theme.colors.successLight,

      justifyContent: "center",
      alignItems: "center",

      marginRight: 14,
    },

    name: {
      fontSize: 15,

      fontWeight: "800",

      color: theme.colors.text,
    },

    platform: {
      marginTop: 3,

      fontSize: 12,

      color: theme.colors.muted,
    },

    online: {
      marginTop: 5,

      color: theme.colors.success,

      fontWeight: "700",

      fontSize: 12,
    },

    offline: {
      marginTop: 5,

      color: theme.colors.danger,

      fontWeight: "700",

      fontSize: 12,
    },

    right: {
      alignItems: "flex-end",
    },

    messages: {
      marginBottom: 6,

      color: theme.colors.muted,

      fontSize: 12,

      fontWeight: "600",
    },
  });
}
