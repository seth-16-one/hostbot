import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { system } from "@/data";

const status = system.serverStatus;

import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ServerDetailsScreen() {
  const { id } = useLocalSearchParams();

  const server = status.find((item) => item.id === String(id));

  if (!server) {
    return (
      <View style={styles.center}>
        <Text>Server not found</Text>
      </View>
    );
  }

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader title="Server Details" showBack />

        <View style={styles.content}>
          <Text style={styles.serverName}>{server.name}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{server.status.toUpperCase()}</Text>
          </View>

          <View style={styles.infoCard}>
            <InfoRow label="Uptime" value={server.uptime} />

            <InfoRow label="Location" value={server.location} />

            <InfoRow label="CPU Usage" value={server.cpu} />

            <InfoRow label="RAM Usage" value={server.ram} />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
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

  content: {
    padding: 20,
  },

  serverName: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },

  badge: {
    alignSelf: "flex-start",
    marginTop: 12,
    backgroundColor: "COLORS.successBg",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: COLORS.successDark,
    fontWeight: "600",
  },

  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginTop: 20,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  label: {
    color: COLORS.muted,
  },

  value: {
    fontWeight: "600",
    color: COLORS.text,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
