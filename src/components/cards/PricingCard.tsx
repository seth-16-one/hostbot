import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

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
  const { theme } = useTheme();
  const styles = createStyles(theme);

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

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,

      borderRadius: 22,

      padding: 20,

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

    featuredCard: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },

    title: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.colors.text,
    },

    price: {
      marginTop: 10,

      fontSize: 24,
      fontWeight: "800",

      color: theme.colors.primary,
    },

    description: {
      marginTop: 10,

      color: theme.colors.muted,

      fontSize: 14,

      lineHeight: 22,
    },

    button: {
      marginTop: 18,

      height: 48,

      borderRadius: 14,

      backgroundColor: theme.colors.primary,

      justifyContent: "center",
      alignItems: "center",
    },

    buttonText: {
      color: theme.colors.white,
      fontWeight: "800",
      fontSize: 15,
    },
  });
}
