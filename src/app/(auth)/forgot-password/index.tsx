import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import StatusBanner from "@/components/ui/StatusBanner";

import { authService } from "@/services/auth/auth.service";
import { useTheme } from "@/theme";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordScreen() {
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleReset() {
    if (!emailPattern.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await authService.forgotPassword(email.trim().toLowerCase());

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email and we'll send you password reset instructions."
    >
      {error ? (
        <StatusBanner type="error" title="Request Failed" message={error} />
      ) : null}

      {success ? (
        <StatusBanner
          type="success"
          title="Email Sent"
          message="Check your inbox for password reset instructions."
        />
      ) : null}

      <Input
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@example.com"
      />

      <Button title="Send Reset Link" loading={loading} onPress={handleReset} />

      <Pressable onPress={() => router.replace("/(auth)/login")}>
        <Text
          style={[
            styles.link,
            {
              color: theme.colors.primary,
            },
          ]}
        >
          Back to Login
        </Text>
      </Pressable>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "700",
  },
});
