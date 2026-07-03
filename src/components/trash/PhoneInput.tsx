import { useTheme } from "@/theme";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function PhoneInput({ value, onChange }: Props) {
  const { theme } = useTheme();

  const [callingCode, setCallingCode] = useState("254");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (!value) return;

    const digits = value.replace(/\D/g, "");

    if (digits.length > 9) {
      setCallingCode(digits.slice(0, digits.length - 9));
      setPhoneNumber(digits.slice(-9));
    }
  }, []);

  const formatPhone = (digits: string) => {
    if (digits.length <= 3) return digits;

    if (digits.length <= 6) {
      return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    }

    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  };

  const updateValue = (
    code: string = callingCode,
    phone: string = phoneNumber,
  ) => {
    const cleanCode = code.replace(/\D/g, "");
    const cleanPhone = phone.replace(/\D/g, "");

    onChange(`+${cleanCode}${cleanPhone}`);
  };

  const handleCodeChange = (text: string) => {
    const code = text.replace(/\D/g, "");

    setCallingCode(code);

    updateValue(code, phoneNumber);

    if (code.length >= 2 && code.length <= 4 && phoneNumber.length === 0) {
      phoneRef.current?.focus();
    }
  };

  const handlePhoneChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, 12);

    setPhoneNumber(digits);

    updateValue(callingCode, digits);
  };

  const countryRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  return (
    <View style={styles.group}>
      <Text
        style={[
          styles.label,
          {
            color: theme.colors.text,
          },
        ]}
      >
        Phone Number
      </Text>

      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.countrySection}>
          <Text
            style={[
              styles.plus,
              {
                color: theme.colors.text,
              },
            ]}
          >
            +
          </Text>

          <TextInput
            ref={countryRef}
            style={[
              styles.countryInput,
              {
                color: theme.colors.text,
              },
            ]}
            value={callingCode}
            onChangeText={handleCodeChange}
            keyboardType="phone-pad"
            maxLength={4}
            placeholder="254"
            placeholderTextColor={theme.colors.muted}
          />
        </View>

        <View
          style={[
            styles.divider,
            {
              backgroundColor: theme.colors.border,
            },
          ]}
        />

        <TextInput
          ref={phoneRef}
          style={[
            styles.input,
            {
              color: theme.colors.text,
            },
          ]}
          value={formatPhone(phoneNumber)}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          placeholder="700 000 000"
          placeholderTextColor={theme.colors.muted}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace" && phoneNumber.length === 0) {
              countryRef.current?.focus();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: 14,
  },

  label: {
    marginBottom: 8,
    marginLeft: 2,
    fontSize: 14,
    fontWeight: "600",
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 18,
    minHeight: 58,
    paddingHorizontal: 18,
  },

  countrySection: {
    flexDirection: "row",
    alignItems: "center",
    width: 48,
  },

  plus: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 2,
  },

  countryInput: {
    width: 28,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },

  divider: {
    width: 1,
    height: 24,
    marginHorizontal: 12,
  },

  input: {
    flex: 1,
    fontSize: 15,
  },
});
