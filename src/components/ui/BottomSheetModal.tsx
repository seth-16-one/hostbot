import { COLORS } from "@/constants";
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
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{title}</Text>

              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>

            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </Pressable>
          </View>

          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  sheet: {
    backgroundColor: COLORS.white,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,

    minHeight: 250,
    maxHeight: "85%",
  },

  handle: {
    width: 60,
    height: 5,

    backgroundColor: COLORS.border,

    borderRadius: 20,

    alignSelf: "center",

    marginBottom: 16,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 4,
    color: COLORS.muted,
  },

  content: {
    flexGrow: 1,
  },
});
