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
        style={{
          color: theme.colors.subtitleText,
        }}
      >
        {text}
      </Text>

      <Pressable onPress={onPress}>
        <Text
          style={[
            styles.link,
            {
              color: theme.colors.primary,
            },
          ]}
        >
          {action}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },

  link: {
    fontWeight: "700",
  },
});
