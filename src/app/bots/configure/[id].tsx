import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button, Input, PhoneInput } from "@/components/ui";
import { COLORS } from "@/constants";
import { bots } from "@/data";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

export default function ConfigureScreen() {
  const { id } = useLocalSearchParams();

  const bot = bots.marketplace.find((item) => item.id === Number(id));

  const [botName, setBotName] = useState(bot?.name || "");

  const [ownerNumber, setOwnerNumber] = useState("");
  const [prefix, setPrefix] = useState(".");

  const [autoRestart, setAutoRestart] = useState(true);

  const [autoBackup, setAutoBackup] = useState(true);

  const [autoUpdate, setAutoUpdate] = useState(false);

  const generatedSession = `${bot?.name
    ?.toLowerCase()
    .replace(/\s+/g, "-")}-${Date.now()}`;

  const handleContinue = () => {
    const deploymentData = {
      botId: bot?.id,
      botName,
      ownerNumber,
      prefix,
      sessionName: generatedSession,
      status: "queued",
      createdAt: new Date().toISOString(),
    };

    console.log(deploymentData);

    router.push(`/bots/pair/${id}` as any);
  };

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader
          title="Configure Bot"
          subtitle="Finalize deployment settings"
        />

        <View style={styles.content}>
          {/* Bot Information */}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Bot Information</Text>

            <Input
              label="Bot Name"
              value={botName}
              onChangeText={setBotName}
              placeholder="My WhatsApp Bot"
            />
          </View>

          {/* Session Information */}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Link Your Account</Text>

            <PhoneInput value={ownerNumber} onChange={setOwnerNumber} />
          </View>

          {/* Automation Settings */}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Deployment Information</Text>

            <InfoRow label="Bot Version" value={bot?.version || "-"} />

            <InfoRow label="Category" value={bot?.category || "-"} />

            <InfoRow
              label="Minimum Credits"
              value={`${bot?.minimumCreditsRequired} Credits`}
            />

            <InfoRow
              label="Running Cost"
              value={`${bot?.runCreditsPerHour} Credits/hr`}
            />

            <InfoRow label="Rating" value={`${bot?.rating} ★`} />

            {/* Deployment Summary */}

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Deployment Summary</Text>

              <Text style={styles.summaryText}>Bot: {botName}</Text>

              <Text style={styles.summaryText}>
                Minimum Credits: {bot?.minimumCreditsRequired}
              </Text>

              <Text style={styles.summaryText}>
                Running Cost: {bot?.runCreditsPerHour} Credits/hr
              </Text>

              <Text style={styles.summaryText}>
                Session: {generatedSession}
              </Text>

              <Text style={styles.summaryText}>
                Owner: {ownerNumber || "Not Set"}
              </Text>

              <Text style={styles.summaryText}>Prefix: {prefix}</Text>
            </View>

            {/* Deploy */}

            <Button title="Continue to Pairing" onPress={handleContinue} />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function SettingRow({
  title,
  description,
  value,
  onChange,
}: {
  title: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.settingRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.settingTitle}>{title}</Text>

        <Text style={styles.settingDescription}>{description}</Text>
      </View>

      <Switch value={value} onValueChange={onChange} />
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
      }}
    >
      <Text style={{ color: COLORS.muted }}>{label}</Text>

      <Text
        style={{
          color: COLORS.text,
          fontWeight: "600",
        }}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
    color: COLORS.text,
  },

  input: {
    backgroundColor: COLORS.background,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },

  helperText: {
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 12,
  },

  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 10,
  },

  settingTitle: {
    fontWeight: "600",
    color: COLORS.text,
  },

  settingDescription: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },

  summaryCard: {
    backgroundColor: COLORS.successBg,
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.successDark,
    marginBottom: 10,
  },

  summaryText: {
    color: COLORS.successDeep,
    marginBottom: 4,
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 40,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
});
