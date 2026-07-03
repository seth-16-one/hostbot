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
      onPress={onPress}
      android_ripple={{
        color: theme.colors.primary + "20",
        borderless: false,
      }}
      style={({ pressed }) => [
        styles.button,
        {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow,
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <Ionicons name="logo-google" size={22} color={theme.colors.text} />

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
    height: 58,

    marginTop: 18,

    borderRadius: 18,

    borderWidth: 1,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 10,

    shadowOpacity: 0.06,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 2,
  },

  text: {
    fontSize: 15,
    fontWeight: "700",
  },
});
