import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type Props = {
  children: ReactNode;
};

export default function OtpCard({ children }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return <View style={styles.card}>{children}</View>;
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,

      borderRadius: 28,

      padding: 24,

      borderWidth: 1,
      borderColor: theme.colors.border,

      shadowColor: theme.colors.shadow,
      shadowOpacity: theme.dark ? 0.22 : 0.08,
      shadowRadius: 18,
      shadowOffset: {
        width: 0,
        height: 10,
      },

      elevation: 8,
    },
  });
}
