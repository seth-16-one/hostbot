import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants/colors";
import { system } from "@/data";

const notifications = system.notifications;

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function NotificationsScreen() {
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader
          title="Notifications"
          showSearch
          searchPlaceholder="Search Notifications..."
          showBack
        />

        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.count}>
              {notifications.length} Notifications
            </Text>

            <Text style={styles.markRead}>Mark All Read</Text>
          </View>

          {notifications.map((item) => (
            <Pressable
              key={item.id}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/notifications/[id]",
                  params: { id: item.id },
                })
              }
            >
              <View style={styles.left}>
                {!item.read && <View style={styles.dot} />}

                <View>
                  <Text style={styles.title}>{item.title}</Text>

                  <Text style={styles.message}>{item.message}</Text>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="COLORS.tabInactive"
              />
            </Pressable>
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

  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  content: {
    padding: 20,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  count: {
    fontWeight: "700",
    fontSize: 16,
  },

  markRead: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.danger,
  },

  title: {
    fontWeight: "700",
  },

  message: {
    color: COLORS.muted,
    marginTop: 4,
  },
});
