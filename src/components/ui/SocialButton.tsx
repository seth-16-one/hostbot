import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export default function SocialButton({ title, icon, onPress }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Pressable
      style={styles.button}
      android_ripple={{
        color: theme.colors.ripple,
        borderless: false,
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color={theme.colors.text} />

      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    button: {
      height: 56,

      marginTop: 12,

      borderRadius: 16,

      borderWidth: 1,
      borderColor: theme.colors.border,

      backgroundColor: theme.colors.card,

      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",

      gap: 10,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 2,
      },

      elevation: 2,
    },

    text: {
      color: theme.colors.text,

      fontSize: 15,
      fontWeight: "700",
    },
  });
}
