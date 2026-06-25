import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const installedPlugins = [
  {
    id: 1,
    name: "AI Assistant",
    status: "Enabled",
  },

  {
    id: 2,
    name: "Anti-Link",
    status: "Enabled",
  },

  {
    id: 3,
    name: "Welcome Messages",
    status: "Enabled",
  },
];

const availablePlugins = [
  "TikTok Downloader",
  "YouTube Downloader",
  "Auto React",
  "Level System",
  "Economy System",
];

export default function PluginsScreen() {
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Plugins" subtitle="Manage Bot Features" showBack />

        <Text style={styles.sectionTitle}>Installed Plugins</Text>

        {installedPlugins.map((plugin) => (
          <View key={plugin.id} style={styles.card}>
            <View style={styles.row}>
              <View>
                <Text style={styles.pluginName}>{plugin.name}</Text>

                <Text style={styles.enabled}>{plugin.status}</Text>
              </View>

              <Ionicons
                name="checkmark-circle"
                size={24}
                color={COLORS.primary}
              />
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Available Plugins</Text>

        {availablePlugins.map((plugin) => (
          <View key={plugin} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.pluginName}>{plugin}</Text>

              <Pressable style={styles.installButton}>
                <Text style={styles.installText}>Install</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },

  card: {
    backgroundColor: COLORS.white,

    marginHorizontal: 16,
    marginBottom: 12,

    borderRadius: 18,

    padding: 18,
  },

  row: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  pluginName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },

  enabled: {
    color: COLORS.primary,
    marginTop: 4,
  },

  installButton: {
    backgroundColor: COLORS.primary,

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 12,
  },

  installText: {
    color: COLORS.white,
    fontWeight: "700",
  },
});
