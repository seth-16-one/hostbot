import { useTheme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  text?: string;
};

export default function Divider({ text = "OR CONTINUE WITH" }: Props) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.line,
          {
            backgroundColor: theme.colors.border,
          },
        ]}
      />

      <Text
        style={[
          styles.text,
          {
            color: theme.colors.muted,
          },
        ]}
      >
        {text}
      </Text>

      <View
        style={[
          styles.line,
          {
            backgroundColor: theme.colors.border,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    marginVertical: 22,
  },

  line: {
    flex: 1,
    height: 1,
    opacity: 0.9,
  },

  text: {
    marginHorizontal: 16,

    fontSize: 12,
    fontWeight: "700",

    letterSpacing: 1.2,

    textTransform: "uppercase",
  },
});
