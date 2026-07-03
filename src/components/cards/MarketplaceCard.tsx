import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type MarketplaceCardProps = {
  icon: any;
  name: string;
  description: string;
  minimumCreditsRequired: number;
  hourlyUsage: number;
  rating?: number;
  featured?: boolean;
  status?: string;
  onPress?: () => void;
};

export default function MarketplaceCard({
  icon,
  name,
  description,
  minimumCreditsRequired,
  hourlyUsage,
  rating,
  featured,
  status,
  onPress,
}: MarketplaceCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color={theme.colors.success} />
        </View>

        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.name}>
            {name}
          </Text>
        </View>
      </View>

      <Text numberOfLines={2} style={styles.description}>
        {description}
      </Text>

      {featured && (
        <View style={styles.popularBadge}>
          <Ionicons name="flame" size={12} color="#F97316" />

          <Text style={styles.popularText}>Popular</Text>
        </View>
      )}

      {status === "maintenance" && (
        <View style={styles.maintenanceBadge}>
          <Text style={styles.maintenanceText}>Maintenance</Text>
        </View>
      )}

      <View style={styles.statsContainer}>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#F59E0B" />

          <Text style={styles.rating}>{rating?.toFixed(1)}</Text>
        </View>

        <Text style={styles.stat}>
          Deploy: {minimumCreditsRequired} Credits
        </Text>

        <Text style={styles.stat}>Run: {hourlyUsage} Credits/hr</Text>
      </View>

      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>View Details</Text>
      </Pressable>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      width: "48%",

      backgroundColor: theme.colors.card,

      padding: 14,

      borderRadius: 20,

      marginBottom: 14,

      borderWidth: 1,
      borderColor: theme.colors.border,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 5,
      },

      elevation: 4,
    },

    topRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    iconContainer: {
      width: 46,
      height: 46,

      borderRadius: 23,

      backgroundColor: theme.colors.successLight,

      justifyContent: "center",
      alignItems: "center",
    },

    titleRow: {
      flex: 1,
      justifyContent: "center",
    },

    name: {
      flex: 1,

      fontSize: 15,

      fontWeight: "800",

      color: theme.colors.text,
    },

    description: {
      color: theme.colors.secondaryText,

      fontSize: 12,

      marginTop: 12,

      lineHeight: 18,

      minHeight: 36,
    },

    popularBadge: {
      flexDirection: "row",
      alignItems: "center",

      alignSelf: "flex-start",

      backgroundColor: "#FFF7ED",

      paddingHorizontal: 8,
      paddingVertical: 4,

      borderRadius: 999,

      marginTop: 10,
    },

    popularText: {
      marginLeft: 4,

      color: "#F97316",

      fontSize: 11,

      fontWeight: "700",
    },

    maintenanceBadge: {
      alignSelf: "flex-start",

      backgroundColor: theme.colors.dangerLight,

      paddingHorizontal: 8,
      paddingVertical: 4,

      borderRadius: 999,

      marginTop: 10,
    },

    maintenanceText: {
      color: theme.colors.danger,

      fontSize: 11,

      fontWeight: "700",
    },

    statsContainer: {
      marginTop: 14,
    },

    ratingRow: {
      flexDirection: "row",
      alignItems: "center",

      marginBottom: 8,
    },

    rating: {
      marginLeft: 4,

      color: theme.colors.text,

      fontWeight: "700",

      fontSize: 13,
    },

    stat: {
      color: theme.colors.muted,

      fontSize: 12,

      marginBottom: 4,
    },

    button: {
      marginTop: 16,

      backgroundColor: theme.colors.successLight,

      borderWidth: 1,
      borderColor: theme.colors.primary,

      borderRadius: 12,

      paddingVertical: 10,

      alignItems: "center",
    },

    buttonText: {
      color: theme.colors.success,

      fontWeight: "700",

      fontSize: 14,
    },
  });
}
