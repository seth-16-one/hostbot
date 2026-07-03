import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: boolean;
  disabled?: boolean;
  onComplete?: (otp: string) => void;
};

export default function OtpInput({
  value,
  onChange,
  length = 6,
  error = false,
  disabled = false,
  onComplete,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const inputRef = useRef<TextInput>(null);

  const shake = useRef(new Animated.Value(0)).current;

  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (value.length === length) {
      inputRef.current?.blur();
      onComplete?.(value);
    }
  }, [value]);

  useEffect(() => {
    if (!error) return;

    Animated.sequence([
      Animated.timing(shake, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 8,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: -8,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, [error]);

  const handleChange = (text: string) => {
    const otp = text.replace(/\D/g, "").slice(0, length);

    onChange(otp);

    if (otp.length === length) {
      inputRef.current?.blur();
      onComplete?.(otp);
    }
  };

  return (
    <Pressable onPress={() => !disabled && inputRef.current?.focus()}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateX: shake }],
          },
        ]}
      >
        {Array.from({ length }).map((_, index) => {
          const active = focused && value.length === index;

          return (
            <View
              key={index}
              style={[
                styles.box,
                active && styles.activeBox,
                error && styles.errorBox,
              ]}
            >
              <Text style={styles.text}>{value[index] || ""}</Text>
            </View>
          );
        })}
      </Animated.View>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        editable={!disabled}
        keyboardType="number-pad"
        autoComplete="sms-otp"
        textContentType="oneTimeCode"
        importantForAutofill="yes"
        maxLength={length}
        selectionColor={theme.colors.primary}
        cursorColor={theme.colors.primary}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={styles.hiddenInput}
      />
    </Pressable>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 28,
    },

    box: {
      width: 52,
      height: 60,

      borderRadius: 16,

      backgroundColor: theme.colors.card,

      borderWidth: 1.5,
      borderColor: theme.colors.border,

      justifyContent: "center",
      alignItems: "center",
    },

    activeBox: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },

    errorBox: {
      borderWidth: 2,
      borderColor: theme.colors.danger,
    },

    text: {
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: "800",
    },

    hiddenInput: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1,
    },
  });
}
