import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ModalHeaderProps = {
  title: string;
  subtitle: string;
};

export default function ModalHeader({ title, subtitle }: ModalHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.closeButton}>
        <Ionicons name="close" size={24} color={COLORS.white} />
      </Pressable>

      <View style={styles.centerContent}>
        <Text style={styles.title}>{title}</Text>

        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "700",
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",

    justifyContent: "center",
    alignItems: "center",
  },

  centerContent: {
    alignItems: "center",
  },

  subtitle: {
    color: "rgba(255,255,255,0.85)",
    marginTop: 4,
    fontSize: 13,
  },
});
