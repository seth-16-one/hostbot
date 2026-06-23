import CreditsCard from "@/components/cards/CreditCard";
import MarketplaceCard from "@/components/cards/MarketplaceCard";
import MyBotCard from "@/components/cards/MyBotCard";
import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { EmptyState } from "@/components/ui";
import { COLORS } from "@/constants";
import { bots } from "@/data";
import { useDeploymentStore } from "@/store/deployments";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const availableBots = bots.marketplace;

const deployedBots = useDeploymentStore((state) => state.deployments);

const categories = ["All", "WhatsApp", "Business", "E-commerce"];

export default function BotsScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      // await fetchMarketplaceBots();
      // await fetchMyBots();

      await new Promise((resolve) => setTimeout(resolve, 1000));
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

  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredBots =
    selectedCategory === "All"
      ? availableBots
      : availableBots.filter((bot) => bot.category === selectedCategory);

  return (
    <Screen backgroundColor={COLORS.primary}>
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
          <CreditsCard credits={450} />

          {/* My Bots */}

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
                  id={deployment.botId}
                  icon={botInfo.icon}
                  name={botInfo.name}
                  platform={botInfo.category}
                  status={deployment.status}
                  messages="0"
                  onPress={() =>
                    router.push(`/bots/manage/${deployment.id}` as any)
                  }
                />
              );
            })
          )}

          {/* Marketplace */}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  summaryText: {
    color: COLORS.muted,
    fontSize: 13,
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
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 10,
  },

  activeCategory: {
    backgroundColor: COLORS.primary,
  },

  categoryText: {
    color: COLORS.text,
    fontWeight: "600",
  },

  activeCategoryText: {
    color: COLORS.white,
    fontWeight: "600",
  },
});
