import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader
          title="About Host Bot"
          subtitle="Bot hosting made simple"
          showBack
        />

        <View style={styles.content}>
          {/* Logo */}

          <View style={styles.logoCard}>
            <Ionicons name="server-outline" size={60} color={COLORS.primary} />

            <Text style={styles.appName}>Host Bot</Text>

            <Text style={styles.version}>Version 1.0.0</Text>
          </View>

          {/* Description */}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>About</Text>

            <Text style={styles.description}>
              Host Bot is a modern bot hosting platform designed to help users
              deploy, monitor, manage, and scale WhatsApp bots from anywhere.
              The platform provides server monitoring, bot management, support,
              analytics, and billing tools in one place.
            </Text>
          </View>

          {/* Mission */}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Our Mission</Text>

            <Text style={styles.description}>
              To make bot hosting simple, reliable, and accessible for everyone.
            </Text>
          </View>

          {/* Company */}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Company</Text>

            <InfoRow label="Platform" value="Host Bot" />

            <InfoRow label="Developer" value="Telmass" />

            <InfoRow label="Version" value="1.0.0" />
          </View>

          {/* Contact */}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Contact</Text>

            <InfoRow label="Email" value="support@hostbot.app" />

            <InfoRow label="Website" value="www.hostbot.app" />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>

      <Text style={styles.infoValue}>{value}</Text>
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
    paddingBottom: 40,
  },

  logoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },

  appName: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
    color: COLORS.text,
  },

  version: {
    color: COLORS.muted,
    marginTop: 4,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: COLORS.text,
  },

  description: {
    color: COLORS.subtitleText,
    lineHeight: 24,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  infoLabel: {
    color: COLORS.muted,
  },

  infoValue: {
    color: COLORS.text,
    fontWeight: "600",
  },
});
