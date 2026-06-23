import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  description?: string;
};

export default function EmptyState({
  icon = "cube-outline",
  title,
  subtitle,
  description,
}: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={COLORS.muted} />

      <Text style={styles.title}>{title}</Text>

      {(subtitle || description) && (
        <Text style={styles.subtitle}>{description || subtitle}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 16,
  },

  subtitle: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 8,
  },
});
