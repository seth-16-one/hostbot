import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import StatusBanner from "@/components/ui/StatusBanner";

import PasswordField from "@/components/auth/PasswordField";
import { authService } from "@/services/auth/auth.service";
import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

export default function ResetPasswordScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { email, otp } = useLocalSearchParams<{
    email: string;
    otp: string;
  }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleReset() {
    if (!email || !otp) {
      setError("Invalid password reset session.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await authService.resetPassword({
        email,
        otp,
        password,
      });

      setSuccess(true);

      setTimeout(() => {
        router.replace("/(auth)/login");
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a strong password for your HostBot account."
    >
      {error ? (
        <StatusBanner type="error" title="Reset Failed" message={error} />
      ) : null}

      {success ? (
        <StatusBanner
          type="success"
          title="Password Updated"
          message="Your password has been changed successfully."
        />
      ) : null}

      <PasswordField
        label="New Password"
        value={password}
        onChangeText={setPassword}
      />

      <PasswordField
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button
        title="Update Password"
        loading={loading}
        disabled={!password || !confirmPassword || loading}
        onPress={handleReset}
      />

      <Pressable onPress={() => router.replace("/(auth)/login")}>
        <Text style={styles.link}>Back to Login</Text>
      </Pressable>
    </AuthLayout>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    link: {
      marginTop: 24,

      textAlign: "center",

      color: theme.colors.primary,

      fontSize: 15,

      fontWeight: "700",
    },
  });
}
