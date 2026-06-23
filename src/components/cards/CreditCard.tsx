import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CreditsCardProps = {
  credits: number;
};

export default function CreditsCard({ credits }: CreditsCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Ionicons name="wallet-outline" size={26} color="COLORS.success" />
        </View>

        <View>
          <Text style={styles.label}>Credits Balance</Text>

          <Text style={styles.value}>{credits}</Text>

          <Text style={styles.subText}>Available Credits</Text>
        </View>
      </View>

      <Pressable style={styles.button}>
        <Ionicons name="add-circle-outline" size={18} color="COLORS.success" />

        <Text style={styles.buttonText}>Recharge</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    padding: 18,
    marginTop: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: COLORS.primary,
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: COLORS.white,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  label: {
    color: COLORS.white,
    fontSize: 13,
  },

  value: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "700",
  },

  subText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,

    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 10,

    borderRadius: 14,
  },

  buttonText: {
    color: COLORS.success,
    fontWeight: "700",
  },
});
