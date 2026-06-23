import { useTheme } from "@/theme/useTheme";
import { StatusBar } from "react-native";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle={theme.dark ? "light-content" : "dark-content"}
      />
      {children}
    </>
  );
}
