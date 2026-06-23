import { COLORS } from "@/constants";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  price: string;
  description: string;
  buttonText?: string;
  featured?: boolean;
  onPress?: () => void;
};

export default function PricingCard({
  title,
  price,
  description,
  featured,
  buttonText = "Select",
  onPress,
}: Props) {
  return (
    <View style={[styles.card, featured && styles.featuredCard]}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.price}>{price}</Text>

      <Text style={styles.description}>{description}</Text>

      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
  },

  featuredCard: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  price: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
    marginTop: 8,
  },

  description: {
    marginTop: 8,
    color: COLORS.muted,
    lineHeight: 22,
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 12,
    marginTop: 14,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "700",
  },
});
