import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type MyBotCardProps = {
  id: number;
  icon: string;
  name: string;
  platform: string;
  status: string;
  messages?: string;
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
  const isOnline = status === "Online";

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Ionicons name={icon as any} size={22} color="COLORS.success" />
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
          color={isOnline ? "COLORS.primary" : COLORS.danger}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,

    backgroundColor: "COLORS.successBg",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },

  platform: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 3,
  },

  online: {
    color: COLORS.primary,
    fontWeight: "600",
    marginTop: 4,
  },

  offline: {
    color: COLORS.danger,
    fontWeight: "600",
    marginTop: 4,
  },

  right: {
    alignItems: "flex-end",
  },

  messages: {
    color: COLORS.muted,
    fontSize: 12,
    marginBottom: 6,
  },
});
