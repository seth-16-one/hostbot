import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SupportScreen() {
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader
          title="Support"
          subtitle="Get help and resources"
          showBack
        />

        <View style={styles.content}>
          {/* Contact Support */}

          <Text style={styles.sectionTitle}>Contact Support</Text>

          <View style={styles.card}>
            <MenuItem
              icon="logo-whatsapp"
              title="WhatsApp Support"
              subtitle="Chat with our support team"
              onPress={() => {}}
            />

            <MenuItem
              icon="mail-outline"
              title="Email Support"
              subtitle="support@hostbot.app"
              onPress={() => {}}
            />

            <MenuItem
              icon="chatbubble-ellipses-outline"
              title="Live Chat"
              subtitle="Available 24/7"
              onPress={() => {}}
            />

            <MenuItem
              icon="ticket-outline"
              title="Submit Ticket"
              subtitle="Open a support request"
              onPress={() => router.push("/support/ticket" as any)}
            />
          </View>

          {/* Resources */}

          <Text style={styles.sectionTitle}>Resources</Text>

          <View style={styles.card}>
            <MenuItem
              icon="book-outline"
              title="Documentation"
              subtitle="Guides and tutorials"
              onPress={() => router.push("/documentation" as any)}
            />

            <MenuItem
              icon="code-slash-outline"
              title="API Documentation"
              subtitle="Developer resources"
              onPress={() => router.push("/api-docs" as any)}
            />

            <MenuItem
              icon="help-circle-outline"
              title="Frequently Asked Questions"
              subtitle="Common answers"
              onPress={() => router.push("/faq" as any)}
            />
          </View>

          {/* System Health */}

          <Text style={styles.sectionTitle}>System Health</Text>

          <View style={styles.card}>
            <MenuItem
              icon="server-outline"
              title="Server Status"
              subtitle="Infrastructure health"
              onPress={() => router.push("/server-status" as any)}
            />
          </View>

          {/* Status Summary */}

          <View style={styles.statusCard}>
            <View style={styles.statusRow}>
              <View style={styles.onlineDot} />

              <Text style={styles.statusText}>All Systems Operational</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function MenuItem({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: any;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={22} color={COLORS.primary} />

        <View>
          <Text style={styles.menuTitle}>{title}</Text>

          <Text style={styles.menuSubtitle}>{subtitle}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color={COLORS.tabInactive} />
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
    flex: 1,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },

  menuSubtitle: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 4,
  },

  statusCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },

  statusText: {
    color: COLORS.successDark,
    fontWeight: "600",
  },
});
