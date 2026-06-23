import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { useSettingsStore, type ThemePreference } from "@/store/settings";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

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

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader
          title="Settings"
          subtitle="Manage preferences and security"
          showBack
        />

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>General</Text>

          <View style={styles.card}>
            <ThemeModeToggle value={themePreference} onChange={setThemePreference} />

            <MenuItem
              icon="language-outline"
              title="Language"
              value="English"
            />

            <MenuItem
              icon="time-outline"
              title="Timezone"
              value="Africa/Nairobi"
            />
          </View>

          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.card}>
            <SwitchItem
              icon="notifications-outline"
              title="Push Notifications"
              value={pushEnabled}
              onValueChange={setPushEnabled}
            />

            <SwitchItem
              icon="mail-outline"
              title="Email Notifications"
              value={emailEnabled}
              onValueChange={setEmailEnabled}
            />

            <SwitchItem
              icon="chatbubble-outline"
              title="Bot Alerts"
              value={botAlerts}
              onValueChange={setBotAlerts}
            />
          </View>

          <Text style={styles.sectionTitle}>Security</Text>

          <View style={styles.card}>
            <MenuItem icon="lock-closed-outline" title="Change Password" />

            <MenuItem
              icon="shield-checkmark-outline"
              title="Two-Factor Authentication"
            />

            <MenuItem icon="phone-portrait-outline" title="Active Sessions" />
          </View>

          <Text style={styles.sectionTitle}>Data & Privacy</Text>

          <View style={styles.card}>
            <MenuItem icon="download-outline" title="Export Data" />

            <MenuItem icon="trash-outline" title="Delete Account" />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function MenuItem({
  icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value?: string;
}) {
  return (
    <Pressable style={styles.item}>
      <View style={styles.left}>
        <Ionicons name={icon} size={22} color={COLORS.primary} />

        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.right}>
        {value && <Text style={styles.value}>{value}</Text>}

        <Ionicons name="chevron-forward" size={18} color={COLORS.tabInactive} />
      </View>
    </Pressable>
  );
}

function ThemeModeToggle({
  value,
  onChange,
}: {
  value: ThemePreference;
  onChange: (value: ThemePreference) => void;
}) {
  const fade = useRef(new Animated.Value(1)).current;
  const options: { value: ThemePreference; label: string; icon: any }[] = [
    { value: "light", label: "Light", icon: "sunny-outline" },
    { value: "dark", label: "Dark", icon: "moon-outline" },
    { value: "system", label: "System", icon: "settings-outline" },
  ];

  const select = (next: ThemePreference) => {
    Animated.sequence([
      Animated.timing(fade, { toValue: 0.65, duration: 100, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 140, useNativeDriver: true }),
    ]).start();
    onChange(next);
  };

  return (
    <View style={styles.themeRow}>
      {options.map((option) => {
        const active = value === option.value;
        return (
          <Animated.View key={option.value} style={{ flex: 1, opacity: fade }}>
            <Pressable
              style={[styles.themeOption, active && styles.themeOptionActive]}
              onPress={() => select(option.value)}
            >
              <Ionicons
                name={option.icon}
                size={20}
                color={active ? COLORS.white : COLORS.primary}
              />
              <Text style={[styles.themeText, active && styles.themeTextActive]}>
                {option.label}
              </Text>
            </Pressable>
          </Animated.View>
        );
      })}
    </View>
  );
}

function SwitchItem({
  icon,
  title,
  value,
  onValueChange,
}: {
  icon: any;
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.item}>
      <View style={styles.left}>
        <Ionicons name={icon} size={22} color={COLORS.primary} />

        <Text style={styles.title}>{title}</Text>
      </View>

      <Switch value={value} onValueChange={onValueChange} />
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

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 20,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    overflow: "hidden",
  },

  item: {
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 15,
    color: COLORS.text,
  },

  value: {
    color: COLORS.muted,
    fontSize: 13,
  },
  themeRow: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
  },
  themeOption: {
    alignItems: "center",
    borderColor: COLORS.border,
    borderRadius: 14,
    borderWidth: 1,
    gap: 4,
    paddingVertical: 10,
  },
  themeOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  themeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
  },
  themeTextActive: {
    color: COLORS.white,
  },
});
