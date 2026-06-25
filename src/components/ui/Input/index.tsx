import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { useTheme } from "@/theme";
import { styles } from "./styles";
import type { InputProps } from "./types";

export default function Input({
  label,
  error,
  success,
  leftIcon,
  rightIcon,
  loading = false,
  secureTextEntry = false,
  required = false,
  containerStyle,
  inputStyle,
  editable = true,
  ...props
}: InputProps) {
  const { theme } = useTheme();

  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secureTextEntry);

  const borderColor = error
    ? theme.colors.danger
    : success
      ? theme.colors.success
      : focused
        ? theme.colors.primary
        : theme.colors.border;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <View style={styles.labelRow}>
          <Text
            style={[
              styles.label,
              {
                color: theme.colors.text,
              },
            ]}
          >
            {label}
          </Text>

          {required && <Text style={styles.required}>*</Text>}
        </View>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
            backgroundColor: theme.colors.card,
          },
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={theme.colors.icon}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          {...props}
          editable={editable}
          secureTextEntry={hidden}
          placeholderTextColor={theme.colors.muted}
          style={[
            styles.input,
            {
              color: theme.colors.text,
            },
            inputStyle,
          ]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {loading ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : secureTextEntry ? (
          <Pressable
            style={styles.rightButton}
            onPress={() => setHidden(!hidden)}
          >
            <Ionicons
              name={hidden ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={theme.colors.icon}
            />
          </Pressable>
        ) : rightIcon ? (
          <Ionicons name={rightIcon} size={20} color={theme.colors.icon} />
        ) : null}
      </View>

      {error ? (
        <Text
          style={[
            styles.message,
            {
              color: theme.colors.danger,
            },
          ]}
        >
          {error}
        </Text>
      ) : success ? (
        <Text
          style={[
            styles.message,
            {
              color: theme.colors.success,
            },
          ]}
        >
          {success}
        </Text>
      ) : null}
    </View>
  );
}
