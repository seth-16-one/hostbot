import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { useWalletStore } from "@/store/wallet";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function WalletHistoryScreen() {
  const { transactions, refreshTransactions } = useWalletStore();

  useEffect(() => {
    refreshTransactions();
  }, [refreshTransactions]);

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Wallet History" subtitle="Credits, debits, refunds, and bonuses" showBack />
        <View style={styles.content}>
          {transactions.map((item) => (
            <View key={item.id} style={styles.card}>
              <View>
                <Text style={styles.title}>{item.description}</Text>
                <Text style={styles.meta}>{new Date(item.createdAt).toLocaleString()} • {item.status}</Text>
              </View>
              <Text style={[styles.amount, { color: item.type === "debit" ? COLORS.danger : COLORS.success }]}>
                {item.type === "debit" ? "-" : "+"}{item.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  title: { color: COLORS.text, fontWeight: "700" },
  meta: { color: COLORS.muted, marginTop: 4 },
  amount: { fontWeight: "800" },
});
