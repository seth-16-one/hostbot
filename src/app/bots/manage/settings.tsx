import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SettingsScreen() {
  const [botName, setBotName] = useState("SethBot-MD");

  const [ownerNumber, setOwnerNumber] = useState("+254700000001");

  const [prefix, setPrefix] = useState(".");

  const [autoRestart, setAutoRestart] = useState(true);

  const [autoBackup, setAutoBackup] = useState(true);

  const [autoUpdate, setAutoUpdate] = useState(false);

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader
          title="Bot Settings"
          subtitle="Manage Configuration"
          showBack
        />

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>General</Text>

          <TextInput
            style={styles.input}
            value={botName}
            onChangeText={setBotName}
            placeholder="Bot Name"
          />

          <TextInput
            style={styles.input}
            value={ownerNumber}
            onChangeText={setOwnerNumber}
            placeholder="Owner Number"
          />

          <TextInput
            style={styles.input}
            value={prefix}
            onChangeText={setPrefix}
            placeholder="Prefix"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Automation</Text>

          <SettingRow
            title="Auto Restart"
            value={autoRestart}
            onChange={setAutoRestart}
          />

          <SettingRow
            title="Auto Backup"
            value={autoBackup}
            onChange={setAutoBackup}
          />

          <SettingRow
            title="Auto Update"
            value={autoUpdate}
            onChange={setAutoUpdate}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

function SettingRow({
  title,
  value,
  onChange,
}: {
  title: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingText}>{title}</Text>

      <Switch value={value} onValueChange={onChange} />
    </View>
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
    borderRadius: 18,
    padding: 18,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  input: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  settingText: {
    fontWeight: "600",
  },
});
