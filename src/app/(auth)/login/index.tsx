import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import StatusBanner from "@/components/ui/StatusBanner";

import { googleService } from "@/services/auth/google.service";
import { useAuthStore } from "@/store/auth";
import { useTheme } from "@/theme";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const { theme } = useTheme();

  const login = useAuthStore((state) => state.login);
  const googleLogin = useAuthStore((state) => state.googleLogin);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

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
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue managing your bots."
    >
      {error ? (
        <StatusBanner type="error" title="Login Failed" message={error} />
      ) : null}

      <Input
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@example.com"
      />

      <View>
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholder="Password"
        />
      </View>

      <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
        <Text
          style={[
            styles.forgot,
            {
              color: theme.colors.primary,
            },
          ]}
        >
          Forgot Password?
        </Text>
      </Pressable>

      <Button title="Login" loading={isLoading} onPress={handleLogin} />

      {googleService.isAvailable() && (
        <Button
          title="Continue with Google"
          variant="outline"
          onPress={handleGoogle}
        />
      )}

      <Pressable onPress={() => router.push("/(auth)/register")}>
        <Text
          style={[
            styles.register,
            {
              color: theme.colors.primary,
            },
          ]}
        >
          Don't have an account? Register
        </Text>
      </Pressable>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  eye: {
    position: "absolute",
    right: 16,
    top: 44,
  },

  forgot: {
    alignSelf: "flex-end",
    marginBottom: 12,
    fontWeight: "600",
  },

  register: {
    textAlign: "center",
    marginTop: 20,
    fontWeight: "700",
  },
});
