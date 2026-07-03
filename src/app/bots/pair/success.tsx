import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button } from "@/components/ui";
import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function PairingSuccessScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { deploymentId, phone, connectedAt } = useLocalSearchParams();
  const connectedTime = connectedAt
    ? new Date(String(connectedAt)).toLocaleString()
    : new Date().toLocaleString();

  return (
    <Screen backgroundColor={theme.colors.primary}>
      <View style={styles.container}>
        <PageHeader title="Pair Device" subtitle="Device linked" showBack={false} />

        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={42} color={theme.colors.successDark} />
          </View>

          <Text style={styles.title}>Device Linked Successfully</Text>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{String(phone || "-")}</Text>
          <Text style={styles.label}>Connected time</Text>
          <Text style={styles.value}>{connectedTime}</Text>
        </View>

        <Button
          title="Continue"
          onPress={() =>
            router.replace(`/bots/manage/${String(deploymentId)}` as any)
          }
        />
      </View>
    </Screen>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    card: {
      margin: 16,
      padding: 24,
      borderRadius: 18,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: "center",
    },
    iconCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: theme.colors.successBg,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 18,
    },
    title: {
      color: theme.colors.text,
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 24,
      textAlign: "center",
    },
    label: {
      color: theme.colors.muted,
      marginTop: 12,
    },
    value: {
      color: theme.colors.text,
      fontWeight: "700",
      marginTop: 4,
    },
  });
}
