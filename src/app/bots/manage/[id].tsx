import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS, SHADOWS } from "@/constants";
import { deployments } from "@/data";
import { bots } from "@/data";
import { useDeploymentStore } from "@/store/deployment";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ManageBotScreen() {
  const { id } = useLocalSearchParams();
  const storedDeployment = useDeploymentStore((state) =>
    state.deployments.find((item) => item.id === String(id)),
  );
  const restartBot = useDeploymentStore((state) => state.restartBot);
  const stopBot = useDeploymentStore((state) => state.stopBot);
  const deleteBot = useDeploymentStore((state) => state.deleteBot);
  const generateSession = useDeploymentStore((state) => state.generateSession);
  const marketplaceBot = bots.marketplace.find(
    (item) => item.id === storedDeployment?.botId,
  );
  const legacyBot = deployments.find((item) => item.id === Number(id));
  const bot = storedDeployment
    ? {
        id: storedDeployment.id,
        name: storedDeployment.botName,
        icon: marketplaceBot?.icon ?? "hardware-chip-outline",
        platform: marketplaceBot?.category ?? "WhatsApp",
        status: storedDeployment.status === "online" ? "Online" : "Offline",
        sessionName: storedDeployment.sessionName,
        messages: 0,
        users: 0,
        groups: 0,
        commandsUsed: 0,
        version: marketplaceBot?.version ?? "-",
        ownerNumber: storedDeployment.ownerNumber || "Not set",
        uptime: storedDeployment.status === "online" ? "Just now" : "-",
        creditsPerHour: marketplaceBot?.runCreditsPerHour ?? 0,
        deployedAt: new Date(storedDeployment.createdAt).toLocaleDateString(),
      }
    : legacyBot;

  if (!bot) {
    return (
      <View style={styles.center}>
        <Text>Bot not found</Text>
      </View>
    );
  }

  const deploymentId = storedDeployment?.id;
  const restartDeployment = () => {
    if (deploymentId) restartBot(deploymentId);
  };
  const stopDeployment = () => {
    if (deploymentId) stopBot(deploymentId);
  };
  const clearSession = () => {
    if (deploymentId) generateSession(deploymentId);
  };
  const removeDeployment = async () => {
    if (!deploymentId) return;
    await deleteBot(deploymentId);
    router.replace("/bots" as any);
  };

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <PageHeader title="Manage Bot" subtitle={bot.name} showBack />

        {/* Overview */}

        <View style={styles.hero}>
          <View style={styles.iconCircle}>
            <Ionicons name={bot.icon as any} size={40} color={COLORS.primary} />
          </View>

          <Text style={styles.botName}>{bot.name}</Text>

          <Text style={styles.platformText}>{bot.platform}</Text>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  bot.status === "Online"
                    ? COLORS.successBg
                    : COLORS.dangerBg,
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    bot.status === "Online"
                      ? COLORS.successDark
                      : COLORS.danger,
                },
              ]}
            >
              {bot.status}
            </Text>
          </View>

          <Text style={styles.sessionText}>Session: {bot.sessionName}</Text>
        </View>

        {/* Statistics */}

        <Text style={styles.sectionTitle}>Statistics</Text>

        <View style={styles.statsGrid}>
          <StatCard title="Messages" value={bot.messages} />

          <StatCard title="Users" value={bot.users} />

          <StatCard title="Groups" value={bot.groups} />

          <StatCard title="Commands" value={bot.commandsUsed} />
        </View>

        {/* Bot Information */}

        <Text style={styles.sectionTitle}>Bot Information</Text>

        <View style={styles.card}>
          <InfoRow label="Version" value={bot.version} />

          <InfoRow label="Platform" value={bot.platform} />

          <InfoRow label="Owner" value={bot.ownerNumber} />

          <InfoRow label="Session" value={bot.sessionName} />

          <InfoRow label="Uptime" value={bot.uptime} />

          <InfoRow label="Credits / Hour" value={String(bot.creditsPerHour)} />

          <InfoRow label="Deployed" value={bot.deployedAt} />
        </View>

        {/* Quick Actions */}

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.grid}>
          <ActionCard
            icon="refresh-outline"
            title="Restart"
            description="Restart bot service"
            onPress={restartDeployment}
          />

          <ActionCard
            icon="stop-circle-outline"
            title="Stop"
            description="Stop bot instance"
            onPress={stopDeployment}
          />

          <ActionCard
            icon="link-outline"
            title="Session"
            description="Manage pairing session"
            onPress={() => router.push(`/bots/manage/session?id=${id}`)}
          />

          <ActionCard
            icon="document-text-outline"
            title="Logs"
            description="View bot logs"
            onPress={() => router.push(`/bots/manage/logs?id=${id}`)}
          />
        </View>

        {/* Management */}

        <Text style={styles.sectionTitle}>Management</Text>

        <MenuItem
          icon="settings-outline"
          title="Bot Settings"
          description="Configure bot options"
          onPress={() => router.push(`/bots/manage/settings?id=${id}`)}
        />

        <MenuItem
          icon="analytics-outline"
          title="Analytics"
          description="View bot statistics"
          onPress={() => router.push(`/bots/manage/analytics?id=${id}`)}
        />

        <MenuItem
          icon="list-outline"
          title="Commands"
          description="Manage command list"
          onPress={() => router.push(`/bots/manage/commands?id=${id}`)}
        />

        <MenuItem
          icon="people-outline"
          title="Groups"
          description="Manage joined groups"
          onPress={() => router.push(`/bots/manage/groups?id=${id}`)}
        />

        <MenuItem
          icon="link-outline"
          title="Session"
          description="Manage pairing session"
          onPress={() => router.push(`/bots/manage/session?id=${id}`)}
        />

        <MenuItem
          icon="document-text-outline"
          title="Logs"
          description="View bot activity logs"
          onPress={() => router.push(`/bots/manage/logs?id=${id}`)}
        />

        <MenuItem
          icon="extension-puzzle-outline"
          title="Plugins"
          description="Installed plugins"
          onPress={() => router.push(`/bots/manage/plugins?id=${id}`)}
        />

        {/* Danger Zone */}

        <Text style={styles.sectionTitle}>Danger Zone</Text>

        <View style={styles.dangerCard}>
          <Pressable
            style={styles.dangerItem}
            onPress={clearSession}
          >
            <Ionicons
              name="refresh-circle-outline"
              size={22}
              color={COLORS.danger}
            />

            <Text style={styles.dangerText}>Clear Session</Text>
          </Pressable>

          <Pressable
            style={styles.dangerItem}
            onPress={removeDeployment}
          >
            <Ionicons name="trash-outline" size={22} color={COLORS.danger} />

            <Text style={styles.dangerText}>Delete Bot</Text>
          </Pressable>
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

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function ActionCard({
  icon,
  title,
  description,
  onPress,
}: {
  icon: any;
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.actionCard} onPress={onPress}>
      <Ionicons name={icon} size={24} color={COLORS.primary} />

      <Text style={styles.actionTitle}>{title}</Text>

      <Text style={styles.actionDescription}>{description}</Text>
    </Pressable>
  );
}

