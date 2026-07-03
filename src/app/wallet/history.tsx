import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { useWalletStore } from "@/store/wallet";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function WalletHistoryScreen() {
  const { transactions, refreshTransactions } = useWalletStore();

  useEffect(() => {
    refreshTransactions();
  }, []);

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader
          title="Transaction History"
          subtitle="Wallet activity"
          showBack
        />

        <View style={styles.content}>
          {transactions.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="receipt-outline" size={60} color={COLORS.muted} />

              <Text style={styles.emptyTitle}>No Transactions</Text>

              <Text style={styles.emptyText}>
                Your wallet activity will appear here.
              </Text>
            </View>
          ) : (
            transactions.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.left}>
                  <View
                    style={[
                      styles.icon,
                      {
                        backgroundColor:
                          item.type === "debit"
                            ? COLORS.dangerLight
                            : COLORS.successLight,
                      },
                    ]}
                  >
                    <Ionicons
                      name={item.type === "debit" ? "arrow-up" : "arrow-down"}
                      size={20}
                      color={
                        item.type === "debit" ? COLORS.danger : COLORS.success
                      }
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.description}</Text>

                    <Text style={styles.date}>
                      {new Date(item.createdAt).toLocaleString()}
                    </Text>

                    <View
                      style={[
                        styles.badge,
                        {
                          backgroundColor:
                            item.status === "completed"
                              ? COLORS.successLight
                              : item.status === "pending"
                                ? COLORS.warningBg
                                : COLORS.dangerLight,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          {
                            color:
                              item.status === "completed"
                                ? COLORS.success
                                : item.status === "pending"
                                  ? COLORS.warning
                                  : COLORS.danger,
                          },
                        ]}
                      >
                        {item.status.toUpperCase()}
                      </Text>
                    </View>
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

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  empty: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    color: COLORS.text,
  },

  emptyText: {
    marginTop: 8,
    color: COLORS.muted,
    textAlign: "center",
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    flex: 1,
    marginRight: 12,
  },

  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  date: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 12,
  },

  badge: {
    alignSelf: "flex-start",
    marginTop: 8,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },

  amount: {
    fontSize: 18,
    fontWeight: "800",
  },
});
