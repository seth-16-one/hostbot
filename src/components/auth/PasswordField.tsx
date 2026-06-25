import { Input } from "@/components/ui";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

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
    <>
      <Input
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!visible}
      />

      <Pressable style={styles.eye} onPress={() => setVisible(!visible)}>
        <Ionicons
          name={visible ? "eye-off-outline" : "eye-outline"}
          size={22}
          color={theme.colors.muted}
        />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  eye: {
    position: "absolute",
    right: 15,
    top: 42,
    padding: 5,
  },
});
