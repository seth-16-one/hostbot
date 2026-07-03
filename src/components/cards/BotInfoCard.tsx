import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type BotInfoCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function BotInfoCard({ title, children }: BotInfoCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      {children}
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,

      marginHorizontal: 16,
      marginBottom: 16,

      padding: 20,

      borderRadius: 22,

      borderWidth: 1,
      borderColor: theme.colors.border,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 5,
      },

      elevation: 4,
    },

    title: {
      color: theme.colors.text,

      fontSize: 17,
      fontWeight: "800",

      marginBottom: 16,
    },
  });
}
