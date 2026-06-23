import { COLORS } from "@/constants";
import { StyleSheet, Text, View } from "react-native";

type BotInfoCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function BotInfoCard({ title, children }: BotInfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 18,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 14,
  },
});
