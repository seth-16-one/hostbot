import { Button, Input, StatusBanner } from "@/components/ui";
import { COLORS } from "@/constants";
import { authService } from "@/services/auth/auth.service";
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

export default function LoginScreen() {
  const setSession = useAuthStore((state) => state.setSession);
  const [identifier, setIdentifier] = useState("demo");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      const session = await authService.login({ identifier, password });
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
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.brandMark}>
          <Ionicons name="hardware-chip-outline" size={34} color={COLORS.white} />
        </View>

        <Text style={styles.brand}>Host Bot</Text>
        <Text style={styles.subtitle}>Deploy, pair, fund, and manage your bots.</Text>

        {error ? (
          <StatusBanner type="error" title="Login failed" message={error} />
        ) : null}

        <View style={styles.card}>
          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>Demo account</Text>
            <Text style={styles.demoText}>Username: demo  Password: password123</Text>
          </View>

          <Input
            autoCapitalize="none"
            label="Username or Email"
            value={identifier}
            onChangeText={setIdentifier}
            placeholder="demo or demo@hostbot.local"
          />
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
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
  demoBox: {
    backgroundColor: COLORS.successLight,
    borderRadius: 14,
    marginBottom: 16,
    padding: 12,
  },
  demoTitle: { color: COLORS.successDark, fontWeight: "800" },
  demoText: { color: COLORS.successDeep, marginTop: 4 },
  linkButton: { alignItems: "center", paddingVertical: 16 },
  linkText: { color: COLORS.primary, fontWeight: "700" },
});
