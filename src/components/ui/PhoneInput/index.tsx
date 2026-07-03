import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, Text, TextInput, View } from "react-native";
import CountryPicker, { Country } from "react-native-country-picker-modal";

import { useTheme } from "@/theme";

import { styles } from "./styles";
import type { PhoneInputProps } from "./types";

export default function PhoneInput({
  label = "Phone Number",
  value,
  onChange,
}: PhoneInputProps) {
  const { theme } = useTheme();

  const [focused, setFocused] = useState(false);

  const scale = useState(new Animated.Value(1))[0];

  const [callingCode, setCallingCode] = useState("254");
  const [countryCode, setCountryCode] = useState<Country["cca2"]>("KE");
  const [phoneNumber, setPhoneNumber] = useState("");

  const phoneRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!value) return;

    const digits = value.replace(/\D/g, "");

    if (digits.length > 9) {
      setCallingCode(digits.slice(0, digits.length - 9));
      setPhoneNumber(digits.slice(-9));
    }
  }, []);

  const borderColor = focused ? theme.colors.primary : theme.colors.border;

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
    onChange(`+${code.replace(/\D/g, "")}${phone.replace(/\D/g, "")}`);
  };

  const handlePhoneChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, 9);

    setPhoneNumber(digits);

    updateValue(callingCode, digits);
  };

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);

    const code = country.callingCode[0] ?? "";

    setCallingCode(code);

    updateValue(code, phoneNumber);
  };

  return (
    <View style={styles.container}>
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
      </View>

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
        <Ionicons
          name="call-outline"
          size={22}
          color={theme.colors.icon}
          style={styles.leftIcon}
        />

        <View style={styles.countrySection}>
          <View style={styles.countrySection}>
            <CountryPicker
              countryCode={countryCode}
              withFilter
              withFlag
              withCallingCode={false}
              withEmoji
              withAlphaFilter
              onSelect={onSelectCountry}
            />

            <Ionicons
              name="chevron-down"
              size={16}
              color={theme.colors.icon}
              style={{ marginHorizontal: 4 }}
            />

            <Text
              style={[
                styles.countryInput,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              +{callingCode}
            </Text>
          </View>
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
          placeholderTextColor={theme.colors.subtitleText}
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
          onKeyPress={({ nativeEvent }) => {}}
        />
      </Animated.View>
    </View>
  );
}
