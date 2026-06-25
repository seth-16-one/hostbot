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

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,

    elevation: 10,
  },
});
