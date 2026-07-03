import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  function InfoRow({ label, value }: { label: string; value: string }) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>

        <Text style={styles.infoValue}>{value}</Text>
      </View>
    );
  }

  return (
    <Screen backgroundColor={theme.colors.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader
          title="About Host Bot"
          subtitle="Bot hosting made simple"
          showBack
        />

        <View style={styles.content}>
          {/* Logo */}

          <View style={styles.logoCard}>
            <Text style={styles.appName}>Host Bot</Text>

            <Text style={styles.version}>Version 1.0.0</Text>
          </View>

          {/* Description */}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>About</Text>

            <Text style={styles.description}>
              Host Bot is a modern cloud platform built to simplify the
              deployment, management, monitoring, and scaling of WhatsApp
              automation. Whether you're an individual developer, startup, or
              enterprise, Host Bot provides reliable infrastructure for running
              bots 24/7 with real-time monitoring, secure hosting, analytics,
              deployment management, server insights, billing, and account
              management—all from one intuitive dashboard.
              {"\n\n"}
              Our mission is to remove the complexity of hosting bots so
              developers can focus on building powerful automations while we
              handle the infrastructure.
            </Text>
          </View>

          {/* Mission */}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Our Mission</Text>

            <Text style={styles.description}>
              Our mission is to make bot hosting simple, secure, reliable, and
              accessible to everyone. We strive to provide a scalable platform
              that empowers developers and businesses to automate communication
              with confidence while delivering excellent performance and uptime.
            </Text>
          </View>

          {/* Company */}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Company</Text>

            <InfoRow label="Platform" value="Host Bot" />
            <InfoRow label="Founded By" value="Telmass" />
            <InfoRow label="Developer" value="Emmanuel Ongeri" />
            <InfoRow label="Version" value="1.0.0" />
            <InfoRow label="License" value="Proprietary" />
          </View>

          {/* Contact */}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Contact</Text>

            <InfoRow label="Email" value="anonumousseth@gmail.com" />
            <InfoRow label="Support" value="24/7 Online" />
            <InfoRow label="Developer" value="Emmanuel Ongeri" />
            <InfoRow label="Founded By" value="Telmass" />
          </View>

          {/* Core Features */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Core Features</Text>

            <Text style={styles.description}>
              • One-click bot deployment{"\n"}• WhatsApp bot hosting{"\n"}•
              Real-time monitoring{"\n"}• Secure cloud infrastructure{"\n"}•
              Usage analytics{"\n"}• Credit-based billing{"\n"}• Server status
              monitoring{"\n"}• Instant deployment management{"\n"}•
              Notifications and activity history{"\n"}• Modern responsive
              dashboard
            </Text>
          </View>

          {/*Why choose hostbot */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Why Choose Host Bot?</Text>

            <Text style={styles.description}>
              Host Bot combines powerful cloud infrastructure with an elegant
              user experience, enabling users to deploy and manage bots in
              minutes. Built with reliability, security, and scalability in
              mind, the platform is designed to grow alongside developers and
              businesses of every size.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    content: {
      padding: 20,
      paddingBottom: 40,
    },

    logoCard: {
      backgroundColor: theme.colors.card,

      borderRadius: 24,

      paddingVertical: 28,

      paddingHorizontal: 24,

      alignItems: "center",

      marginBottom: 20,

      borderWidth: 1,

      borderColor: theme.colors.border,
    },

    appName: {
      fontSize: 30,

      fontWeight: "800",

      color: theme.colors.text,
    },

    version: {
      marginTop: 8,

      fontSize: 15,

      color: theme.colors.primary,

      fontWeight: "600",
    },

    card: {
      backgroundColor: theme.colors.card,

      borderRadius: 20,

      padding: 20,

      marginBottom: 16,

      borderWidth: 1,

      borderColor: theme.colors.border,
    },

    sectionTitle: {
      fontSize: 18,

      fontWeight: "700",

      color: theme.colors.text,

      marginBottom: 14,
    },

    description: {
      color: theme.colors.subtitleText,

      fontSize: 15,

      lineHeight: 26,
    },

    infoRow: {
      flexDirection: "row",

      justifyContent: "space-between",

      alignItems: "center",

      paddingVertical: 10,

      borderBottomWidth: 1,

      borderBottomColor: theme.colors.border,
    },

    infoLabel: {
      color: theme.colors.muted,

      fontSize: 15,
    },

    infoValue: {
      color: theme.colors.text,

      fontSize: 15,

      fontWeight: "700",

      flex: 1,

      textAlign: "right",
    },
  });
}
