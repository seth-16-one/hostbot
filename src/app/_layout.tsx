import ToastProvider from "@/providers/ToastProvider";
import AuthProvider from "@/providers/AuthProvider";
import ThemeProvider from "@/theme/ThemeProvider";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
