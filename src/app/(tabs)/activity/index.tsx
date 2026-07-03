import ActivityCard from "@/components/cards/ActivityCard";
import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { system } from "@/data";
import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { router } from "expo-router";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const activities = system.activity;

import { useState } from "react";

export default function ActivityScreen() {
  const { theme } = useTheme();

  const styles = createStyles(theme);

  const [selectedFilter, setSelectedFilter] = useState("All");
  const filteredActivities =
    selectedFilter === "All"
      ? activities
      : activities.filter((item) => item.category === selectedFilter);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);

      // Future:
      // await activityService.getActivities();

      await new Promise((resolve) => setTimeout(resolve, 800));
    } finally {
      setRefreshing(false);
    }
  };

  const todayCount = activities.length;
  const weekCount = activities.length;
  return (
    <Screen backgroundColor={theme.colors.primary}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PageHeader
          title="Activity"
          subtitle="Recent account activity"
          showSearch
          searchPlaceholder="Search Activity..."
        />

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{todayCount}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{weekCount}</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {["All", "Bots", "Billing", "Hosting", "Security"].map((filter) => (
            <Pressable
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={
                selectedFilter === filter ? styles.activeChip : styles.chip
              }
            >
              <Text
                style={
                  selectedFilter === filter
                    ? styles.activeChipText
                    : styles.chipText
                }
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Activity Feed */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Today</Text>

          {filteredActivities.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No activities found</Text>
            </View>
          ) : (
            filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                time={activity.time}
                type={activity.type}
                onPress={() =>
                  router.push({
                    pathname: "/activity/[id]",
                    params: {
                      id: String(activity.id),
                    },
                  } as any)
                }
              />
            ))
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

    statsRow: {
      flexDirection: "row",
      gap: 12,
      paddingHorizontal: 20,
      marginTop: 20,
    },

    statCard: {
      flex: 1,
      backgroundColor: theme.colors.card,
      borderRadius: 18,
      padding: 18,
      alignItems: "center",

      borderWidth: 1,
      borderColor: theme.colors.border,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 3,
    },

    statValue: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.colors.text,
    },

    statLabel: {
      marginTop: 4,
      color: theme.colors.muted,
      fontWeight: "600",
    },

    filterContainer: {
      paddingHorizontal: 20,
      paddingVertical: 18,
      gap: 10,
    },

    activeChip: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 20,
    },

    activeChipText: {
      color: theme.colors.white,
      fontWeight: "700",
    },

    chip: {
      backgroundColor: theme.colors.card,
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 20,

      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    chipText: {
      color: theme.colors.secondaryText,
      fontWeight: "600",
    },

    content: {
      paddingHorizontal: 20,
      paddingBottom: 30,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 16,
      color: theme.colors.text,
    },

    emptyContainer: {
      alignItems: "center",
      paddingVertical: 40,
    },

    emptyText: {
      color: theme.colors.muted,
      fontSize: 15,
      fontWeight: "600",
    },
  });
}
