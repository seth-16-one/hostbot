import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Animated,
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
  const scale = useState(new Animated.Value(1))[0];

  const borderColor = error
    ? theme.colors.danger
    : success
      ? theme.colors.success
      : focused
        ? theme.colors.primary
        : theme.colors.border;

  const shadowStyle = focused
    ? {
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        elevation: 3,
      }
    : {};

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

      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderColor,
            backgroundColor: theme.colors.surface,
            transform: [{ scale }],
          },
          shadowStyle,
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={22}
            color={theme.colors.icon}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          {...props}
          editable={editable}
          secureTextEntry={hidden}
          placeholderTextColor={theme.colors.subtitleText}
          style={[
            styles.input,
            {
              color: theme.colors.text,
            },
            inputStyle,
          ]}
          onFocus={() => {
            setFocused(true);

            Animated.spring(scale, {
              toValue: 1.02,
              useNativeDriver: true,
            }).start();
          }}
          onBlur={() => {
            setFocused(false);

            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true,
            }).start();
          }}
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
              size={22}
              color={theme.colors.icon}
            />
          </Pressable>
        ) : rightIcon ? (
          <Ionicons name={rightIcon} size={22} color={theme.colors.icon} />
        ) : null}
      </Animated.View>

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
