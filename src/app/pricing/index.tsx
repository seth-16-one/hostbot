import CreditsCard from "@/components/cards/CreditCard";
import PricingCard from "@/components/cards/PricingCard";
import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { billing } from "@/data";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PricingScreen() {
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader
          title="Credits & Billing"
          subtitle="Purchase and manage credits"
        />

        <View style={styles.content}>
          {/* Current Plan */}
          <CreditsCard credits={billing.credits} />

          {/* Credit Packages */}

          <Text style={styles.sectionTitle}>Credit Packages</Text>

          <View style={styles.packagesGrid}>
            {billing.creditPackages.map((pkg) => (
              <View key={pkg.id} style={styles.packageItem}>
                <PricingCard
                  title={`${pkg.credits} Credits`}
                  price={pkg.price}
                  description="One-time purchase"
                  buttonText="Buy"
                />
              </View>
            ))}
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>How Credits Work</Text>

            <Text style={styles.infoText}>
              Credits are consumed while your bots are running. Different bots
              may use different amounts of credits per hour depending on their
              resource requirements.
            </Text>
          </View>

          {/* Custom Credits */}

          <View style={styles.customCard}>
            <Text style={styles.customTitle}>Custom Credit Purchase</Text>

            <Text style={styles.customDescription}>
              Need a specific amount? Purchase any amount from 50 credits and
              above.
            </Text>
          </View>

          {/* Transactions */}

          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          {billing.transactions.map((item) => (
            <View key={item.id} style={styles.transactionCard}>
              <View>
                <Text style={styles.transactionTitle}>{item.title}</Text>

                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>

              <Text style={styles.transactionAmount}>{item.amount}</Text>
            </View>
          ))}
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
    padding: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 12,
  },

  packagesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  packageItem: {
    width: "48%",
  },

  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  infoText: {
    marginTop: 8,
    color: COLORS.muted,
    lineHeight: 22,
  },

  customCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },

  customTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  customDescription: {
    marginTop: 8,
    color: COLORS.muted,
  },

  transactionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  transactionTitle: {
    fontWeight: "600",
  },

  transactionDate: {
    color: COLORS.muted,
    marginTop: 4,
    fontSize: 12,
  },

  transactionAmount: {
    fontWeight: "700",
    color: COLORS.primary,
  },
});
