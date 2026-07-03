import { useTheme } from "@/theme";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  children: ReactNode;
}

export default function AuthCard({ children }: Props) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,

          shadowColor: theme.colors.shadow,

          shadowOpacity: theme.dark ? 0.25 : 0.12,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,

    borderWidth: 1,

    padding: 24,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowRadius: 20,

    elevation: 10,
  },
});
