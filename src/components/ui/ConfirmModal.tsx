import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

type Props = {
  visible: boolean;

  title: string;
  message: string;

  confirmText?: string;
  cancelText?: string;

  danger?: boolean;

  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Ionicons
            name={danger ? "warning" : "help-circle"}
            size={80}
            color={danger ? COLORS.danger : COLORS.warning}
          />

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttons}>
            <Button title={cancelText} variant="outline" onPress={onCancel} />

            <View style={{ height: 12 }} />

            <Button
              title={confirmText}
              variant={danger ? "danger" : "primary"}
              onPress={onConfirm}
            />
          </View>
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
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.text,
    marginTop: 12,
  },

  message: {
    textAlign: "center",
    color: COLORS.muted,
    marginTop: 10,
    lineHeight: 22,
  },

  buttons: {
    marginTop: 24,
  },
});
