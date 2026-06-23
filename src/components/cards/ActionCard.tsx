import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

type ActionCardProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

export default function ActionCard({ title, icon, color }: ActionCardProps) {
  return (
    <Pressable style={styles.card}>
      <Ionicons name={icon} size={28} color={color} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "COLORS.card",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },

  title: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: "600",
  },
});
