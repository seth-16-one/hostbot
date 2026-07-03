import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { account } from "@/data";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader title="Profile" showBack />

        <View style={styles.content}>
          {/* Profile Card */}

          <View style={styles.profileCard}>
            <Ionicons name="person-circle" size={100} color={COLORS.primary} />

            <Text style={styles.name}>{account.userName}</Text>

            <Text style={styles.userHandle}>@{account.userName}</Text>

            <Text style={styles.email}>{account.email}</Text>

            <View style={styles.planBadge}>
              <Text style={styles.planText}>Pay As You Go</Text>
            </View>
          </View>

          {/* Stats */}

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{account.credits}</Text>

              <Text style={styles.statLabel}>Credits</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{account.runningBots}</Text>

              <Text style={styles.statLabel}>Running Bots</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCardFull}>
              <Text style={styles.statValue}>{account.messagesToday}</Text>

              <Text style={styles.statLabel}>Messages Today</Text>
            </View>
          </View>

          {/* Account Information */}

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Account Information</Text>

            <InfoRow label="Member Since" value={account.memberSince} />

            <InfoRow label="Subscription" value={account.status} />

            <InfoRow label="Status" value={account.status} isStatus={true} />

            <InfoRow label="Country" value={account.country} />

            <InfoRow label="Timezone" value={account.timezone} />

            <InfoRow label="Company" value={account.company} />

            <InfoRow label="Phone Number" value={account.phone} />
          </View>

          {/* Edit Profile */}

          <View style={styles.menuContainer}>
            <MenuItem
              icon="create-outline"
              title="Edit Profile"
              onPress={() => router.push("/profile/edit")}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function MenuItem({ icon, title, onPress }: any) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={22} color={COLORS.primary} />

        <Text style={styles.menuTitle}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={COLORS.tabInactive} />
    </Pressable>
  );
}

function InfoRow({ label, value, isStatus = false }: any) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>

      <Text style={isStatus ? styles.activeStatus : styles.infoValue}>
        {value}
      </Text>
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
  },

  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },

  userHandle: {
    color: COLORS.tabInactive,
    marginTop: 2,
  },

  email: {
    color: COLORS.muted,
    marginTop: 4,
  },

  planBadge: {
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },

  planText: {
    color: COLORS.successDark,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
  },

  statCardFull: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
  },

  statValue: {
    fontSize: 24,
    fontWeight: "700",
  },

  statLabel: {
    color: COLORS.muted,
    marginTop: 4,
  },

  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginTop: 10,
    marginBottom: 20,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  infoLabel: {
    color: COLORS.muted,
  },

  infoValue: {
    fontWeight: "600",
    color: COLORS.text,
  },

  activeStatus: {
    color: COLORS.success,
    fontWeight: "700",
  },

  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 40,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
});
