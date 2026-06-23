import PageHeader from "@/components/layout/PageHeader";
import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function DocumentationScreen() {
  return (
    <View style={styles.container}>
      <PageHeader title="Documentation" subtitle="Guides and tutorials" />

      <View style={styles.content}>
        <DocItem title="Getting Started" />
        <DocItem title="Deploying Bots" />
        <DocItem title="Managing Sessions" />
        <DocItem title="Credits & Billing" />
        <DocItem title="Server Monitoring" />
        <DocItem title="Troubleshooting" />
      </View>
    </View>
  );
}

function DocItem({ title }: { title: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{title}</Text>

      <Ionicons name="chevron-forward" size={18} color="COLORS.tabInactive" />
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

  item: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemText: {
    fontWeight: "600",
    color: COLORS.text,
  },
});
