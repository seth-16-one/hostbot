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
import { COLORS, SHADOWS } from "@/constants";
import { deployments, system } from "@/data";

const activities = system.activity;
const notifications = system.notifications;
const promoCards = system.promos;
const status = system.serverStatus;
const usage = system.usage;

const myBots = deployments;

import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function DashboardScreen() {
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Header
          name="Seth"
          subtitle="Manage your bots and activity"
          showProfile={true}
          showName={true}
          showSearch={false}
        />

        <CreditsCard credits={450} />

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
              color={COLORS.primary}
            />

            <ActionCard
              title="Pair Bot"
              icon="link-outline"
              color={COLORS.info}
            />
          </View>

          <View style={styles.actionRow}>
            <ActionCard
              title="View Logs"
              icon="document-text-outline"
              color={COLORS.warning}
            />

            <ActionCard
              title="Billing"
              icon="card-outline"
              color={COLORS.purple}
            />
          </View>

          {/*My Bots*/}
          <Text style={styles.sectionTitle}>My Bots</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {myBots.slice(0, 3).map((bot) => (
              <MyBotCard
                key={bot.id}
                id={bot.id}
                icon={bot.icon}
                name={bot.name}
                platform={bot.platform}
                status={bot.status}
                messages={bot.messages}
                onPress={() => router.push(`/bots/manage/${bot.id}` as any)}
              />
            ))}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 12,
    color: COLORS.text,
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
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 14,
  },

  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    gap: 12,

    ...SHADOWS.sm,
  },

  activityText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.secondaryText,
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
