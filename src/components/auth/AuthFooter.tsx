import { useTheme } from "@/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  text: string;
  action: string;
  onPress: () => void;
}

export default function AuthFooter({ text, action, onPress }: Props) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            color: theme.colors.subtitleText,
          },
        ]}
      >
        {text}
      </Text>

      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <Text
            style={[
              styles.link,
              {
                color: theme.colors.primary,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            {action}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: 6,
  },

  text: {
    fontSize: 14,

    fontWeight: "500",
  },

  link: {
    fontSize: 14,

    fontWeight: "800",
  },
});
