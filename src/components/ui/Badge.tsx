import { useTheme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";

type BadgeProps = {
  text: string;
  color?: string;
};

export default function Badge({ text, color }: BadgeProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: color ?? theme.colors.primary,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: theme.colors.white,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 999,
  },

  text: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
