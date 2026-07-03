import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RADIUS, SPACING } from "@/constants/theme";
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
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.colors.primary,
          paddingTop: insets.top - 2,
        },
      ]}
    >
      <View style={styles.topRow}>
        {showBack ? (
          <Pressable
            style={[
              styles.backButton,
              {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            ]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color={theme.colors.white} />
          </Pressable>
        ) : (
          <View style={{ width: 44 }} />
        )}

        <Text
          style={[
            styles.title,
            {
              color: theme.colors.white,
            },
          ]}
        >
          {title}
        </Text>

        <View style={{ width: 44 }} />
      </View>

      {!!subtitle && (
        <Text
          style={[
            styles.subtitle,
            {
              color: "rgba(255,255,255,0.88)",
            },
          ]}
        >
          {subtitle}
        </Text>
      )}

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
    paddingHorizontal: SPACING.lg,
    paddingBottom: 16,

    borderBottomLeftRadius: RADIUS.header,
    borderBottomRightRadius: RADIUS.header,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
  },

  subtitle: {
    textAlign: "center",
    marginTop: 2,
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
  },

  searchWrapper: {
    marginTop: 16,
  },
});
