import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const logs = [
  {
    id: 1,
    type: "success",
    message: "Bot started successfully",
    time: "10:20 AM",
  },

  {
    id: 2,
    type: "info",
    message: "Connected to WhatsApp",
    time: "10:21 AM",
  },

  {
    id: 3,
    type: "warning",
    message: "High memory usage detected",
    time: "11:05 AM",
  },

  {
    id: 4,
    type: "error",
    message: "Connection lost, retrying...",
    time: "11:20 AM",
  },
];

export default function LogsScreen() {
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Bot Logs" subtitle="Activity & Errors" showBack />

        {logs.map((log) => (
          <View key={log.id} style={styles.logCard}>
            <View
              style={[
                styles.badge,
                log.type === "success"
                  ? styles.success
                  : log.type === "error"
                    ? styles.error
                    : log.type === "warning"
                      ? styles.warning
                      : styles.info,
              ]}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.message}>{log.message}</Text>

              <Text style={styles.time}>{log.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  logCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  badge: {
    width: 12,
    height: 12,

    borderRadius: 6,
  },

  success: {
    backgroundColor: COLORS.primary,
  },

  error: {
    backgroundColor: COLORS.danger,
  },

  warning: {
    backgroundColor: COLORS.warning,
  },

  info: {
    backgroundColor: COLORS.info,
  },

  message: {
    fontWeight: "600",
    color: COLORS.text,
  },

  time: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 12,
  },
});
