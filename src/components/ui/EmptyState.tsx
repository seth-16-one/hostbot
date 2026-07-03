import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  description?: string;
};

export default function EmptyState({
  icon = "cube-outline",
  title,
  subtitle,
  description,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={58} color={theme.colors.muted} />
      </View>

      <Text style={styles.title}>{title}</Text>

      {!!(subtitle || description) && (
        <Text style={styles.subtitle}>{description || subtitle}</Text>
      )}
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",

      paddingHorizontal: 32,
      paddingVertical: 48,
    },

    iconContainer: {
      width: 92,
      height: 92,

      borderRadius: 46,

      backgroundColor: theme.colors.surface,

      justifyContent: "center",
      alignItems: "center",

      marginBottom: 20,
    },

    title: {
      color: theme.colors.text,

      fontSize: 20,
      fontWeight: "800",

      textAlign: "center",
    },

    subtitle: {
      marginTop: 10,

      color: theme.colors.secondaryText,

      fontSize: 15,
      lineHeight: 24,

      textAlign: "center",
    },
  });
}
