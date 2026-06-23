import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { deployments } from "@/data";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AnalyticsScreen() {
  const { id } = useLocalSearchParams();

  const bot = deployments.find((item) => item.id === Number(id));

  if (!bot) {
    return (
      <View style={styles.center}>
        <Text>Analytics not found</Text>
      </View>
    );
  }

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Analytics" subtitle={bot.name} showBack />

        <View style={styles.grid}>
          <StatCard title="Messages" value={bot.messages} />

          <StatCard title="Users" value={String(bot.users)} />

          <StatCard title="Groups" value={String(bot.groups)} />

          <StatCard title="Commands" value={String(bot.commandsUsed)} />
        </View>

        <View style={styles.card}>
          <InfoRow label="Credits / Hour" value={`${bot.creditsPerHour}`} />

          <InfoRow label="Uptime" value={bot.uptime} />

          <InfoRow label="Deployment Date" value={bot.deployedAt} />
        </View>
      </ScrollView>
    </Screen>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statTitle}>{title}</Text>
    </View>
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
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },

  statCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
  },

  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
  },

  statTitle: {
    marginTop: 6,
    color: COLORS.muted,
  },

  card: {
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 18,
    padding: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },

  label: {
    color: COLORS.muted,
  },

  value: {
    fontWeight: "700",
    color: COLORS.text,
  },
});
