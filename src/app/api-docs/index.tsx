import PageHeader from "@/components/layout/PageHeader";
import { COLORS } from "@/constants";
import { docs } from "@/data";

const apiDocs = docs.api;

import { StyleSheet, Text, View } from "react-native";

export default function ApiDocsScreen() {
  return (
    <View style={styles.container}>
      <PageHeader
        title="API Documentation"
        subtitle="Developer resources"
        showBack
      />

      <View style={styles.content}>
        <Text style={styles.title}>Base URL</Text>

        <Text style={styles.code}>https://api.hostbot.app</Text>

        <Text style={styles.title}>Available Endpoints</Text>

        {apiDocs.map((item) => (
          <View key={item.id} style={styles.endpointCard}>
            <Text style={styles.endpointTitle}>{item.title}</Text>

            <Text style={styles.endpointDescription}>{item.description}</Text>
          </View>
        ))}
      </View>
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

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 20,
  },

  code: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    color: COLORS.primary,
  },

  text: {
    marginBottom: 10,
    color: COLORS.subtitleText,
  },

  endpointCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },

  endpointTitle: {
    fontWeight: "700",
    color: COLORS.text,
  },

  endpointDescription: {
    marginTop: 6,
    color: COLORS.muted,
  },
});
