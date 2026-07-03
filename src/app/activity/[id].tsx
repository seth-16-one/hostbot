import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { system } from "@/data";
import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const activities = system.activity;

import { useLocalSearchParams } from "expo-router";

export default function ActivityReader() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { id } = useLocalSearchParams();

  const activity = activities.find((item) => String(item.id) === String(id));

  if (!activity) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>No Activity Found</Text>

        <Text style={styles.emptySubtitle}>
          This activity doesn't exist or has been removed.
          {"\n\n"}
          Deploy a bot to begin tracking deployments, server events, billing and
          account activity.
        </Text>
      </View>
    );
  }

  return (
    <Screen backgroundColor={theme.colors.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Activity Details" showBack />

        <View style={styles.content}>
          <Text style={styles.title}>{activity.title}</Text>

          <Text style={styles.time}>{activity.time}</Text>

          <View style={styles.card}>
            <Text style={styles.section}>Description</Text>

            <Pressable
              onLongPress={() => {
                // Clipboard will be added later
              }}
            >
              <Text selectable style={styles.body}>
                {activity.description}
              </Text>
            </Pressable>
          </View>

          {activity?.link && (
            <View style={[styles.card, { marginTop: 16 }]}>
              <Text style={styles.section}>Related Link</Text>

              <Pressable onPress={() => Linking.openURL(activity.link!)}>
                <Text style={styles.link}>{activity.link}</Text>
              </Pressable>
            </View>
          )}
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

    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 20,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    title: {
      fontSize: 26,
      fontWeight: "800",
      color: theme.colors.text,
    },

    time: {
      marginTop: 8,
      color: theme.colors.primary,
      fontWeight: "600",
    },

    section: {
      marginBottom: 14,
      fontSize: 17,
      fontWeight: "700",
      color: theme.colors.text,
    },

    body: {
      fontSize: 16,
      lineHeight: 28,
      color: theme.colors.secondaryText,
    },

    link: {
      marginTop: 16,
      color: theme.colors.primary,
      fontWeight: "700",
      textDecorationLine: "underline",
    },

    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 32,
      backgroundColor: theme.colors.background,
    },

    emptyTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.colors.text,
    },

    emptySubtitle: {
      marginTop: 12,
      textAlign: "center",
      lineHeight: 26,
      color: theme.colors.muted,
    },
  });
}
