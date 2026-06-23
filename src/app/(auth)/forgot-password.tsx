import { Button, Input, StatusBanner } from "@/components/ui";
import { COLORS } from "@/constants";
import { authService } from "@/services/auth/auth.service";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!emailPattern.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await authService.forgotPassword(email.trim().toLowerCase());
      setMessage("Password reset instructions have been sent if the account exists.");
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
      <View style={styles.content}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your email to receive reset instructions.</Text>
        {error ? <StatusBanner type="error" title="Request failed" message={error} /> : null}
        {message ? <StatusBanner type="success" title="Check your email" message={message} /> : null}
        <View style={styles.card}>
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
          />
          <Button title="Send Reset Link" onPress={submit} loading={loading} />
          <Pressable onPress={() => router.push("/login" as any)} style={styles.linkButton}>
            <Text style={styles.linkText}>Back to login</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, justifyContent: "center", padding: 20 },
  title: { color: COLORS.text, fontSize: 32, fontWeight: "800", textAlign: "center" },
  subtitle: { color: COLORS.muted, lineHeight: 22, marginBottom: 20, marginTop: 8, textAlign: "center" },
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
