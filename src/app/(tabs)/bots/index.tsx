import CreditsCard from "@/components/cards/CreditCard";
import MarketplaceCard from "@/components/cards/MarketplaceCard";
import MyBotCard from "@/components/cards/MyBotCard";
import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { EmptyState } from "@/components/ui";
import { useToast } from "@/context/ToastContext";
import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

import { bots as staticBots } from "@/data";
import { botsService } from "@/services/bots/bots.service";
import { useDeploymentStore } from "@/store/deployment";
import { useWalletStore } from "@/store/wallet";
import type { MarketplaceBot } from "@/types/bot";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const categories = ["All", "WhatsApp", "Business", "E-commerce"];

export default function BotsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const deployedBots = useDeploymentStore((state) => state.deployments);
  const loadDeployments = useDeploymentStore((state) => state.loadDeployments);
  const balance = useWalletStore((state) => state.balance);
  const refreshBalance = useWalletStore((state) => state.refreshBalance);
  const [availableBots, setAvailableBots] = useState<MarketplaceBot[]>(
    staticBots.marketplace,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { showToast } = useToast();

  const loadBots = async () => {
    const marketplace = await botsService.getMarketplace();
    setAvailableBots(marketplace);
  };

  useEffect(() => {
    const load = async () => {
      try {
        await Promise.all([loadBots(), refreshBalance(), loadDeployments()]);
      } catch {
        setAvailableBots(staticBots.marketplace);
      }
    };

    load();
  }, [loadDeployments, refreshBalance]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      await Promise.all([loadBots(), refreshBalance(), loadDeployments()]);
    } catch (error) {
      showToast({
        title: "Refresh Failed",
        message:
          "Unable to load the latest bots. Check your internet connection.",
        type: "error",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const onlineBots = deployedBots.filter(
    (bot) => bot.status === "online",
  ).length;
  const offlineBots = deployedBots.filter(
    (bot) => bot.status !== "online",
  ).length;
  const filteredBots =
    selectedCategory === "All"
      ? availableBots
      : availableBots.filter((bot) => bot.category === selectedCategory);

  return (
    <Screen backgroundColor={theme.colors.primary}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PageHeader
          title="Bots"
          subtitle="Deploy and manage bots"
          showSearch
          searchPlaceholder="Search bots..."
        />

        <View style={styles.content}>
          <CreditsCard credits={balance} />

          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>My Bots</Text>
            <Text style={styles.summaryText}>
              {onlineBots} Online • {offlineBots} Offline
            </Text>
          </View>

          {deployedBots.length === 0 ? (
            <EmptyState
              icon="rocket-outline"
              title="No Running Bots"
              description="Deploy a bot from the marketplace below."
            />
          ) : (
            deployedBots.map((deployment) => {
              const botInfo = availableBots.find(
                (bot) => bot.id === deployment.botId,
              );
              if (!botInfo) return null;

              return (
                <MyBotCard
                  key={deployment.id}
                  id={String(deployment.botId)}
                  icon={botInfo.icon}
                  name={botInfo.name}
                  platform={botInfo.category}
                  status={deployment.status}
                  messages={0}
                  onPress={() =>
                    router.push(`/bots/manage/${deployment.id}` as any)
                  }
                />
              );
            })
          )}

          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Marketplace</Text>
            <Text style={styles.summaryText}>
              {availableBots.length} Available
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {categories.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.category,
                  selectedCategory === category && styles.activeCategory,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {filteredBots.length === 0 ? (
            <EmptyState
              icon="search-outline"
              title="No Bots Found"
              description="Try another category."
            />
          ) : (
            <View style={styles.grid}>
              {filteredBots.map((bot) => (
                <MarketplaceCard
                  key={bot.id}
                  icon={bot.icon}
                  name={bot.name}
                  description={bot.description}
                  minimumCreditsRequired={bot.minimumCreditsRequired}
                  hourlyUsage={bot.runCreditsPerHour}
                  rating={bot.rating}
                  featured={bot.featured}
                  onPress={() => router.push(`/bots/${bot.id}` as any)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    content: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 40,
    },

    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      marginTop: 10,
      marginBottom: 12,
    },

    sectionTitle: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "800",
    },

    summaryText: {
      color: theme.colors.muted,
      fontSize: 13,
      fontWeight: "500",
    },

    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 12,
    },

    categories: {
      flexDirection: "row",
      alignItems: "center",

      gap: 10,

      marginBottom: 16,

      paddingRight: 20,
    },

    category: {
      backgroundColor: theme.colors.card,

      borderRadius: 999,

      borderWidth: 1,
      borderColor: theme.colors.border,

      paddingHorizontal: 16,
      paddingVertical: 10,

      marginRight: 10,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.04,
      shadowRadius: 6,
      shadowOffset: {
        width: 0,
        height: 2,
      },

      elevation: 2,
    },

    activeCategory: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },

    categoryText: {
      color: theme.colors.text,
      fontSize: 14,
      fontWeight: "700",
    },

    activeCategoryText: {
      color: theme.colors.white,
      fontSize: 14,
      fontWeight: "700",
    },
  });
}
