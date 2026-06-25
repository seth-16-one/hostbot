import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import StatusBanner from "@/components/ui/StatusBanner";

import { authService } from "@/services/auth/auth.service";
import { useTheme } from "@/theme";

export default function ResetPasswordScreen() {
  const { theme } = useTheme();

  const { token } = useLocalSearchParams<{
    token?: string;
  }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleReset() {
    if (!token) {
      setError("Invalid reset token.");
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
        token,
        password,
      });

      setSuccess(true);
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

      <Input
        label="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="New Password"
      />

      <Input
        label="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
      />

      <Button title="Update Password" loading={loading} onPress={handleReset} />

      {success && (
        <Button
          title="Go to Login"
          variant="outline"
          onPress={() => router.replace("/(auth)/login")}
        />
      )}

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
