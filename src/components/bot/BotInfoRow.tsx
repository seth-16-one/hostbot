import { COLORS } from "@/constants";
import { StyleSheet, Text, View } from "react-native";

type BotInfoRowProps = {
  label: string;
  value: string;
};

export default function BotInfoRow({ label, value }: BotInfoRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  label: {
    color: COLORS.muted,
    fontSize: 14,
  },

  value: {
    color: COLORS.text,
    fontWeight: "600",
  },
});
