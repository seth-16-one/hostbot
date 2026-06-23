import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  description: string;
  time: string;
  type: string;
  onPress?: () => void;
};

export default function ActivityCard({
  title,
  description,
  time,
  type,
  onPress,
}: Props) {
  const icon =
    type === "success"
      ? "checkmark-circle"
      : type === "warning"
        ? "warning"
        : "information-circle";

  const color =
    type === "success"
      ? "COLORS.primary"
      : type === "warning"
        ? COLORS.warning
        : COLORS.info;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={22} color={color} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>{description}</Text>

        <Text style={styles.time}>{time}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="COLORS.tabInactive" />
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
    alignItems: "center",
    elevation: 2,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },

  description: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 4,
    lineHeight: 20,
  },

  time: {
    fontSize: 12,
    color: "COLORS.tabInactive",
    marginTop: 8,
  },
});
