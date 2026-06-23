import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  value: string;
  icon: any;
  color: string;
};

export default function UsageCard({ title, value, icon, color }: Props) {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: `${color}20`,
          },
        ]}
      >
        <Ionicons name={icon} size={24} color={color} />
      </View>

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 18,
    elevation: 2,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  value: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },

  title: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.muted,
  },
});
