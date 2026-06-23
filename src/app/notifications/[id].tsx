import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { system } from "@/data";

const notifications = system.notifications;

import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function NotificationReader() {
  const { id } = useLocalSearchParams();

  console.log("Route ID:", id);
  console.log("Notifications:", notifications);

  const notification = notifications.find(
    (item) => String(item.id) === String(id),
  );

  if (!notification) {
    return (
      <View style={styles.center}>
        <Text>Notification not found</Text>
      </View>
    );
  }

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Notification" showBack />

        <View style={styles.content}>
          <Text style={styles.title}>{notification.title}</Text>

          <Text style={styles.date}>{notification.date}</Text>

          <Text style={styles.body}>{notification.content}</Text>
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

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  date: {
    color: COLORS.muted,
    marginTop: 8,
  },

  body: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 28,
    color: COLORS.secondaryText,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
