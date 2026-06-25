import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  onPress: () => void;
}

export default function SocialLogin({ onPress }: Props) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={[
        styles.button,
        {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
        },
      ]}
      onPress={onPress}
    >
      <Ionicons name="logo-google" size={20} color={theme.colors.text} />

      <Text
        style={[
          styles.text,
          {
            color: theme.colors.text,
          },
        ]}
      >
        Continue with Google
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  text: {
    fontSize: 16,
    fontWeight: "700",
  },
});