function MenuItem({
  icon,
  title,
  description,
  onPress,
}: {
  icon: any;
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={22} color={COLORS.primary} />

        <View>
          <Text style={styles.menuTitle}>{title}</Text>

          <Text style={styles.menuDescription}>{description}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color={COLORS.tabInactive} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  hero: {
    backgroundColor: COLORS.white,
    padding: 24,
    alignItems: "center",
  },

  botName: {
    fontSize: 24,
    fontWeight: "700",
  },

  platformText: {
    color: COLORS.muted,
    marginTop: 6,
  },

  statusBadge: {
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },

  statusText: {
    color: COLORS.successDark,
    fontWeight: "600",
  },

  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    padding: 20,
    ...SHADOWS.sm,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },

  label: {
    color: COLORS.muted,
    fontSize: 14,
  },

  value: {
    fontWeight: "700",
    color: COLORS.text,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  statCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    ...SHADOWS.sm,
  },

  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
  },

  statTitle: {
    marginTop: 6,
    color: COLORS.muted,
    fontSize: 13,
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.successLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  sessionText: {
    marginTop: 10,
    color: COLORS.muted,
    fontSize: 13,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  actionCard: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 12,
    ...SHADOWS.sm,
  },

  actionTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },

  actionDescription: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 4,
    textAlign: "center",
  },

  menuItem: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  menuTitle: {
    fontWeight: "500",
  },

  menuDescription: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },

  dangerCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 40,
    borderRadius: 18,
    padding: 18,
  },

  dangerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },

  dangerText: {
    color: COLORS.danger,
    fontWeight: "700",
  },
});
