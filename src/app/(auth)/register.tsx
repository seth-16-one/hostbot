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

export default function RegisterScreen() {
  const setSession = useAuthStore((state) => state.setSession);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async () => {
    setLoading(true);
    setError(null);
    try {
      const session = await authService.register({
        name,
        username,
        email,
        password,
      });
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
          <Ionicons name="person-add-outline" size={32} color={COLORS.white} />
        </View>

        <Text style={styles.brand}>Create Account</Text>
        <Text style={styles.subtitle}>Your wallet and deployments will be saved to your session.</Text>

        {error ? (
          <StatusBanner type="error" title="Registration failed" message={error} />
        ) : null}

        <View style={styles.card}>
          <Input label="Name" value={name} onChangeText={setName} placeholder="Your name" />
          <Input
            autoCapitalize="none"
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="letters, numbers, underscores"
          />
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
          />
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
  brand: { color: COLORS.text, fontSize: 32, fontWeight: "800", textAlign: "center" },
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
  linkButton: { alignItems: "center", paddingVertical: 16 },
  linkText: { color: COLORS.primary, fontWeight: "700" },
});
