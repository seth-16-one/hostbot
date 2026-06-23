import { COLORS } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function PhoneInput({ value, onChange }: Props) {
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
      <Text style={styles.label}>Phone Number</Text>

      <View style={styles.container}>
        <View style={styles.countrySection}>
          <Text style={styles.plus}>+</Text>

          <TextInput
            ref={countryRef}
            style={styles.countryInput}
            value={callingCode}
            onChangeText={handleCodeChange}
            keyboardType="phone-pad"
            maxLength={4}
            placeholder="254"
            placeholderTextColor={COLORS.muted}
          />
        </View>

        <View style={styles.divider} />

        <TextInput
          ref={phoneRef}
          style={styles.input}
          value={formatPhone(phoneNumber)}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          placeholder="700 000 000"
          placeholderTextColor={COLORS.muted}
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
    marginBottom: 6,
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "500",
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 58,
  },

  countrySection: {
    flexDirection: "row",
    alignItems: "center",
    width: 48,
  },

  plus: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 2,
  },

  countryInput: {
    width: 28,
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },

  divider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },

  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
  },
});
