import ServerStatusCard from "@/components/cards/ServerStatusCard";
import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { system } from "@/data";

const status = system.serverStatus;

import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ServerStatusScreen() {
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader
          title="Server Status"
          subtitle="Monitor infrastructure health"
          showSearch={true}
          searchPlaceholder="Search Servers..."
          showBack
        />

        <View style={styles.content}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{status.length}</Text>

            <Text style={styles.summaryText}>Active Services</Text>
          </View>

          <Text style={styles.sectionTitle}>Infrastructure</Text>

          {status.map((server) => (
            <ServerStatusCard
              key={server.id}
              name={server.name}
              uptime={server.uptime}
              status={server.status}
              onPress={() => router.push(`/server-status/${server.id}` as any)}
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
    padding: 20,
  },

  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },

  summaryNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.primary,
  },

  summaryText: {
    marginTop: 4,
    color: COLORS.muted,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: COLORS.text,
  },
});
