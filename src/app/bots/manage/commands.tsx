import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const commandCategories = [
  {
    title: "AI Commands",
    commands: ["ai", "gpt", "image", "chat"],
  },

  {
    title: "Download Commands",
    commands: ["play", "video", "tiktok", "instagram"],
  },

  {
    title: "Admin Commands",
    commands: ["kick", "ban", "mute", "warn"],
  },

  {
    title: "Fun Commands",
    commands: ["meme", "joke", "quote"],
  },
];

export default function CommandsScreen() {
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader
          title="Commands"
          subtitle="Available Bot Commands"
          showBack
        />

        {commandCategories.map((category) => (
          <View key={category.title} style={styles.card}>
            <Text style={styles.categoryTitle}>{category.title}</Text>

            {category.commands.map((command) => (
              <View key={command} style={styles.commandItem}>
                <Text style={styles.commandText}>.{command}</Text>
              </View>
            ))}
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

  card: {
    backgroundColor: COLORS.white,
    margin: 16,
    marginBottom: 0,
    padding: 18,
    borderRadius: 18,
  },

  categoryTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: COLORS.text,
  },

  commandItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },

  commandText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
