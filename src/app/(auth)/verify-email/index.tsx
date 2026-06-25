import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import StatusBanner from "@/components/ui/StatusBanner";

import { authService } from "@/services/auth/auth.service";

export default function VerifyEmailScreen() {
  const { token } = useLocalSearchParams<{
    token?: string;
  }>();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    verify();
  }, []);

  async function verify() {
    if (!token) {
      setLoading(false);
      setError("Verification token is missing.");
      return;
    }

    try {
      await authService.verifyEmail(token);

      setVerified(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Verify Email"
      subtitle="We're confirming your email address."
    >
      {loading && (
        <StatusBanner
          type="info"
          title="Verifying..."
          message="Please wait a moment."
        />
      )}

      {!loading && verified && (
        <>
          <StatusBanner
            type="success"
            title="Email Verified"
            message="Your account has been verified successfully."
          />

          <Button
            title="Continue to Login"
            onPress={() => router.replace("/(auth)/login")}
          />
        </>
      )}

      {!loading && error ? (
        <>
          <StatusBanner
            type="error"
            title="Verification Failed"
            message={error}
          />

          <Button
            title="Back to Login"
            variant="outline"
            onPress={() => router.replace("/(auth)/login")}
          />
        </>
      ) : null}
    </AuthLayout>
  );
}

const styles = StyleSheet.create({});
