import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const groups = [
  {
    id: 1,
    name: "Developers Hub",
    members: 250,
    admins: 5,
  },

  {
    id: 2,
    name: "Telmass Team",
    members: 45,
    admins: 3,
  },

  {
    id: 3,
    name: "SethBot Community",
    members: 1200,
    admins: 8,
  },
];

export default function GroupsScreen() {
  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader
          title="Groups"
          subtitle="Connected WhatsApp Groups"
          showBack
        />

        {groups.map((group) => (
          <View key={group.id} style={styles.card}>
            <Text style={styles.groupName}>{group.name}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Members</Text>

              <Text style={styles.value}>{group.members}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Admins</Text>

              <Text style={styles.value}>{group.admins}</Text>
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

  card: {
    backgroundColor: COLORS.white,

    marginHorizontal: 16,
    marginTop: 12,

    padding: 18,

    borderRadius: 18,
  },

  groupName: {
    fontSize: 16,
    fontWeight: "700",

    marginBottom: 12,

    color: COLORS.text,
  },

  row: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 8,
  },

  label: {
    color: COLORS.muted,
  },

  value: {
    fontWeight: "700",
    color: COLORS.primary,
  },
});
