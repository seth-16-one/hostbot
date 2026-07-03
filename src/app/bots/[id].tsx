import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button } from "@/components/ui";

import { bots } from "@/data";
import { botsService } from "@/services/bots/bots.service";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import type { MarketplaceBot } from "@/types/bot";

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function BotDetailsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { id } = useLocalSearchParams();
  const botId = Number(id);
  const [bot, setBot] = useState<MarketplaceBot | null>(null);
  const [loading, setLoading] = useState(true);

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
        if (mounted) setLoading(false);
      }
    }

    loadBot();

    return () => {
      mounted = false;
    };
  }, [botId]);

  if (loading) {
    return (
      <Screen backgroundColor={theme.colors.primary}>
        <View style={styles.center}>
          <Text style={styles.emptySubtitle}>Loading bot details...</Text>
        </View>
      </Screen>
    );
  }

  if (!bot) {
    return (
      <Screen backgroundColor={theme.colors.primary}>
        <View style={styles.center}>
          <Ionicons
            name="alert-circle-outline"
            size={70}
            color={theme.colors.muted}
          />

          <Text style={styles.emptyTitle}>Bot Not Found</Text>

          <Text style={styles.emptySubtitle}>
            The requested bot could not be found.
            {"\n\n"}
            It may have been removed or is no longer available in the
            marketplace.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen backgroundColor={theme.colors.primary}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <PageHeader
          title="Bot Details"
          subtitle="Check your bot details"
          showBack
        />

        {/* Hero */}

        <View style={styles.hero}>
          <View style={styles.iconCircle}>
            <Ionicons
              name={bot.icon as any}
              size={42}
              color={theme.colors.primary}
            />
          </View>

          <Text style={styles.name}>{bot.name}</Text>

          {bot.featured && (
            <View style={styles.popularBadge}>
              <Ionicons name="flame" size={14} color="#D97706" />

              <Text style={styles.popularText}>Popular</Text>
            </View>
          )}

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{bot.category}</Text>
          </View>

          <Text style={styles.description}>{bot.longDescription}</Text>
        </View>

        {/* Information */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Bot Information</Text>

          <InfoRow label="Version" value={bot.version} styles={styles} />

          <InfoRow
            label="Deployments"
            value={bot.totalDeployments.toLocaleString()}
            styles={styles}
          />

          <InfoRow label="Rating" value={`${bot.rating} ★`} styles={styles} />

          <InfoRow
            label="Last Updated"
            value={bot.lastUpdated}
            styles={styles}
            last
          />
        </View>

        {/* Deployment */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Deployment Requirements</Text>

          <InfoRow
            label="Minimum Credits"
            value={`${bot.minimumCreditsRequired} Credits`}
            styles={styles}
          />

          <InfoRow
            label="Hourly Usage"
            value={`${bot.runCreditsPerHour} Credits/hr`}
            styles={styles}
          />

          <InfoRow
            label="Estimated Monthly"
            value={`${bot.runCreditsPerHour * 24 * 30} Credits`}
            styles={styles}
          />

          <InfoRow
            label="Available Credits"
            value="450 Credits"
            styles={styles}
            last
          />
        </View>

        {/* Features */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Features</Text>

          {bot.features.map((feature) => (
            <Text key={feature} style={styles.item}>
              ✓ {feature}
            </Text>
          ))}
        </View>

        {/* Requirements */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Requirements</Text>

          {bot.requirements.map((requirement) => (
            <Text key={requirement} style={styles.item}>
              • {requirement}
            </Text>
          ))}
        </View>

        {/* Credits */}

        <View style={styles.warningCard}>
          <Ionicons
            name="wallet-outline"
            size={22}
            color={theme.colors.primary}
          />

          <Text style={styles.warningText}>
            Deploying this bot will consume {bot.minimumCreditsRequired} credits
            from your account.
          </Text>
        </View>

        {/* Deploy */}

        {bot.status === "maintenance" ? (
          <View style={styles.warningCard}>
            <Ionicons
              name="warning-outline"
              size={22}
              color={theme.colors.danger}
            />

            <Text style={styles.warningText}>
              This bot is currently under maintenance and cannot be deployed.
            </Text>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              title="Deploy Bot"
              onPress={() => router.push(`/bots/configure/${bot.id}` as any)}
            />
          </View>
        )}
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

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    scrollContent: {
      paddingBottom: 60,
    },

    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 30,
      backgroundColor: theme.colors.background,
    },

    emptyTitle: {
      marginTop: 18,
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.text,
    },

    emptySubtitle: {
      marginTop: 12,
      textAlign: "center",
      lineHeight: 25,
      fontSize: 15,
      color: theme.colors.muted,
    },

    hero: {
      marginHorizontal: 20,
      marginTop: 24,

      backgroundColor: theme.colors.card,

      borderRadius: 22,

      paddingVertical: 28,
      paddingHorizontal: 24,

      alignItems: "center",

      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    iconCircle: {
      width: 96,
      height: 96,
      borderRadius: 48,

      justifyContent: "center",
      alignItems: "center",

      backgroundColor: theme.colors.successBg,
    },

    name: {
      marginTop: 18,

      fontSize: 26,
      fontWeight: "800",

      color: theme.colors.text,
    },

    popularBadge: {
      flexDirection: "row",
      alignItems: "center",

      marginTop: 10,

      paddingHorizontal: 12,
      paddingVertical: 6,

      borderRadius: 999,

      backgroundColor: "#FFF3D6",

      gap: 5,
    },

    popularText: {
      color: "#D97706",
      fontWeight: "700",
    },

    categoryBadge: {
      marginTop: 14,

      backgroundColor: theme.colors.successBg,

      paddingHorizontal: 14,
      paddingVertical: 7,

      borderRadius: 999,
    },

    categoryText: {
      color: theme.colors.successDark,
      fontWeight: "700",
      fontSize: 13,
    },

    description: {
      marginTop: 18,

      textAlign: "center",

      lineHeight: 24,

      fontSize: 15,

      color: theme.colors.secondaryText,
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

    sectionTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: theme.colors.text,

      marginBottom: 18,
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      paddingVertical: 13,

      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },

    label: {
      flex: 1,

      color: theme.colors.muted,

      fontSize: 15,
    },

    value: {
      flex: 1,

      textAlign: "right",

      color: theme.colors.text,

      fontWeight: "700",

      fontSize: 15,
    },

    item: {
      color: theme.colors.secondaryText,

      fontSize: 15,

      lineHeight: 28,

      marginBottom: 10,
    },

    warningCard: {
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 6,

      flexDirection: "row",
      alignItems: "center",

      backgroundColor: theme.colors.card,

      borderRadius: 18,

      padding: 18,

      borderWidth: 1,
      borderColor: theme.colors.border,

      gap: 12,
    },

    warningText: {
      flex: 1,

      color: theme.colors.text,

      lineHeight: 22,
    },

    buttonContainer: {
      marginHorizontal: 20,
      marginTop: 24,
      marginBottom: 55,
    },
  });
}
