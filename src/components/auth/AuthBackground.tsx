import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

interface Props {
  children: ReactNode;
}

export default function AuthBackground({ children }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <LinearGradient
      colors={
        theme.dark
          ? ["#020617", "#0F172A", "#1E293B"]
          : ["#041C32", "#06283D", "#1363DF"]
      }
      style={styles.container}
    >
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    safe: {
      flex: 1,
    },

    flex: {
      flex: 1,
    },

    content: {
      flexGrow: 1,
      justifyContent: "center",
      paddingHorizontal: 24,
      paddingVertical: 30,
    },

    circleOne: {
      position: "absolute",

      width: 240,
      height: 240,
      borderRadius: 120,

      backgroundColor: theme.dark
        ? "rgba(255,255,255,0.04)"
        : "rgba(255,255,255,0.08)",

      top: -80,
      left: -60,
    },

    circleTwo: {
      position: "absolute",

      width: 180,
      height: 180,
      borderRadius: 90,

      backgroundColor: theme.dark
        ? "rgba(255,255,255,0.03)"
        : "rgba(255,255,255,0.05)",

      bottom: -40,
      right: -50,
    },
  });
}
