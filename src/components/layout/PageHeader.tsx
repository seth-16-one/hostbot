import { COLORS } from "@/constants";
import { RADIUS, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SearchBar from "./SearchBar";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  showBack?: boolean;
};

export default function PageHeader({
  title,
  subtitle,
  showSearch = false,
  searchPlaceholder = "Search...",
  showBack = false,
}: PageHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        {showBack ? (
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={COLORS.white} />
          </Pressable>
        ) : (
          <View style={{ width: 40 }} />
        )}

        <Text style={styles.title}>{title}</Text>

        <View style={{ width: 40 }} />
      </View>

      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

      {showSearch && (
        <View style={styles.searchWrapper}>
          <SearchBar placeholder={searchPlaceholder} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 20,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomLeftRadius: RADIUS.header,
    borderBottomRightRadius: RADIUS.header,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    marginTop: SPACING.xs,
    fontSize: 15,
    fontWeight: "500",
  },

  searchWrapper: {
    marginTop: SPACING.md,
  },
});
