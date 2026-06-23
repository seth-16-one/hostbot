import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Animated, StyleSheet, Text } from "react-native";

type ToastType = "success" | "error" | "warning" | "info";

type Props = {
  visible: boolean;
  type?: ToastType;
  message: string;
  duration?: number;
  onHide: () => void;
};

export default function Toast({
  visible,
  type = "success",
  message,
  duration = 3000,
  onHide,
}: Props) {
  const translateY = new Animated.Value(-120);

  useEffect(() => {
    if (!visible) return;

    Animated.sequence([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),

      Animated.delay(duration),

      Animated.timing(translateY, {
        toValue: -120,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  }, [visible]);

  if (!visible) return null;

  const icon =
    type === "success"
      ? "checkmark-circle"
      : type === "error"
        ? "close-circle"
        : type === "warning"
          ? "warning"
          : "information-circle";

  const color =
    type === "success"
      ? COLORS.success
      : type === "error"
        ? COLORS.danger
        : type === "warning"
          ? COLORS.warning
          : COLORS.info;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <Ionicons name={icon as any} size={22} color={color} />

      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    top: 60,

    left: 20,
    right: 20,

    zIndex: 999,

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: COLORS.white,

    borderRadius: 16,

    paddingHorizontal: 16,
    paddingVertical: 14,

    shadowColor: COLORS.shadow,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.15,

    shadowRadius: 8,

    elevation: 6,
  },

  message: {
    flex: 1,

    marginLeft: 10,

    color: COLORS.text,

    fontWeight: "600",
  },
});
