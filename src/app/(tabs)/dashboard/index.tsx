import ActionCard from "@/components/cards/ActionCard";
import ActivityCard from "@/components/cards/ActivityCard";
import CreditsCard from "@/components/cards/CreditCard";
import MyBotCard from "@/components/cards/MyBotCard";
import NotificationCard from "@/components/cards/NotificationCard";
import PromoCard from "@/components/cards/PromoCard";
import ServerStatusCard from "@/components/cards/ServerStatusCard";
import UsageCard from "@/components/cards/UsageCard";
import Header from "@/components/layout/Header";
import Screen from "@/components/layout/Screen";
import { useToast } from "@/context/ToastContext";
import { system } from "@/data";
import {
  deploymentService,
  type Deployment,
} from "@/services/deployments/deployment.service";
import { useAuthStore } from "@/store/auth";
import { useWalletStore } from "@/store/wallet";
import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

const activities = system.activity;
const notifications = system.notifications;
const promoCards = system.promos;
const status = system.serverStatus;
const usage = system.usage;

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

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const credits = useWalletStore((state) => state.balance);
  const refreshBalance = useWalletStore((state) => state.refreshBalance);

  const [myBots, setMyBots] = useState<Deployment[]>([]);

  useEffect(() => {
    refreshBalance();
    loadDeployments();
  }, []);

  const { showToast } = useToast();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const user = useAuthStore((state) => state.user);

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      await refreshBalance();
    } catch (error) {
      showToast({
        title: "Refresh Failed",
        message: "Unable to refresh dashboard. Check your internet connection.",
        type: "error",
      });
    } finally {
      setRefreshing(false);
    }
  };

  async function loadDeployments() {
    try {
      const data = await deploymentService.getMyDeployments();
      setMyBots(data);
    } catch (err) {
    }
  }

  return (
    <Screen backgroundColor={theme.colors.primary}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header
          name={user ? `${user.firstName} ${user.lastName}` : "User"}
          subtitle="Manage your bots and activity"
          showProfile={true}
          showName={true}
          showSearch={false}
        />

        <CreditsCard credits={credits} />

        <View style={styles.content}>
          {/* Promo Cards */}
          <Text style={styles.sectionTitle}>Overview</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promoContainer}
          >
            {promoCards.map((card) => (
              <PromoCard
                key={card.id}
                title={card.title}
                description={card.description}
                image={card.image}
                action={card.action}
                link={card.link}
              />
            ))}
          </ScrollView>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.actionRow}>
            <ActionCard
              title="Create Bot"
              icon="add-circle-outline"
              color={theme.colors.primary}
            />

            <ActionCard
              title="Pair Bot"
              icon="link-outline"
              color={theme.colors.info}
            />
          </View>

          <View style={styles.actionRow}>
            <ActionCard
              title="View Logs"
              icon="document-text-outline"
              color={theme.colors.warning}
            />

            <ActionCard
              title="Billing"
              icon="card-outline"
              color={theme.colors.purple}
            />
          </View>

          {/*My Bots*/}
          <Text style={styles.sectionTitle}>My Bots</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {myBots.length === 0 ? (
              <Text style={styles.emptyText}>No bots deployed yet.</Text>
            ) : (
              myBots
                .slice(0, 3)
                .map((deployment) => (
                  <MyBotCard
                    key={deployment.id}
                    id={deployment.id}
                    icon={deployment.bot.icon ?? ""}
                    name={deployment.bot.name}
                    platform={deployment.bot.category ?? "WhatsApp"}
                    status={deployment.status}
                    messages={0}
                    onPress={() =>
                      router.push(`/bots/manage/${deployment.id}` as any)
                    }
                  />
                ))
            )}
          </ScrollView>

          {/*Usage Analytics*/}
          <Text style={styles.sectionTitle}>Usage Analytics</Text>

          <View style={styles.statsRow}>
            {usage.slice(0, 2).map((item) => (
              <UsageCard
                key={item.id}
                title={item.title}
                value={item.value}
                icon={item.icon}
                color={item.color}
              />
            ))}
          </View>

          <View style={styles.statsRow}>
            {usage.slice(2, 4).map((item) => (
              <UsageCard
                key={item.id}
                title={item.title}
                value={item.value}
                icon={item.icon}
                color={item.color}
              />
            ))}
          </View>

          {/* Notifications */}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Notifications</Text>

            <Pressable onPress={() => router.push("/notifications" as any)}>
              <Text style={styles.viewAll}>View All</Text>
            </Pressable>
          </View>

          {notifications.slice(0, 3).map((item) => (
            <NotificationCard
              key={item.id}
              id={item.id}
              title={item.title}
              message={item.message}
              type={item.type}
            />
          ))}

          {/* Server Status */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Server Status</Text>

            <Pressable onPress={() => router.push("/server-status" as any)}>
              <Text style={styles.viewAll}>View All</Text>
            </Pressable>
          </View>

          {status.slice(0, 3).map((server, index) => (
            <ServerStatusCard
              key={index}
              name={server.name}
              status={server.status}
              uptime={server.uptime}
              onPress={() =>
                router.push({
                  pathname: "/server-status/[id]",
                  params: {
                    id: server.id.toString(),
                  },
                } as any)
              }
            />
          ))}

          {/* Recent Activity */}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>

            <Pressable onPress={() => router.push("/activity")}>
              <Text style={styles.viewAll}>View All</Text>
            </Pressable>
          </View>

          {activities.slice(0, 3).map((activity) => (
            <ActivityCard
              key={activity.id}
              title={activity.title}
              description={activity.description}
              time={activity.time}
              type={activity.type}
              onPress={() =>
                router.push({
                  pathname: "/activity/[id]",
                  params: {
                    id: activity.id.toString(),
                  },
                } as any)
              }
            />
          ))}
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
      paddingBottom: 40,
    },

    emptyText: {
      textAlign: "center",
      color: theme.colors.secondaryText,
      paddingVertical: 20,
      fontSize: 15,
    },

    sectionTitle: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: "800",

      marginTop: 24,
      marginBottom: 12,
    },

    promoContainer: {
      paddingBottom: 10,
    },

    actionRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 12,
    },

    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      marginTop: 24,
      marginBottom: 12,
    },

    viewAll: {
      color: theme.colors.primary,
      fontWeight: "700",
      fontSize: 14,
    },

    activityCard: {
      flexDirection: "row",
      alignItems: "center",

      backgroundColor: theme.colors.card,

      padding: 16,

      borderRadius: 18,

      marginBottom: 10,

      gap: 12,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 3,
    },

    activityText: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.secondaryText,
    },

    analyticsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },

    statsRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 12,
    },
  });
}

