import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export type StatusTone = "success" | "warning" | "error" | "info";

const tone = {
  success: { icon: "checkmark-circle", bg: COLORS.successBg, fg: COLORS.successDark },
  warning: { icon: "warning", bg: COLORS.warningBg, fg: COLORS.warning },
  error: { icon: "close-circle", bg: COLORS.dangerBg, fg: COLORS.danger },
  info: { icon: "information-circle", bg: COLORS.infoBg, fg: COLORS.infoDark },
} as const;

export default function StatusBanner({
  type = "info",
  title,
  message,
}: {
  type?: StatusTone;
  title: string;
  message?: string;
}) {
  const item = tone[type];
  return (
    <View style={[styles.banner, { backgroundColor: item.bg }]}>
      <Ionicons name={item.icon as any} size={22} color={item.fg} />
      <View style={styles.copy}>
        <Text style={[styles.title, { color: item.fg }]}>{title}</Text>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 16,
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
  },
  copy: { flex: 1 },
  title: { fontWeight: "700" },
  message: { color: COLORS.muted, marginTop: 3 },
});
