import { COLORS } from "@/constants";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Input({ label, ...props }: any) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.muted}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: 14,
  },

  label: {
    marginBottom: 6,
    color: COLORS.muted,
  },

  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.text,
  },
});
