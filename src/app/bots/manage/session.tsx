import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS, SHADOWS } from "@/constants";
import { deployments } from "@/data";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SessionScreen() {
  const { id } = useLocalSearchParams();

  const bot = deployments.find((item) => item.id === Number(id));

  if (!bot) {
    return (
      <View style={styles.center}>
        <Text>Session not found</Text>
      </View>
    );
  }

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Session" subtitle={bot.name} showBack />

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Session Information</Text>

          <InfoRow label="Session Name" value={bot.sessionName} />

          <InfoRow label="Connected Number" value={bot.ownerNumber} />

          <InfoRow label="Platform" value={bot.platform} />

          <InfoRow label="Status" value={bot.status} />

          <InfoRow label="Deployment Date" value={bot.deployedAt} />
        </View>

        <Text style={styles.sectionTitle}>Session Actions</Text>

        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>Refresh Session</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>Generate Pair Code</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>Generate QR Code</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Danger Zone</Text>

        <Pressable style={styles.dangerButton}>
          <Text style={styles.dangerText}>Clear Session</Text>
        </Pressable>

        <Pressable style={styles.dangerButton}>
          <Text style={styles.dangerText}>Re-Pair Device</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "COLORS.background",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: COLORS.white,
    margin: 16,
    marginBottom: 0,
    padding: 20,
    borderRadius: 20,

    ...SHADOWS.sm,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "COLORS.text",

    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 12,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },

  actionButton: {
    backgroundColor: COLORS.white,

    marginHorizontal: 16,
    marginBottom: 12,

    padding: 18,

    borderRadius: 18,

    alignItems: "center",

    ...SHADOWS.sm,
  },

  actionText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
  },

  dangerButton: {
    backgroundColor: COLORS.white,

    marginHorizontal: 16,
    marginBottom: 12,

    padding: 18,

    borderRadius: 18,

    borderWidth: 1,
    borderColor: COLORS.dangerBorder,

    alignItems: "center",
  },

  dangerText: {
    color: "COLORS.danger",
    fontWeight: "700",
    fontSize: 15,
  },
});
