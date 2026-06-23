import { Button, Input, StatusBanner } from "@/components/ui";
import { COLORS } from "@/constants";
import { googleService } from "@/services/auth/google.service";
import { useAuthStore } from "@/store/auth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const loginWithPassword = useAuthStore((state) => state.login);
  const setGoogleSession = useAuthStore((state) => state.googleLogin);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const googleAvailable = googleService.isAvailable();

  const validate = () => {
    if (!email.trim() || !password) return "Email and password are required.";
    if (!emailPattern.test(email.trim())) return "Enter a valid email address.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    return null;
  };

  const submit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    try {
      await loginWithPassword({ email: email.trim().toLowerCase(), password });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const loginWithGoogle = async () => {
    setError(null);
    try {
      const session = await googleService.login();
      await setGoogleSession(session);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.brandMark}>
          <Ionicons name="hardware-chip-outline" size={34} color={COLORS.white} />
        </View>
        <Text style={styles.brand}>Host Bot</Text>
        <Text style={styles.subtitle}>Sign in to deploy and manage bots from any device.</Text>

        {error ? <StatusBanner type="error" title="Sign in failed" message={error} /> : null}

        <View style={styles.card}>
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
          />

          <View>
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={!showPassword}
            />
            <Pressable style={styles.eyeButton} onPress={() => setShowPassword((value) => !value)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={COLORS.muted}
              />
            </Pressable>
          </View>

          <View style={styles.optionsRow}>
            <Pressable
              style={styles.remember}
              onPress={() => setRememberMe((value) => !value)}
            >
              <Ionicons
                name={rememberMe ? "checkbox" : "square-outline"}
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.optionText}>Remember me</Text>
            </Pressable>

            <Pressable onPress={() => router.push("/forgot-password" as any)}>
              <Text style={styles.linkText}>Forgot password?</Text>
            </Pressable>
          </View>

          <Button title="Login" onPress={submit} loading={isLoading} />

          {googleAvailable ? (
            <Pressable style={styles.googleButton} onPress={loginWithGoogle}>
              <Ionicons name="logo-google" size={20} color={COLORS.text} />
              <Text style={styles.googleText}>Continue with Google</Text>
            </Pressable>
          ) : null}

          <Pressable onPress={() => router.push("/register" as any)} style={styles.linkButton}>
            <Text style={styles.linkText}>Create an account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { flexGrow: 1, justifyContent: "center", padding: 20 },
  brandMark: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    height: 72,
    justifyContent: "center",
    marginBottom: 18,
    width: 72,
  },
  brand: { color: COLORS.text, fontSize: 36, fontWeight: "800", textAlign: "center" },
  subtitle: {
    color: COLORS.muted,
    lineHeight: 22,
    marginBottom: 20,
    marginTop: 8,
    textAlign: "center",
  },
  card: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  eyeButton: { position: "absolute", right: 12, top: 39, padding: 8 },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  remember: { alignItems: "center", flexDirection: "row", gap: 6 },
  optionText: { color: COLORS.muted, fontWeight: "600" },
  googleButton: {
    alignItems: "center",
    borderColor: COLORS.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 8,
    paddingVertical: 15,
  },
  googleText: { color: COLORS.text, fontWeight: "700" },
  linkButton: { alignItems: "center", paddingVertical: 16 },
  linkText: { color: COLORS.primary, fontWeight: "700" },
});
