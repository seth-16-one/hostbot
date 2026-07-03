import { useTheme } from "@/theme";
import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  children: ReactNode;
  title: string;
  subtitle: string;
};

export default function AuthLayout({ children, title, subtitle }: Props) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.background,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.dark ? "light-content" : "dark-content"}
      />

      <View style={styles.overlay}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            automaticallyAdjustKeyboardInsets
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.logoContainer}>
              <Text
                style={[
                  styles.brand,
                  {
                    color: theme.colors.primary,
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

                  shadowColor: theme.colors.shadow,

                  shadowOpacity: theme.dark ? 0.25 : 0.08,
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
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
  },

  flex: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,

    justifyContent: "center",

    paddingHorizontal: 24,

    paddingVertical: 30,
  },

  logoContainer: {
    alignItems: "center",

    marginBottom: 38,
  },

  brand: {
    fontSize: 42,

    fontWeight: "900",

    letterSpacing: 0.5,
  },

  subtitle: {
    marginTop: 10,

    textAlign: "center",

    fontSize: 15,

    lineHeight: 24,

    paddingHorizontal: 40,
  },

  card: {
    borderRadius: 28,

    padding: 24,

    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowRadius: 20,

    elevation: 10,
  },

  title: {
    fontSize: 24,

    fontWeight: "800",

    marginBottom: 28,
  },
});
