import { Button, Input, StatusBanner } from "@/components/ui";
import { COLORS } from "@/constants";
import { authService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/auth";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  const setSession = useAuthStore((state) => state.setSession);
  const [email, setEmail] = useState("demo@hostbot.local");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      const session = await authService.login({ email, password });
      setSession(session.user, session.token);
      router.replace("/dashboard" as any);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.brand}>Host Bot</Text>
        <Text style={styles.subtitle}>Sign in to deploy and manage bots</Text>
      </View>

      {error ? <StatusBanner type="error" title="Login failed" message={error} /> : null}

      <View style={styles.card}>
        <Input label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <Button title="Login" onPress={login} loading={loading} />
        <Pressable onPress={() => router.push("/register" as any)} style={styles.linkButton}>
          <Text style={styles.linkText}>Create an account</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background, justifyContent: "center" },
  header: { paddingHorizontal: 24, marginBottom: 18 },
  brand: { color: COLORS.text, fontSize: 34, fontWeight: "800" },
  subtitle: { color: COLORS.muted, marginTop: 8 },
  card: { backgroundColor: COLORS.white, borderRadius: 20, margin: 16, paddingVertical: 18 },
  linkButton: { alignItems: "center", paddingVertical: 14 },
  linkText: { color: COLORS.primary, fontWeight: "700" },
});
