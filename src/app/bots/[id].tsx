import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button } from "@/components/ui";
import { COLORS } from "@/constants";
import { bots } from "@/data";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function BotDetailsScreen() {
  const { id } = useLocalSearchParams();

  const bot = bots.marketplace.find((item) => item.id === Number(id));

  if (!bot) {
    return (
      <View style={styles.center}>
        <Text>Bot not found</Text>
      </View>
    );
  }

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <PageHeader
          title="Bot Details"
          subtitle="Check your bot details here"
          showBack
        />

        {/* Hero */}

        <View style={styles.hero}>
          <View style={styles.iconCircle}>
            <Ionicons name={bot.icon as any} size={42} color={COLORS.primary} />
          </View>

          <Text style={styles.name}>{bot.name}</Text>
          {bot.featured && (
            <View style={styles.popularBadge}>
              <Ionicons name="flame" size={14} color="#D97706" />

              <Text style={styles.popularText}>Popular</Text>
            </View>
          )}

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{bot.category}</Text>
          </View>

          <Text style={styles.description}>{bot.longDescription}</Text>
        </View>

        {/* Information */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Bot Information</Text>

          <InfoRow label="Version" value={bot.version} />

          <InfoRow
            label="Deployments"
            value={bot.totalDeployments.toLocaleString()}
          />

          <InfoRow label="Rating" value={`${bot.rating} ★`} />

          <InfoRow label="Last Updated" value={bot.lastUpdated} />
        </View>

        {/* Deployment */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Deployment Requirements</Text>

          <InfoRow
            label="Minimum Credits Required"
            value={`${bot.minimumCreditsRequired} Credits`}
          />

          <InfoRow
            label="Hourly Usage"
            value={`${bot.runCreditsPerHour} Credits/hr`}
          />

          <InfoRow
            label="Estimated Monthly"
            value={`${bot.runCreditsPerHour * 24 * 30} Credits`}
          />

          <InfoRow label="Available Credits" value="450 Credits" />
        </View>

        {/* Features */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Features</Text>

          {bot.features.map((feature) => (
            <Text key={feature} style={styles.item}>
              ✓ {feature}
            </Text>
          ))}
        </View>

        {/* Requirements */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Requirements</Text>

          {bot.requirements.map((item) => (
            <Text key={item} style={styles.item}>
              • {item}
            </Text>
          ))}
        </View>

        {/* Credit Card Warning Card */}
        <View style={styles.warningCard}>
          <Ionicons name="wallet-outline" size={20} color={COLORS.primary} />

          <Text style={styles.warningText}>
            Deploying this bot will consume {bot.minimumCreditsRequired}{" "}
            credits.
          </Text>
        </View>

        {/* Deploy */}
        {bot.status === "maintenance" ? (
          <View style={styles.warningCard}>
            <Ionicons name="warning-outline" size={20} color="#DC2626" />

            <Text style={styles.warningText}>
              This bot is currently under maintenance and cannot be deployed.
            </Text>
          </View>
        ) : (
          <Button
            title="Configure & Deploy"
            onPress={() => router.push(`/bots/configure/${bot.id}` as any)}
          />
        )}
      </ScrollView>
    </Screen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
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

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  hero: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    padding: 24,
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.successBg,
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 14,
    color: COLORS.text,
  },

  popularBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF3D6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 8,
  },

  popularText: {
    color: "#D97706",
    fontWeight: "700",
  },

  badge: {
    marginTop: 10,
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: COLORS.successDark,
    fontWeight: "600",
  },

  description: {
    textAlign: "center",
    marginTop: 12,
    color: COLORS.muted,
    lineHeight: 22,
  },

  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    borderRadius: 18,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  label: {
    color: COLORS.muted,
  },

  value: {
    color: COLORS.text,
    fontWeight: "600",
  },

  item: {
    marginBottom: 10,
    color: COLORS.secondaryText,
  },

  warningCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
  },

  warningText: {
    flex: 1,
    color: COLORS.text,
  },

  deployButton: {
    backgroundColor: COLORS.primary,
    margin: 16,
    padding: 18,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  deployText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
