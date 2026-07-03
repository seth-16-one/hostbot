import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button } from "@/components/ui";
import { COLORS } from "@/constants";
import { useWalletStore } from "@/store/wallet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WalletScreen() {
  const { balance, transactions, refreshBalance, refreshTransactions } =
    useWalletStore();

  useEffect(() => {
    refreshBalance();
    refreshTransactions();

    const timer = setInterval(refreshBalance, 30000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader title="Wallet" subtitle="Manage your credits" showBack />

        <View style={styles.balanceCard}>
          <Ionicons name="wallet-outline" size={42} color={COLORS.white} />

          <Text style={styles.balanceLabel}>Available Credits</Text>

          <Text style={styles.balance}>{balance.toLocaleString()}</Text>

          <Text style={styles.balanceSub}>
            Used for bot deployment and hosting
          </Text>
        </View>

        <View style={styles.actionRow}>
          <View style={styles.action}>
            <Button
              title="Recharge"
              onPress={() => router.push("/wallet/recharge" as any)}
            />
          </View>

          <View style={styles.action}>
            <Button
              title="History"
              variant="outline"
              onPress={() => router.push("/wallet/history" as any)}
            />
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="swap-horizontal" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{transactions.length}</Text>
            <Text style={styles.statTitle}>Transactions</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="server-outline" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>
              {balance > 0 ? "Active" : "Empty"}
            </Text>
            <Text style={styles.statTitle}>Wallet Status</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>

            <TouchableOpacity
              onPress={() => router.push("/wallet/history" as any)}
            >
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {transactions.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="receipt-outline" size={48} color={COLORS.muted} />

              <Text style={styles.emptyTitle}>No Transactions</Text>

              <Text style={styles.emptyText}>
                Recharge your wallet to begin using credits.
              </Text>
            </View>
          ) : (
            transactions.slice(0, 5).map((item) => (
              <View key={item.id} style={styles.row}>
                <View style={styles.rowLeft}>
                  <View style={styles.iconCircle}>
                    <Ionicons
                      name={item.type === "debit" ? "arrow-up" : "arrow-down"}
                      size={18}
                      color={
                        item.type === "debit" ? COLORS.danger : COLORS.success
                      }
                    />
                  </View>

                  <View>
                    <Text style={styles.rowTitle}>{item.description}</Text>

                    <Text style={styles.rowMeta}>
                      {item.status} • {item.type}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.amount,
                    {
                      color:
                        item.type === "debit" ? COLORS.danger : COLORS.success,
                    },
                  ]}
                >
                  {item.type === "debit" ? "-" : "+"}
                  {item.amount}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  balanceCard: {
    margin: 16,
    padding: 24,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },

  balanceLabel: {
    color: COLORS.white,
    marginTop: 12,
    opacity: 0.9,
  },

  balance: {
    color: COLORS.white,
    fontSize: 36,
    fontWeight: "800",
    marginTop: 8,
  },

  balanceSub: {
    color: COLORS.headerSubtitle,
    marginTop: 6,
  },

  actionRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
  },

  action: {
    flex: 1,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 18,
  },

  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
  },

  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 8,
  },

  statTitle: {
    color: COLORS.muted,
    marginTop: 4,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  viewAll: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  empty: {
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 18,
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  emptyText: {
    marginTop: 6,
    textAlign: "center",
    color: COLORS.muted,
  },

  row: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  rowTitle: {
    color: COLORS.text,
    fontWeight: "700",
  },

  rowMeta: {
    color: COLORS.muted,
    marginTop: 4,
    textTransform: "capitalize",
  },

  amount: {
    fontWeight: "800",
    fontSize: 16,
  },
});
