import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button } from "@/components/ui";
import { COLORS } from "@/constants";
import { bots } from "@/data";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function DeployScreen() {
  const { id } = useLocalSearchParams();

  const bot = bots.marketplace.find((item) => item.id === Number(id));

  const availableCredits = 450;

  if (!bot) {
    return (
      <View style={styles.center}>
        <Text>Bot not found</Text>
      </View>
    );
  }

  const [deploying, setDeploying] = useState(false);

  const handleDeploy = async () => {
    try {
      setDeploying(true);

      // deployment logic
    } finally {
      setDeploying(false);
    }
  };

  const enoughCredits = availableCredits >= bot.deploymentConfig.minCredits;

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        {/* Header*/}
        <PageHeader
          title="Deployment Check"
          subtitle="Verify your Bot details"
          showBack
        />

        <View style={styles.card}>
          <Text style={styles.botName}>{bot.name}</Text>

          <Text style={styles.description}>{bot.description}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{bot.category}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <InfoRow
            label="Required Credits"
            value={`${bot.deploymentConfig.minCredits}`}
          />

          <InfoRow label="Available Credits" value={`${availableCredits}`} />

          <InfoRow
            label="Hourly Usage"
            value={`${bot.deploymentConfig.hourlyUsage}/hr`}
          />
        </View>

        <View style={styles.statusCard}>
          <Text
            style={{
              color: enoughCredits ? "COLORS.success" : "COLORS.danger",
              fontWeight: "700",
            }}
          >
            {enoughCredits ? "✓ Ready To Deploy" : "⚠ Insufficient Credits"}
          </Text>
        </View>

        <Button
          title="Deploy Bot"
          onPress={() => router.push(`/bots/pair/${bot.id}` as any)}
          loading={deploying}
        />
      </ScrollView>
    </Screen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  card: {
    backgroundColor: COLORS.white,
    margin: 16,
    padding: 18,
    borderRadius: 18,
  },

  botName: {
    fontSize: 20,
    fontWeight: "700",
  },

  description: {
    marginTop: 8,
    color: COLORS.muted,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "COLORS.successBg",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },

  badgeText: {
    color: COLORS.successDark,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  statusCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 18,
  },

  button: {
    backgroundColor: COLORS.primary,
    margin: 16,
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: "COLORS.tabInactive",
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "700",
  },
});
