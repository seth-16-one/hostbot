import { Input } from "@/components/ui";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
}

export default function PasswordField({
  value,
  onChangeText,
  label = "Password",
  placeholder = "Enter password",
}: Props) {
  const { theme } = useTheme();

  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Input
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!visible}
      />

      <Pressable
        style={styles.eye}
        onPress={() => setVisible((v) => !v)}
        hitSlop={10}
      >
        <Ionicons
          name={visible ? "eye-off-outline" : "eye-outline"}
          size={22}
          color={theme.colors.muted}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  eye: {
    position: "absolute",
    right: 16,
    top: 43,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
});
