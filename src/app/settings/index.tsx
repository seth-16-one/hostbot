import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { useSettingsStore, type ThemePreference } from "@/store/settings";
import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-switch";

export default function SettingsScreen() {
  const {
    pushEnabled,
    emailEnabled,
    botAlerts,
    themePreference,
    setPushEnabled,
    setEmailEnabled,
    setBotAlerts,
    setThemePreference,
  } = useSettingsStore();

  const { theme } = useTheme();

  const styles = createStyles(theme);

  return (
    <Screen backgroundColor={theme.colors.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader
          title="Settings"
          subtitle="Manage preferences and security"
          showBack
        />

        <View style={styles.content}>
          {/* GENERAL */}

          <Text style={styles.sectionTitle}>General</Text>

          <View style={styles.card}>
            <ThemeModeToggle
              theme={theme}
              value={themePreference}
              onChange={setThemePreference}
            />

            <MenuItem
              theme={theme}
              icon="language-outline"
              title="Language"
              value="English"
            />

            <MenuItem
              theme={theme}
              icon="time-outline"
              title="Timezone"
              value="Africa/Nairobi"
            />
          </View>

          {/* NOTIFICATIONS */}

          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.card}>
            <SwitchItem
              theme={theme}
              icon="notifications-outline"
              title="Push Notifications"
              value={pushEnabled}
              onValueChange={setPushEnabled}
            />

            <SwitchItem
              theme={theme}
              icon="mail-outline"
              title="Email Notifications"
              value={emailEnabled}
              onValueChange={setEmailEnabled}
            />

            <SwitchItem
              theme={theme}
              icon="chatbubble-outline"
              title="Bot Alerts"
              value={botAlerts}
              onValueChange={setBotAlerts}
            />
          </View>

          {/* SECURITY */}

          <Text style={styles.sectionTitle}>Security</Text>

          <View style={styles.card}>
            <MenuItem
              theme={theme}
              icon="lock-closed-outline"
              title="Change Password"
            />

            <MenuItem
              theme={theme}
              icon="shield-checkmark-outline"
              title="Two-Factor Authentication"
            />

            <MenuItem
              theme={theme}
              icon="phone-portrait-outline"
              title="Active Sessions"
            />
          </View>

          {/* PRIVACY */}

          <Text style={styles.sectionTitle}>Data & Privacy</Text>

          <View style={styles.card}>
            <MenuItem
              theme={theme}
              icon="download-outline"
              title="Export Data"
            />

            <MenuItem
              theme={theme}
              icon="trash-outline"
              title="Delete Account"
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function MenuItem({
  theme,
  icon,
  title,
  value,
}: {
  theme: AppTheme;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value?: string;
}) {
  const styles = createStyles(theme);

  return (
    <Pressable style={styles.item}>
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color={theme.colors.primary} />
        </View>

        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.right}>
        {value && <Text style={styles.value}>{value}</Text>}

        <Ionicons name="chevron-forward" size={18} color={theme.colors.muted} />
      </View>
    </Pressable>
  );
}

function SwitchItem({
  theme,
  icon,
  title,
  value,
  onValueChange,
}: {
  theme: AppTheme;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  const styles = createStyles(theme);

  return (
    <View style={styles.item}>
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color={theme.colors.primary} />
        </View>

        <Text style={styles.title}>{title}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        circleSize={24}
        barHeight={30}
        switchWidthMultiplier={2.1}
        circleBorderWidth={0}
        backgroundActive={theme.colors.primary}
        backgroundInactive={theme.colors.border}
        circleActiveColor={theme.colors.white}
        circleInActiveColor={theme.colors.white}
        switchLeftPx={2}
        switchRightPx={2}
        renderActiveText={false}
        renderInActiveText={false}
      />
    </View>
  );
}

function ThemeModeToggle({
  theme,
  value,
  onChange,
}: {
  theme: AppTheme;
  value: ThemePreference;
  onChange: (value: ThemePreference) => void;
}) {
  const styles = createStyles(theme);

  const options = [
    {
      value: "light" as ThemePreference,
      icon: "sunny-outline" as const,
      label: "Light",
    },
    {
      value: "dark" as ThemePreference,
      icon: "moon-outline" as const,
      label: "Dark",
    },
    {
      value: "system" as ThemePreference,
      icon: "phone-portrait-outline" as const,
      label: "System",
    },
  ];

  return (
    <View style={styles.themeContainer}>
      <Text style={styles.themeHeading}>Appearance</Text>

      <View style={styles.segment}>
        {options.map((option) => {
          const active = value === option.value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              style={[styles.segmentItem, active && styles.segmentItemActive]}
            >
              <Ionicons
                name={option.icon}
                size={20}
                color={active ? theme.colors.white : theme.colors.primary}
              />

              <Text
                style={[styles.segmentText, active && styles.segmentTextActive]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
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

    sectionTitle: {
      color: theme.colors.text,
      fontSize: 18,
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
      shadowOpacity: 0.08,
      shadowRadius: 14,
      shadowOffset: {
        width: 0,
        height: 5,
      },

      elevation: 4,
    },

    item: {
      height: 72,
      paddingHorizontal: 18,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },

    left: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },

    right: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    iconContainer: {
      width: 42,
      height: 42,

      borderRadius: 12,

      justifyContent: "center",
      alignItems: "center",

      backgroundColor: theme.colors.successLight,

      marginRight: 14,
    },

    title: {
      color: theme.colors.text,
      fontSize: 15,
      fontWeight: "700",
    },

    value: {
      color: theme.colors.muted,
      fontSize: 13,
      fontWeight: "600",
    },

    themeContainer: {
      padding: 18,
    },

    themeHeading: {
      color: theme.colors.text,
      fontSize: 15,
      fontWeight: "700",
      marginBottom: 14,
    },

    segment: {
      flexDirection: "row",

      backgroundColor: theme.colors.surface,

      borderRadius: 18,

      padding: 5,
    },

    segmentItem: {
      flex: 1,

      alignItems: "center",
      justifyContent: "center",

      borderRadius: 14,

      paddingVertical: 14,
    },

    segmentItemActive: {
      backgroundColor: theme.colors.primary,

      shadowColor: theme.colors.primary,
      shadowOpacity: 0.18,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 4,
      },

      elevation: 3,
    },

    segmentText: {
      marginTop: 6,

      color: theme.colors.primary,

      fontWeight: "700",

      fontSize: 12,
    },

    segmentTextActive: {
      color: theme.colors.white,
    },
  });
}
