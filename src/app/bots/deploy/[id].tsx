import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button, StatusBanner } from "@/components/ui";
import { COLORS } from "@/constants";
import { bots } from "@/data";
import { useDeploymentStore } from "@/store/deployment";
import { useWalletStore } from "@/store/wallet";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function DeployScreen() {
  const { id } = useLocalSearchParams();
  const bot = bots.marketplace.find((item) => item.id === Number(id));
  const balance = useWalletStore((state) => state.balance);
  const refreshBalance = useWalletStore((state) => state.refreshBalance);
  const createDeployment = useDeploymentStore((state) => state.createDeployment);
  const generateSession = useDeploymentStore((state) => state.generateSession);
  const [deploying, setDeploying] = useState(false);

  if (!bot) {
    return (
      <View style={styles.center}>
        <Text>Bot not found</Text>
      </View>
    );
  }

  const availableCredits = balance || 450;
  const enoughCredits = availableCredits >= bot.deploymentConfig.minCredits;

  const handleDeploy = async () => {
    if (!enoughCredits) {
      router.push("/wallet/recharge" as any);
      return;
    }

    setDeploying(true);
    try {
      await refreshBalance();
      const deployment = await createDeployment({
        botId: bot.id,
        botName: bot.name,
        ownerNumber: "",
        prefix: bot.deploymentConfig.defaultPrefix,
        sessionName: `${bot.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      });
      await generateSession(deployment.id);
      router.push(`/bots/pair/${deployment.id}` as any);
    } finally {
      setDeploying(false);
    }
  };

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Deployment Check" subtitle="Verify bot details" showBack />

        <View style={styles.card}>
          <Text style={styles.botName}>{bot.name}</Text>
          <Text style={styles.description}>{bot.description}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{bot.category}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <InfoRow label="Required Credits" value={`${bot.deploymentConfig.minCredits}`} />
          <InfoRow label="Available Credits" value={`${availableCredits}`} />
          <InfoRow label="Hourly Usage" value={`${bot.deploymentConfig.hourlyUsage}/hr`} />
        </View>

        <StatusBanner
          type={enoughCredits ? "success" : "warning"}
          title={enoughCredits ? "Ready to deploy" : "Insufficient credits"}
          message="Deployment creates a record, generates a session, pairs the device, then brings the bot online."
        />

        <Button title="Deploy Bot" onPress={handleDeploy} loading={deploying} />
      </ScrollView>
    </Screen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { backgroundColor: COLORS.white, margin: 16, padding: 18, borderRadius: 18 },
  botName: { color: COLORS.text, fontSize: 20, fontWeight: "700" },
  description: { marginTop: 8, color: COLORS.muted },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  badgeText: { color: COLORS.successDark, fontWeight: "600" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  label: { color: COLORS.muted },
  value: { color: COLORS.text, fontWeight: "700" },
});
