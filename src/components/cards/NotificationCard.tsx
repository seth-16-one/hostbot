import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  id: string;
  title: string;
  message: string;
  type: string;
};

export default function NotificationCard({ id, title, message, type }: Props) {
  const icon =
    type === "success"
      ? "checkmark-circle"
      : type === "warning"
        ? "warning"
        : "information-circle";

  const color =
    type === "success"
      ? COLORS.success
      : type === "warning"
        ? COLORS.warning
        : COLORS.info;

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/notifications/[id]",
          params: { id },
        })
      }
    >
      <Ionicons name={icon as any} size={24} color={color} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.message}>{message}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="COLORS.tabInactive" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 2,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },

  message: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 13,
  },
});
