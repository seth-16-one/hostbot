import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: Props) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.logo,
          {
            backgroundColor: theme.colors.primary,

            shadowColor: theme.colors.primary,
          },
        ]}
      >
        <Ionicons
          name="hardware-chip-outline"
          size={38}
          color={theme.colors.white}
        />
      </View>

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

      <Text
        style={[
          styles.subtitle,
          {
            color: theme.dark
              ? "rgba(255,255,255,0.78)"
              : "rgba(255,255,255,0.88)",
          },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    marginBottom: 38,
  },

  logo: {
    width: 92,
    height: 92,

    borderRadius: 46,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 22,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.28,

    shadowRadius: 20,

    elevation: 10,
  },

  title: {
    fontSize: 30,

    fontWeight: "800",

    marginBottom: 10,

    letterSpacing: 0.3,
  },

  subtitle: {
    fontSize: 15,

    textAlign: "center",

    lineHeight: 24,

    paddingHorizontal: 24,
  },
});
