import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ModalHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function ModalHeader({ title, subtitle }: ModalHeaderProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.primary,
          paddingTop: insets.top - 2,
        },
      ]}
    >
      <Pressable
        onPress={() => router.back()}
        style={[
          styles.closeButton,
          {
            backgroundColor: "rgba(255,255,255,0.15)",
          },
        ]}
      >
        <Ionicons name="close" size={24} color={theme.colors.white} />
      </Pressable>

      <View style={styles.centerContent}>
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

        {!!subtitle && (
          <Text
            style={[
              styles.subtitle,
              {
                color: "rgba(255,255,255,0.85)",
              },
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>

      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,
    paddingBottom: 18,

    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",
  },

  centerContent: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
  },
});
