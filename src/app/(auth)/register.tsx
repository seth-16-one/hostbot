import { Button, Input, StatusBanner } from "@/components/ui";
import { COLORS } from "@/constants";
import { authService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/auth";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function RegisterScreen() {
  const setSession = useAuthStore((state) => state.setSession);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async () => {
    setLoading(true);
    setError(null);
    try {
      const session = await authService.register({ name, email, password });
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
        <Text style={styles.brand}>Create Account</Text>
        <Text style={styles.subtitle}>Start deploying hosted bots</Text>
      </View>

      {error ? <StatusBanner type="error" title="Registration failed" message={error} /> : null}

      <View style={styles.card}>
        <Input label="Name" value={name} onChangeText={setName} placeholder="Your name" />
        <Input label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Minimum 8 characters"
          secureTextEntry
        />
        <Button title="Create Account" onPress={register} loading={loading} />
        <Pressable onPress={() => router.push("/login" as any)} style={styles.linkButton}>
          <Text style={styles.linkText}>I already have an account</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background, justifyContent: "center" },
  header: { paddingHorizontal: 24, marginBottom: 18 },
  brand: { color: COLORS.text, fontSize: 32, fontWeight: "800" },
  subtitle: { color: COLORS.muted, marginTop: 8 },
  card: { backgroundColor: COLORS.white, borderRadius: 20, margin: 16, paddingVertical: 18 },
  linkButton: { alignItems: "center", paddingVertical: 14 },
  linkText: { color: COLORS.primary, fontWeight: "700" },
});
