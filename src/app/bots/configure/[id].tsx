import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button, Input } from "@/components/ui";
import PhoneInput from "@/components/ui/PhoneInput";

import { bots } from "@/data";
import { useToast } from "@/context/ToastContext";
import { botsService } from "@/services/bots/bots.service";
import { useDeploymentStore } from "@/store/deployment";
import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import type { MarketplaceBot } from "@/types/bot";

import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ConfigureScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { showToast } = useToast();

  const { id } = useLocalSearchParams();
  const botId = Number(id);

  const [bot, setBot] = useState<MarketplaceBot | null>(null);

  const [botName, setBotName] = useState("");
  const [ownerNumber, setOwnerNumber] = useState("");
  const [prefix, setPrefix] = useState(".");
  const [loading, setLoading] = useState(false);

  const createDeployment = useDeploymentStore(
    (state) => state.createDeployment,
  );

  const generateSession = useDeploymentStore((state) => state.generateSession);

  useEffect(() => {
    let mounted = true;

    async function loadBot() {
      try {
        const apiBot = await botsService.getBot(botId);
        if (mounted) {
          setBot(apiBot);
          setBotName(apiBot.name);
          setPrefix(apiBot.deploymentConfig.defaultPrefix);
        }
      } catch {
        const fallbackBot = bots.marketplace.find((item) => item.id === botId) ?? null;
        if (mounted) {
          setBot(fallbackBot);
          setBotName(fallbackBot?.name || "");
          setPrefix(fallbackBot?.deploymentConfig.defaultPrefix ?? ".");
        }
      }
    }

    loadBot();

    return () => {
      mounted = false;
    };
  }, [botId]);

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
    } catch (error) {
      showToast({
        title: "Deployment Failed",
        message: (error as Error).message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen backgroundColor={theme.colors.primary}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <PageHeader
          title="Configure Bot"
          subtitle="Review your deployment settings"
          showBack
        />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bot Identity</Text>

          <Input
            label="Bot Name"
            value={botName}
            onChangeText={setBotName}
            placeholder="My WhatsApp Bot"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>WhatsApp Number</Text>

          <PhoneInput value={ownerNumber} onChange={setOwnerNumber} />

          <Text style={styles.helperText}>
            This WhatsApp number will be linked to this deployment.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Deployment Details</Text>

          <InfoRow
            label="Bot Version"
            value={bot?.version || "-"}
            styles={styles}
          />

          <InfoRow
            label="Category"
            value={bot?.category || "-"}
            styles={styles}
          />

          <InfoRow
            label="Minimum Credits"
            value={`${bot?.minimumCreditsRequired ?? 0} Credits`}
            styles={styles}
          />

          <InfoRow
            label="Running Cost"
            value={`${bot?.runCreditsPerHour ?? 0} Credits/hr`}
            styles={styles}
          />

          <InfoRow label="Session" value={generatedSession} styles={styles} />

          <InfoRow label="Prefix" value={prefix} styles={styles} last />

          <View style={styles.buttonContainer}>
            <Button
              title="Continue"
              onPress={handleContinue}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function InfoRow({
  label,
  value,
  styles,
  last = false,
}: {
  label: string;
  value: string;
  styles: any;
  last?: boolean;
}) {
  return (
    <View
      style={[
        styles.row,
        last && {
          borderBottomWidth: 0,
          paddingBottom: 0,
          marginBottom: 0,
        },
      ]}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={1} ellipsizeMode="middle">
        {value}
      </Text>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    content: {
      paddingBottom: 60,
    },

    card: {
      marginHorizontal: 20,
      marginTop: 20,

      backgroundColor: theme.colors.card,
      borderRadius: 20,
      padding: 20,

      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    cardTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: 18,
    },

    helperText: {
      marginTop: 10,
      color: theme.colors.muted,
      fontSize: 13,
      lineHeight: 20,
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },

    label: {
      flex: 0.9,
      color: theme.colors.muted,
      fontSize: 15,
    },

    value: {
      flex: 1.4,
      textAlign: "right",
      color: theme.colors.text,
      fontWeight: "700",
      fontSize: 15,
    },

    buttonContainer: {
      marginTop: 34,
      marginBottom: 20,
    },
  });
}
