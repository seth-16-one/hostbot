import { COLORS } from "@/constants";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  requiredCredits: number;
  availableCredits: number;
  hourlyUsage: number;
};

export default function CreditUsageCard({
  requiredCredits,
  availableCredits,
  hourlyUsage,
}: Props) {
  const enoughCredits = availableCredits >= requiredCredits;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Deployment Requirements</Text>

      <Text style={styles.item}>Required Credits: {requiredCredits}</Text>

      <Text style={styles.item}>Available Credits: {availableCredits}</Text>

      <Text style={styles.item}>Estimated Usage: {hourlyUsage} Credits/hr</Text>

      <Text
        style={[
          styles.status,
          {
            color: enoughCredits ? COLORS.primary : COLORS.danger,
          },
        ]}
      >
        {enoughCredits ? "✓ Ready To Deploy" : "⚠ Not Enough Credits"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    margin: 16,
    padding: 18,
    borderRadius: 18,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  item: {
    marginBottom: 8,
    color: COLORS.subtitleText,
  },

  status: {
    marginTop: 12,
    fontWeight: "700",
  },
});
