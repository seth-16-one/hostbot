import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type BotCardProps = {
  name: string;
  platform: string;
  status: string;
};

export default function BotCard({ name, platform, status }: BotCardProps) {
  const isRunning = status === "Running";

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <Ionicons
            name="hardware-chip-outline"
            size={24}
            color="COLORS.primary"
          />

          <View>
            <Text style={styles.name}>{name}</Text>

            <Text style={styles.platform}>{platform}</Text>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: isRunning
                ? "COLORS.successBg"
                : "COLORS.dangerBg",
            },
          ]}
        >
          <Text
            style={{
              color: isRunning ? COLORS.success : COLORS.danger,
              fontWeight: "600",
            }}
          >
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton}>
          <Text>Logs</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
          <Text>Restart</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
          <Text>Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },

  platform: {
    color: COLORS.muted,
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  actionButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
});
