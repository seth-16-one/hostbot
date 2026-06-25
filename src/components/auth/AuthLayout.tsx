import { ReactNode } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  children: ReactNode;
  title: string;
  subtitle: string;
};

export default function AuthLayout({ children, title, subtitle }: Props) {
  const { theme } = useTheme();

  return (
    <ImageBackground
      source={require("@/assets/images/authbackground.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: theme.dark
              ? "rgba(0,0,0,0.70)"
              : "rgba(255,255,255,0.82)",
          },
        ]}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            automaticallyAdjustKeyboardInsets
            contentContainerStyle={styles.scroll}
          >
            <View style={styles.logoContainer}>
              <View
                style={[
                  styles.logoCircle,
                  {
                    backgroundColor: theme.colors.primary,
                  },
                ]}
              >
                <Ionicons
                  name="hardware-chip-outline"
                  size={40}
                  color="white"
                />
              </View>

              <Text
                style={[
                  styles.brand,
                  {
                    color: theme.colors.text,
                  },
                ]}
              >
                HostBot
              </Text>

              <Text
                style={[
                  styles.subtitle,
                  {
                    color: theme.colors.secondaryText,
                  },
                ]}
              >
                {subtitle}
              </Text>
            </View>

            <View
              style={[
                styles.card,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.title,
                  {
                    color: theme.colors.text,
                  },
                ]}
              >
                {title}
              </Text>

              {children}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 24,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },

  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  brand: {
    fontSize: 34,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 30,
  },

  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
});
