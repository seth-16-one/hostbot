import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function FAQScreen() {
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="FAQ" subtitle="Frequently Asked Questions" />

        <View style={styles.content}>
          <Text style={styles.question}>How do I deploy a bot?</Text>
          <Text style={styles.answer}>
            Create a bot and upload your session files.
          </Text>

          <Text style={styles.question}>How do credits work?</Text>
          <Text style={styles.answer}>
            Credits are consumed by hosted bots.
          </Text>

          <Text style={styles.question}>How do I upgrade my plan?</Text>
          <Text style={styles.answer}>
            Open Pricing & Billing from the More page.
          </Text>

          <Text style={styles.question}>Why is my bot offline?</Text>
          <Text style={styles.answer}>
            Check Server Status and Activity logs.
          </Text>
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

  question: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    color: COLORS.text,
  },

  answer: {
    color: COLORS.muted,
    marginTop: 6,
    lineHeight: 22,
  },
});
