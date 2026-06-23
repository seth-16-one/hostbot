import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function MoreScreen() {
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader title="More" subtitle="Manage your account and system" />

        <View style={styles.content}>
          {/* Profile */}

          <Text style={styles.sectionTitle}>Profile</Text>

          <View style={styles.card}>
            <MenuItem
              icon="person-outline"
              title="My Profile"
              onPress={() => router.push("/profile" as any)}
            />
          </View>

          {/* Account */}

          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.card}>
            <MenuItem
              icon="cube-outline"
              title="Pricing & Billing"
              onPress={() => router.push("/pricing" as any)}
            />

            <MenuItem
              icon="notifications-outline"
              title="Notifications"
              onPress={() => router.push("/notifications" as any)}
            />

            <MenuItem
              icon="settings-outline"
              title="Settings"
              onPress={() => router.push("/settings" as any)}
            />
          </View>

          {/* Support */}

          <Text style={styles.sectionTitle}>Support</Text>

          <View style={styles.card}>
            <MenuItem
              icon="chatbubble-ellipses-outline"
              title="Contact Support"
              onPress={() => router.push("/support" as any)}
            />

            <MenuItem
              icon="book-outline"
              title="Documentation"
              onPress={() => {}}
            />

            <MenuItem
              icon="help-circle-outline"
              title="Help Center"
              onPress={() => {}}
            />
          </View>

          {/* System */}

          <Text style={styles.sectionTitle}>System</Text>

          <View style={styles.card}>
            <MenuItem
              icon="server-outline"
              title="Server Status"
              onPress={() => router.push("/server-status" as any)}
            />

            <MenuItem
              icon="information-circle-outline"
              title="About Host Bot"
              onPress={() => router.push("/about" as any)}
            />
          </View>

          {/* About */}
          <Text style={styles.sectionTitle}>About</Text>

          <View style={styles.card}>
            <MenuItem
              icon="document-text-outline"
              title="Terms of Service"
              onPress={() => {}}
            />

            <MenuItem
              icon="shield-outline"
              title="Privacy Policy"
              onPress={() => {}}
            />

            <MenuItem
              icon="information-circle-outline"
              title="Version"
              onPress={() => {}}
            />
          </View>

          {/* Logout */}

          <Pressable style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />

            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}

function MenuItem({
  icon,
  title,
  onPress,
}: {
  icon: any;
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={22} color={COLORS.primary} />

        <Text style={styles.menuTitle}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="COLORS.tabInactive" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 20,
    color: COLORS.text,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    overflow: "hidden",
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.text,
  },

  logoutButton: {
    backgroundColor: COLORS.white,
    marginTop: 30,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  logoutText: {
    color: COLORS.danger,
    fontWeight: "700",
    fontSize: 15,
  },
});
