import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
  const color =
    status === "online"
      ? "COLORS.primary"
      : status === "warning"
        ? COLORS.warning
        : COLORS.danger;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        <View style={[styles.statusDot, { backgroundColor: color }]} />

        <View>
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.uptime}>Uptime {uptime}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color="COLORS.tabInactive" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  uptime: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 13,
  },
});
