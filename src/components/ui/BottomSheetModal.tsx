import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function BottomSheetModal({
  visible,
  title,
  subtitle,
  children,
  onClose,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{title}</Text>

              {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={22} color={theme.colors.text} />
            </Pressable>
          </View>

          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "flex-end",
    },

    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.45)",
    },

    sheet: {
      backgroundColor: theme.colors.card,

      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,

      borderTopWidth: 1,
      borderColor: theme.colors.border,

      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 28,

      minHeight: 250,
      maxHeight: "85%",

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.12,
      shadowRadius: 16,
      shadowOffset: {
        width: 0,
        height: -6,
      },

      elevation: 12,
    },

    handle: {
      width: 60,
      height: 5,

      borderRadius: 20,

      alignSelf: "center",

      backgroundColor: theme.colors.border,

      marginBottom: 18,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      marginBottom: 20,
    },

    closeButton: {
      width: 40,
      height: 40,

      borderRadius: 12,

      justifyContent: "center",
      alignItems: "center",

      backgroundColor: theme.colors.surface,
    },

    title: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: "800",
    },

    subtitle: {
      marginTop: 5,

      color: theme.colors.secondaryText,

      fontSize: 14,
      lineHeight: 20,
    },

    content: {
      flexGrow: 1,
    },
  });
}
