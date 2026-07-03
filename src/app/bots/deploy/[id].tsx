import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button, StatusBanner } from "@/components/ui";
import { COLORS } from "@/constants";
import { useToast } from "@/context/ToastContext";
import { bots } from "@/data";
import { botsService } from "@/services/bots/bots.service";
import { useDeploymentStore } from "@/store/deployment";
import { useWalletStore } from "@/store/wallet";
import type { MarketplaceBot } from "@/types/bot";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function DeployScreen() {
  const { id } = useLocalSearchParams();
  const botId = Number(id);
  const [bot, setBot] = useState<MarketplaceBot | null>(null);
  const [loadingBot, setLoadingBot] = useState(true);
  const balance = useWalletStore((state) => state.balance);
  const refreshBalance = useWalletStore((state) => state.refreshBalance);
  const createDeployment = useDeploymentStore((state) => state.createDeployment);
  const generateSession = useDeploymentStore((state) => state.generateSession);
  const { showToast } = useToast();
  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadBot() {
      try {
        const apiBot = await botsService.getBot(botId);
        if (mounted) setBot(apiBot);
      } catch {
        const fallbackBot = bots.marketplace.find((item) => item.id === botId) ?? null;
        if (mounted) setBot(fallbackBot);
      } finally {
        if (mounted) setLoadingBot(false);
      }
    }

    loadBot();

    return () => {
      mounted = false;
    };
  }, [botId]);

  if (loadingBot || !bot) {
    return (
      <View style={styles.center}>
        <Text>{loadingBot ? "Loading bot..." : "Bot not found"}</Text>
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
    } catch (error) {
      showToast({
        title: "Deployment Failed",
        message: (error as Error).message,
        type: "error",
      });
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
