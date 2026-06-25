import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import StatusBanner from "@/components/ui/StatusBanner";

import { useAuthStore } from "@/store/auth";
import { useTheme } from "@/theme";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen() {
  const { theme } = useTheme();

  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  function validate() {
    if (!firstName.trim()) return "First name is required.";
    if (!lastName.trim()) return "Last name is required.";
    if (!phone.trim()) return "Phone number is required.";
    if (!emailPattern.test(email.trim())) return "Enter a valid email.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";

    return "";
  }

  async function handleRegister() {
    const validation = validate();

    if (validation) {
      setError(validation);
      return;
    }

    try {
      setError("");

      await register({
        firstName,
        lastName,
        phone,
        email: email.trim().toLowerCase(),
        password,
      });
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={30}
      keyboardShouldPersistTaps="handled"
    >
      <AuthLayout
        title="Create Account"
        subtitle="Create your HostBot account to start deploying bots."
      >
        {error ? (
          <StatusBanner
            type="error"
            title="Registration Failed"
            message={error}
          />
        ) : null}

        <Input
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Anonumous"
        />

        <Input
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Seth"
        />

        <Input
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="+254700000000"
        />

        <Input
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="you@example.com"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
        />

        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm Password"
        />

        <Button
          title="Create Account"
          loading={isLoading}
          onPress={handleRegister}
        />

        <Pressable onPress={() => router.replace("/(auth)/login")}>
          <Text
            style={[
              styles.login,
              {
                color: theme.colors.primary,
              },
            ]}
          >
            Already have an account? Login
          </Text>
        </Pressable>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  login: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "700",
  },
});
