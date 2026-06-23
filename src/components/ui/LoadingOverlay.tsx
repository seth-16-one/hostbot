import { COLORS } from "@/constants";
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
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLORS.primary} />

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>
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

  container: {
    width: "100%",
    maxWidth: 320,

    backgroundColor: COLORS.white,

    borderRadius: 24,

    padding: 24,

    alignItems: "center",
  },

  title: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  message: {
    marginTop: 8,
    textAlign: "center",
    color: COLORS.muted,
    lineHeight: 22,
  },
});
