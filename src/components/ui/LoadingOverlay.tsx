import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  title?: string;
  message?: string;
};

export default function LoadingOverlay({
  visible,
  title = "Please Wait",
  message = "Processing your request...",
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={theme.colors.primary} />

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    overlay: {
      flex: 1,

      justifyContent: "center",
      alignItems: "center",

      padding: 24,

      backgroundColor: "rgba(0,0,0,0.5)",
    },

    container: {
      width: "100%",
      maxWidth: 320,

      backgroundColor: theme.colors.card,

      borderRadius: 24,

      borderWidth: 1,
      borderColor: theme.colors.border,

      paddingHorizontal: 24,
      paddingVertical: 28,

      alignItems: "center",

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.15,
      shadowRadius: 18,
      shadowOffset: {
        width: 0,
        height: 8,
      },

      elevation: 12,
    },

    title: {
      marginTop: 18,

      color: theme.colors.text,

      fontSize: 20,
      fontWeight: "800",
    },

    message: {
      marginTop: 10,

      color: theme.colors.secondaryText,

      fontSize: 15,
      lineHeight: 24,

      textAlign: "center",
    },
  });
}
