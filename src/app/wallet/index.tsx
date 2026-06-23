import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button } from "@/components/ui";
import { COLORS } from "@/constants";
import { useWalletStore } from "@/store/wallet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function WalletScreen() {
  const { balance, transactions, refreshBalance, refreshTransactions } =
    useWalletStore();

  useEffect(() => {
    refreshBalance();
    refreshTransactions();
    const timer = setInterval(refreshBalance, 30000);
    return () => clearInterval(timer);
  }, [refreshBalance, refreshTransactions]);

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Wallet" subtitle="Credits and transactions" showBack />
        <View style={styles.balanceCard}>
          <Ionicons name="wallet-outline" size={30} color={COLORS.white} />
          <Text style={styles.balance}>{balance} Credits</Text>
          <Text style={styles.balanceSub}>Available balance</Text>
        </View>
        <Button title="Recharge Credits" onPress={() => router.push("/wallet/recharge" as any)} />
        <Button
          title="Transaction History"
          variant="outline"
          onPress={() => router.push("/wallet/history" as any)}
        />
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.slice(0, 5).map((item) => (
            <View key={item.id} style={styles.row}>
              <View>
                <Text style={styles.rowTitle}>{item.description}</Text>
                <Text style={styles.rowMeta}>{item.status} • {item.type}</Text>
              </View>
              <Text
                style={[
                  styles.amount,
                  { color: item.type === "debit" ? COLORS.danger : COLORS.success },
                ]}
              >
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
  balanceCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    margin: 16,
    padding: 22,
  },
  balance: { color: COLORS.white, fontSize: 30, fontWeight: "800", marginTop: 14 },
  balanceSub: { color: COLORS.headerSubtitle, marginTop: 4 },
  content: { padding: 16 },
  sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: "700", marginBottom: 12 },
  row: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowTitle: { color: COLORS.text, fontWeight: "700" },
  rowMeta: { color: COLORS.muted, marginTop: 4, textTransform: "capitalize" },
  amount: { fontWeight: "800" },
});
