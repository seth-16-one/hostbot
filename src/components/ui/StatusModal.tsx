import { COLORS } from "@/constants";
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
  const getIcon = () => {
    switch (type) {
      case "success":
        return "checkmark-circle";

      case "error":
        return "close-circle";

      case "warning":
        return "warning";

      case "info":
        return "information-circle";

      default:
        return "checkmark-circle";
    }
  };

  const getColor = () => {
    switch (type) {
      case "success":
        return COLORS.success;

      case "error":
        return COLORS.danger;

      case "warning":
        return COLORS.warning;

      case "info":
        return COLORS.info;

      default:
        return COLORS.success;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onSecondaryPress}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Ionicons name={getIcon() as any} size={90} color={getColor()} />

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            <Button title={primaryText} onPress={onPrimaryPress} />
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.45)",

    justifyContent: "center",

    alignItems: "center",

    padding: 24,
  },

  modal: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 28,

    padding: 24,

    alignItems: "center",
  },

  title: {
    fontSize: 24,

    fontWeight: "700",

    color: COLORS.text,

    marginTop: 16,

    textAlign: "center",
  },

  message: {
    marginTop: 10,

    color: COLORS.muted,

    textAlign: "center",

    lineHeight: 22,

    marginBottom: 24,
  },

  buttonContainer: {
    width: "100%",
  },

  secondaryContainer: {
    width: "100%",

    marginTop: 12,
  },
});
