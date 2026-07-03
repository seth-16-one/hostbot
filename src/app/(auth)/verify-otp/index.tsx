import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

import AuthLayout from "@/components/auth/AuthLayout";
import OtpInput from "@/components/auth/OtpInput";
import OtpTimer from "@/components/auth/OtpTimer";
import Button from "@/components/ui/Button";
import StatusBanner from "@/components/ui/StatusBanner";
import { authService } from "@/services/auth/auth.service";
import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

export default function VerifyEmailScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Later this will come from the logged-in user or route params
  const { email, type } = useLocalSearchParams<{
    email: string;
    type?: string;
  }>();

  async function handleVerify() {
    try {
      setLoading(true);
      setError("");

      if (type === "email") {
        await authService.verifyEmailOtp({
          email,
          otp,
        });

        router.replace("/(auth)/login");
      } else {
        await authService.verifyPasswordOtp({
          email,
          otp,
        });

        router.replace({
          pathname: "/(auth)/reset-password",
          params: {
            email,
            otp,
          },
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function resendCode() {
    if (type === "email") {
      await authService.resendVerification(email);
    } else {
      await authService.resendPasswordOtp(email);
    }
  }

  return (
    <AuthLayout
      title={type === "email" ? "Verify Email" : "Verify Reset Code"}
      subtitle={
        type === "email"
          ? "We've sent a verification code to"
          : "We've sent a password reset code to"
      }
    >
      {error ? (
        <StatusBanner
          type="error"
          title="Verification Failed"
          message={error}
        />
      ) : null}

      <Text style={styles.label}>Verification code sent to</Text>

      <Text style={styles.email}>{email}</Text>

      <OtpInput
        value={otp}
        onChange={setOtp}
        error={!!error}
        onComplete={handleVerify}
      />

      <Button
        title={type === "email" ? "Verify Email" : "Verify Code"}
        loading={loading}
        disabled={otp.length !== 6 || loading}
        onPress={handleVerify}
      />

      <OtpTimer onResend={resendCode} />
    </AuthLayout>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    label: {
      textAlign: "center",
      color: theme.colors.muted,
      marginTop: 12,
      fontSize: 15,
      fontWeight: "500",
    },

    email: {
      textAlign: "center",
      color: theme.colors.primary,
      fontWeight: "700",
      fontSize: 17,
      marginTop: 8,
      marginBottom: 12,
    },

    resendText: {
      textAlign: "center",
      marginTop: 18,
      color: theme.colors.muted,
      fontSize: 14,
    },
  });
}
