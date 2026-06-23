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
const strongPasswordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function RegisterScreen() {
  const register = useAuthStore((state) => state.register);
  const setGoogleSession = useAuthStore((state) => state.googleLogin);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const googleAvailable = googleService.isAvailable();

  const validate = () => {
    if (!firstName.trim() || !lastName.trim()) return "First and last name are required.";
    if (!email.trim() || !emailPattern.test(email.trim())) return "Enter a valid email address.";
    if (!phone.trim()) return "Phone number is required.";
    if (!strongPasswordPattern.test(password)) {
      return "Password must have 8+ characters, an uppercase letter, a lowercase letter, and a number.";
    }
    if (password !== confirmPassword) return "Passwords do not match.";
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
      await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password,
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const signupWithGoogle = async () => {
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
          <Ionicons name="person-add-outline" size={32} color={COLORS.white} />
        </View>
        <Text style={styles.brand}>Create Account</Text>
        <Text style={styles.subtitle}>Your wallet and deployments stay tied to your secure session.</Text>

        {error ? <StatusBanner type="error" title="Registration failed" message={error} /> : null}

        <View style={styles.card}>
          <View style={styles.nameRow}>
            <View style={styles.nameField}>
              <Input label="First Name" value={firstName} onChangeText={setFirstName} placeholder="Jane" />
            </View>
            <View style={styles.nameField}>
              <Input label="Last Name" value={lastName} onChangeText={setLastName} placeholder="Doe" />
            </View>
          </View>
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
          />
          <Input
            keyboardType="phone-pad"
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="+254700000000"
          />
          <View>
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Strong password"
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
          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Repeat password"
            secureTextEntry={!showPassword}
          />

          <Button title="Create Account" onPress={submit} loading={isLoading} />

          {googleAvailable ? (
            <Pressable style={styles.googleButton} onPress={signupWithGoogle}>
              <Ionicons name="logo-google" size={20} color={COLORS.text} />
              <Text style={styles.googleText}>Sign up with Google</Text>
            </Pressable>
          ) : null}

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
  nameRow: { flexDirection: "row", gap: 10 },
  nameField: { flex: 1 },
  eyeButton: { position: "absolute", right: 12, top: 39, padding: 8 },
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
