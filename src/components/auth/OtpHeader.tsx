import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type Props = {
  title: string;
  email: string;
  subtitle?: string;
};

export default function OtpHeader({
  title,
  email,
  subtitle = "We've sent a verification code to",
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>

      <Text style={styles.email}>{email}</Text>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      alignItems: "center",

      marginBottom: 28,
    },

    title: {
      fontSize: 30,

      fontWeight: "800",

      color: theme.colors.text,
    },

    subtitle: {
      marginTop: 10,

      color: theme.colors.muted,

      textAlign: "center",

      fontSize: 15,

      lineHeight: 23,

      paddingHorizontal: 16,
    },

    email: {
      marginTop: 10,

      fontSize: 16,

      fontWeight: "800",

      color: theme.colors.primary,
    },
  });
}
