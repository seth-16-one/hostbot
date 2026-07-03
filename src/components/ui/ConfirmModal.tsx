import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Modal, StyleSheet, Text, View } from "react-native";

import Button from "./Button";

type Props = {
  visible: boolean;

  title: string;
  message: string;

  confirmText?: string;
  cancelText?: string;

  type?: "warning" | "success" | "error" | "info";

  loading?: boolean;

  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning",
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const shake = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    if (!visible) return;

    shake.setValue(0);
    scale.setValue(0.85);

    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }),

      Animated.sequence([
        Animated.timing(shake, {
          toValue: -8,
          duration: 45,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: 8,
          duration: 45,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: -6,
          duration: 45,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: 6,
          duration: 45,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: 0,
          duration: 45,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [visible]);

  const iconName = {
    warning: "warning",
    success: "checkmark-circle",
    error: "close-circle",
    info: "information-circle",
  }[type];

  const iconColor = {
    warning: theme.colors.warning,
    success: theme.colors.success,
    error: theme.colors.danger,
    info: theme.colors.primary,
  }[type];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ scale }, { translateX: shake }],
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={iconName as any} size={72} color={iconColor} />
          </View>

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttons}>
            <Button
              title={confirmText}
              variant={type === "error" ? "danger" : "primary"}
              loading={loading}
              disabled={loading}
              onPress={onConfirm}
            />

            <View style={{ height: 12 }} />

            <Button
              title={cancelText}
              variant="outline"
              disabled={loading}
              onPress={onCancel}
            />
          </View>
        </Animated.View>
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

      backgroundColor: "rgba(0,0,0,0.50)",
    },

    modal: {
      width: "100%",

      backgroundColor: theme.colors.card,

      borderRadius: 28,

      borderWidth: 1,
      borderColor: theme.colors.border,

      paddingHorizontal: 24,
      paddingVertical: 28,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.15,
      shadowRadius: 18,
      shadowOffset: {
        width: 0,
        height: 8,
      },

      elevation: 12,
    },

    iconContainer: {
      alignItems: "center",
      marginBottom: 16,
    },

    title: {
      textAlign: "center",

      color: theme.colors.text,

      fontSize: 24,
      fontWeight: "800",
    },

    message: {
      marginTop: 10,

      textAlign: "center",

      color: theme.colors.secondaryText,

      fontSize: 15,
      lineHeight: 24,
    },

    buttons: {
      marginTop: 30,
    },
  });
}
