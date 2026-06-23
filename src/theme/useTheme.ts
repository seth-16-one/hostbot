import { useSettingsStore } from "@/store/settings";
import { useColorScheme } from "react-native";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export function useTheme() {
  const deviceScheme = useColorScheme();
  const preference = useSettingsStore((state) => state.themePreference);
  const setThemePreference = useSettingsStore((state) => state.setThemePreference);
  const resolved = preference === "system" ? deviceScheme ?? "light" : preference;

  return {
    theme: resolved === "dark" ? darkTheme : lightTheme,
    preference,
    setThemePreference,
    resolvedTheme: resolved,
  };
}
