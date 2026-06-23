import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button, Input, PhoneInput } from "@/components/ui";
import { COLORS } from "@/constants";
import { bots } from "@/data";
import { useDeploymentStore } from "@/store/deployment";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ConfigureScreen() {
  const { id } = useLocalSearchParams();
  const bot = bots.marketplace.find((item) => item.id === Number(id));
  const [botName, setBotName] = useState(bot?.name || "");
  const [ownerNumber, setOwnerNumber] = useState("");
  const [prefix] = useState(bot?.deploymentConfig.defaultPrefix ?? ".");
  const [loading, setLoading] = useState(false);
  const createDeployment = useDeploymentStore((state) => state.createDeployment);
  const generateSession = useDeploymentStore((state) => state.generateSession);

  const generatedSession = useMemo(
    () => `${bot?.name?.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
    [bot?.name],
  );

  const handleContinue = async () => {
    if (!bot) return;
    setLoading(true);
    try {
      const deployment = await createDeployment({
        botId: bot.id,
        botName,
        ownerNumber,
        prefix,
        sessionName: generatedSession,
      });
      await generateSession(deployment.id);
      router.push(`/bots/pair/${deployment.id}` as any);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader title="Configure Bot" subtitle="Finalize deployment settings" showBack />
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Bot Information</Text>
            <Input label="Bot Name" value={botName} onChangeText={setBotName} placeholder="My WhatsApp Bot" />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Link Your Account</Text>
            <PhoneInput value={ownerNumber} onChange={setOwnerNumber} />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Deployment Information</Text>
            <InfoRow label="Bot Version" value={bot?.version || "-"} />
            <InfoRow label="Category" value={bot?.category || "-"} />
            <InfoRow label="Minimum Credits" value={`${bot?.minimumCreditsRequired ?? 0} Credits`} />
            <InfoRow label="Running Cost" value={`${bot?.runCreditsPerHour ?? 0} Credits/hr`} />
            <InfoRow label="Session" value={generatedSession} />
            <InfoRow label="Prefix" value={prefix} />
            <Button title="Continue to Pairing" onPress={handleContinue} loading={loading} />
          </View>
        </View>
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
  content: { padding: 20 },
  card: { backgroundColor: COLORS.white, borderRadius: 18, padding: 18, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 14, color: COLORS.text },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12, gap: 12 },
  label: { color: COLORS.muted },
  value: { color: COLORS.text, fontWeight: "600", flex: 1, textAlign: "right" },
});
