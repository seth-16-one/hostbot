import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { system } from "@/data";

const activities = system.activity;

import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ActivityReader() {
  const { id } = useLocalSearchParams();

  console.log("Route ID:", id);
  console.log("Activities:", activities);

  const activity = activities.find((item) => item.id.toString() === String(id));

  if (!activity) {
    return (
      <View style={styles.center}>
        <Text>Activity not found</Text>
      </View>
    );
  }

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Activity Details" showBack />

        <View style={styles.content}>
          <Text style={styles.title}>{activity.title}</Text>

          <Text style={styles.time}>{activity.time}</Text>

          <Text style={styles.body}>{activity.description}</Text>
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

  content: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },

  time: {
    marginTop: 8,
    color: COLORS.muted,
  },

  body: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 28,
    color: COLORS.secondaryText,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
