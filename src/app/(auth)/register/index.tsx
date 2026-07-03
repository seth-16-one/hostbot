import Divider from "@/components/ui/Divider";
import SocialButton from "@/components/ui/SocialButton";
import { googleService } from "@/services/auth/google.service";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PhoneInput from "@/components/ui/PhoneInput";
import StatusBanner from "@/components/ui/StatusBanner";
import { useAuthStore } from "@/store/auth";
import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);

  const googleLogin = useAuthStore((state) => state.googleLogin);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  function validate() {
    const names = fullName.trim().split(/\s+/);

    if (names.length < 2) {
      return "Please enter your first and last name.";
    }
    if (!phone.trim()) return "Phone number is required.";
    if (!emailPattern.test(email.trim())) return "Enter a valid email.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";

    return "";
  }

  async function handleRegister() {
    const names = fullName.trim().split(/\s+/);

    const firstName = names[0];
    const lastName = names.slice(1).join(" ");

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

      router.replace({
        pathname: "/(auth)/verify-otp",
        params: {
          email: email.trim().toLowerCase(),
          type: "email",
        },
      });
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleGoogle() {
    try {
      const session = await googleService.login();
      await googleLogin(session);
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

        <>
          <Divider text="CONTINUE WITH" />

          <SocialButton
            title="Continue with Google"
            icon="logo-google"
            onPress={handleGoogle}
          />

          <Divider text="OR" />
        </>

        <Input
          label="Full Name"
          leftIcon="person-outline"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />

        <PhoneInput value={phone} onChange={setPhone} />

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
          disabled={
            !fullName.trim() ||
            !phone.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword ||
            isLoading
          }
          onPress={handleRegister}
        />

        <Pressable onPress={() => router.replace("/(auth)/login")}>
          <Text style={styles.login}>Already have an account? Login</Text>
        </Pressable>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    login: {
      marginTop: 24,

      textAlign: "center",

      color: theme.colors.primary,

      fontSize: 15,

      fontWeight: "700",
    },
  });
}
