import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Input from "@/components/ui/Input";
import SocialButton from "@/components/ui/SocialButton";
import StatusBanner from "@/components/ui/StatusBanner";
import { useToast } from "@/context/ToastContext";

import { googleService } from "@/services/auth/google.service";
import { useAuthStore } from "@/store/auth";
import { useTheme } from "@/theme";
import { AppTheme } from "@/theme/light";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const login = useAuthStore((state) => state.login);
  const googleLogin = useAuthStore((state) => state.googleLogin);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showToast } = useToast();

  const [error, setError] = useState("");

  function validate() {
    if (!email.trim()) return "Email is required.";

    if (!emailPattern.test(email.trim())) return "Enter a valid email.";

    if (!password) return "Password is required.";

    return "";
  }

  async function handleLogin() {
    const validation = validate();

    if (validation) {
      setError(validation);
      return;
    }

    try {
      setError("");

      await login({
        email: email.trim().toLowerCase(),
        password,
      });

      showToast({
        title: "Welcome Back",
        message: "Login successful.",
        type: "success",
      });

      // No router.push() needed if your auth store redirects automatically.
    } catch (err: any) {
      setError(err.message);

      // Optional: show toast only for connection/server errors
      if (
        err.message?.includes("Network") ||
        err.message?.includes("fetch") ||
        err.message?.includes("Failed")
      ) {
        showToast({
          title: "Connection Error",
          message: "Unable to reach the server. Please try again.",
          type: "error",
        });
      }
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
    <AuthLayout
      title="Welcome Back"
      subtitle="Manage and deploy your WhatsApp bots securely."
    >
      {error ? (
        <StatusBanner type="error" title="Login Failed" message={error} />
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
        label="Email Address"
        leftIcon="mail-outline"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="you@example.com"
      />

      <Input
        label="Password"
        leftIcon="lock-closed-outline"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
      />

      <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </Pressable>

      <Button
        title="Sign In"
        loading={isLoading}
        disabled={!email.trim() || !password || isLoading}
        onPress={handleLogin}
      />

      <Pressable onPress={() => router.push("/(auth)/register")}>
        <Text style={styles.register}>Don't have an account? Register</Text>
      </Pressable>
    </AuthLayout>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    forgot: {
      alignSelf: "flex-end",

      marginBottom: 16,

      color: theme.colors.primary,

      fontSize: 14,

      fontWeight: "700",
    },

    register: {
      marginTop: 28,

      textAlign: "center",

      color: theme.colors.primary,

      fontSize: 15,

      fontWeight: "700",
    },
  });
}
