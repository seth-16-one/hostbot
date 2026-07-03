import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import ConfirmModal from "@/components/ui/ConfirmModal";

import { useToast } from "@/context/ToastContext";
import { useAuthStore } from "@/store/auth";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function MoreScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const { showToast } = useToast();
  const { theme } = useTheme();

  const styles = createStyles(theme);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const confirmLogout = async () => {
    try {
      setLoggingOut(true);

      await logout();

      setShowLogoutModal(false);

      router.replace("/login" as any);
    } catch {
      showToast({
        title: "Logout Failed",
        message: "Unable to logout.",
        type: "error",
      });
    } finally {
      setLoggingOut(false);
    }
  };

  const ProfileCard = () => (
    <Pressable
      style={styles.profileCard}
      onPress={() => router.push("/profile" as any)}
    >
      <View style={styles.avatar}>
        <Ionicons name="person" size={34} color={theme.colors.white} />
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{user?.name ?? "Host Bot User"}</Text>

        <Text style={styles.profileEmail}>
          {user?.email ?? "hostbot@example.com"}
        </Text>

        <Text style={styles.profileHint}>Tap to manage your profile</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={theme.colors.iconLight}
      />
    </Pressable>
  );

  const MenuItem = ({
    icon,
    title,
    onPress,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    onPress: () => void;
  }) => (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={20} color={theme.colors.primary} />
        </View>

        <Text style={styles.menuTitle}>{title}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color={theme.colors.iconLight}
      />
    </Pressable>
  );

  return (
    <Screen backgroundColor={theme.colors.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader title="More" subtitle="Manage your account" />

        <View style={styles.content}>
          <ProfileCard />

          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.card}>
            <MenuItem
              icon="cube-outline"
              title="Wallet"
              onPress={() => router.push("/wallet" as any)}
            />

            <MenuItem
              icon="pricetag-outline"
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

          <Text style={styles.sectionTitle}>System</Text>

          <View style={styles.card}>
            <MenuItem
              icon="server-outline"
              title="Server Status"
              onPress={() => router.push("/server-status" as any)}
            />

            <MenuItem
              icon="information-circle-outline"
              title="About HostBot"
              onPress={() => router.push("/about" as any)}
            />
          </View>

          <Text style={styles.sectionTitle}>Legal</Text>

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

          <Pressable
            style={styles.logoutButton}
            onPress={() => setShowLogoutModal(true)}
          >
            <Ionicons
              name="log-out-outline"
              size={22}
              color={theme.colors.danger}
            />

            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={showLogoutModal}
        title="Logout"
        type="error"
        message="Are you sure you want to logout from your account?"
        confirmText="Logout"
        cancelText="Cancel"
        loading={loggingOut}
        onConfirm={confirmLogout}
        onCancel={() => {
          if (!loggingOut) {
            setShowLogoutModal(false);
          }
        }}
      />
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
      paddingBottom: 50,
    },

    profileCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 24,

      padding: 20,

      flexDirection: "row",
      alignItems: "center",

      borderWidth: 1,
      borderColor: theme.colors.border,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: {
        width: 0,
        height: 6,
      },

      elevation: 4,

      marginBottom: 24,
    },

    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,

      backgroundColor: theme.colors.primary,

      justifyContent: "center",
      alignItems: "center",
    },

    profileInfo: {
      flex: 1,
      marginLeft: 18,
    },

    profileName: {
      color: theme.colors.text,
      fontSize: 19,
      fontWeight: "800",
    },

    profileEmail: {
      marginTop: 4,
      color: theme.colors.secondaryText,
      fontSize: 14,
    },

    profileHint: {
      marginTop: 8,
      color: theme.colors.primary,
      fontWeight: "700",
      fontSize: 13,
    },

    sectionTitle: {
      color: theme.colors.text,
      fontSize: 17,
      fontWeight: "800",

      marginTop: 24,
      marginBottom: 12,
    },

    card: {
      backgroundColor: theme.colors.card,

      borderRadius: 22,

      borderWidth: 1,
      borderColor: theme.colors.border,

      overflow: "hidden",

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 5,
      },

      elevation: 3,
    },

    menuItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      height: 72,

      paddingHorizontal: 18,

      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },

    menuLeft: {
      flexDirection: "row",
      alignItems: "center",
    },

    iconBox: {
      width: 42,
      height: 42,

      borderRadius: 14,

      backgroundColor: theme.colors.successLight,

      justifyContent: "center",
      alignItems: "center",

      marginRight: 14,
    },

    menuTitle: {
      color: theme.colors.text,
      fontSize: 15,
      fontWeight: "700",
    },

    logoutButton: {
      marginTop: 30,

      height: 58,

      borderRadius: 18,

      borderWidth: 1,
      borderColor: theme.colors.dangerBorder,

      backgroundColor: theme.colors.card,

      justifyContent: "center",
      alignItems: "center",

      flexDirection: "row",

      gap: 10,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 2,
    },

    logoutText: {
      color: theme.colors.danger,
      fontWeight: "800",
      fontSize: 15,
    },
  });
}
