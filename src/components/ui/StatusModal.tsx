import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, View } from "react-native";

import Button from "./Button";

type StatusType = "success" | "error" | "warning" | "info";

type Props = {
  visible: boolean;

  type?: StatusType;

  title: string;
  message: string;

  primaryText?: string;
  secondaryText?: string;

  onPrimaryPress: () => void;
  onSecondaryPress?: () => void;
};

export default function StatusModal({
  visible,
  type = "success",
  title,
  message,
  primaryText = "Continue",
  secondaryText,
  onPrimaryPress,
  onSecondaryPress,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const tone = {
    success: {
      icon: "checkmark-circle",
      color: theme.colors.success,
      background: theme.colors.successLight,
    },
    error: {
      icon: "close-circle",
      color: theme.colors.danger,
      background: theme.colors.dangerLight,
    },
    warning: {
      icon: "warning",
      color: theme.colors.warning,
      background: theme.colors.warningLight,
    },
    info: {
      icon: "information-circle",
      color: theme.colors.info,
      background: theme.colors.infoLight,
    },
  } as const;

  const item = tone[type];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onSecondaryPress}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: item.background,
              },
            ]}
          >
            <Ionicons name={item.icon as any} size={72} color={item.color} />
          </View>

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            <Button
              title={primaryText}
              variant={type === "error" ? "danger" : "primary"}
              onPress={onPrimaryPress}
            />
          </View>

          {secondaryText && onSecondaryPress && (
            <View style={styles.secondaryContainer}>
              <Button
                title={secondaryText}
                variant="outline"
                onPress={onSecondaryPress}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    overlay: {
      flex: 1,

      backgroundColor: theme.colors.overlay,

      justifyContent: "center",
      alignItems: "center",

      padding: 24,
    },

    modal: {
      width: "100%",

      backgroundColor: theme.colors.card,

      borderRadius: 28,

      borderWidth: 1,
      borderColor: theme.colors.border,

      padding: 24,

      alignItems: "center",

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.12,
      shadowRadius: 18,
      shadowOffset: {
        width: 0,
        height: 8,
      },

      elevation: 10,
    },

    iconContainer: {
      width: 110,
      height: 110,

      borderRadius: 55,

      justifyContent: "center",
      alignItems: "center",

      marginBottom: 18,
    },

    title: {
      color: theme.colors.text,

      fontSize: 24,
      fontWeight: "800",

      textAlign: "center",
    },

    message: {
      marginTop: 10,

      color: theme.colors.secondaryText,

      textAlign: "center",

      fontSize: 15,

      lineHeight: 24,

      marginBottom: 28,
    },

    buttonContainer: {
      width: "100%",
    },

    secondaryContainer: {
      width: "100%",
      marginTop: 12,
    },
  });
}
