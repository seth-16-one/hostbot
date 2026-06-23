import { COLORS, SHADOWS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
  return (
    <View style={styles.card}>
      {/* Top Section */}
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color={COLORS.success} />
        </View>

        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.name}>
            {name}
          </Text>
        </View>
      </View>

      {/* Description */}
      <Text numberOfLines={2} style={styles.description}>
        {description}
      </Text>

      {/* Featured */}
      {featured && (
        <View style={styles.popularBadge}>
          <Ionicons name="flame" size={12} color="#F97316" />

          <Text style={styles.popularText}>Popular</Text>
        </View>
      )}

      {/* Maintenance */}
      {status === "maintenance" && (
        <View style={styles.maintenanceBadge}>
          <Text style={styles.maintenanceText}>Maintenance</Text>
        </View>
      )}

      {/* Credits */}
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

      {/* Deploy Button */}
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>View Details</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",

    backgroundColor: COLORS.card,

    padding: 14,

    borderRadius: 18,

    marginBottom: 12,

    ...SHADOWS.sm,
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

    backgroundColor: COLORS.successBg,

    justifyContent: "center",
    alignItems: "center",
  },

  titleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  popularBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 8,
  },

  popularText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: "700",
    color: "#F97316",
  },

  maintenanceBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 8,
  },

  maintenanceText: {
    color: "#DC2626",
    fontSize: 11,
    fontWeight: "700",
  },

  name: {
    flex: 1,

    fontSize: 15,

    fontWeight: "700",

    color: COLORS.text,
  },

  description: {
    color: COLORS.muted,

    fontSize: 12,

    marginTop: 12,

    minHeight: 32,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  rating: {
    marginLeft: 4,
    color: COLORS.text,
    fontWeight: "700",
    fontSize: 13,
  },

  creditRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,

    marginTop: 12,
  },

  credits: {
    color: COLORS.success,

    fontWeight: "600",

    fontSize: 13,
  },

  button: {
    marginTop: 14,

    backgroundColor: COLORS.successLight,

    borderWidth: 1,

    borderColor: COLORS.primary,

    paddingVertical: 10,

    borderRadius: 12,

    alignItems: "center",
  },

  buttonText: {
    color: COLORS.success,

    fontWeight: "700",

    fontSize: 14,
  },

  statsContainer: {
    marginTop: 12,
  },

  stat: {
    color: COLORS.muted,
    fontSize: 12,
    marginBottom: 3,
  },
});
