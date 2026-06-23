import ActivityCard from "@/components/cards/ActivityCard";
import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { system } from "@/data";

const activities = system.activity;

import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ActivityScreen() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filteredActivities =
    selectedFilter === "All"
      ? activities
      : activities.filter((item) => item.category === selectedFilter);

  const todayCount = activities.length;
  const weekCount = activities.length;
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader
          title="Activity"
          subtitle="Recent account activity"
          showSearch={true}
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
              />
            ))
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    elevation: 2,
  },

  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },

  statLabel: {
    color: COLORS.muted,
    marginTop: 4,
  },

  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 10,
  },

  activeChip: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },

  activeChipText: {
    color: COLORS.white,
    fontWeight: "600",
  },

  chip: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 1,
  },

  chipText: {
    color: COLORS.secondaryText,
    fontWeight: "500",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: COLORS.text,
  },

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyText: {
    color: COLORS.muted,
    fontSize: 15,
  },
});
