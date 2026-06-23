import ToastProvider from "@/providers/ToastProvider";
import ThemeProvider from "@/theme/ThemeProvider";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ToastProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
