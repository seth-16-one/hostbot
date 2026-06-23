import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemePreference = "light" | "dark" | "system";

interface SettingsStore {
  themePreference: ThemePreference;
  pushEnabled: boolean;
  emailEnabled: boolean;
  botAlerts: boolean;
  setThemePreference: (preference: ThemePreference) => void;
  setPushEnabled: (enabled: boolean) => void;
  setEmailEnabled: (enabled: boolean) => void;
  setBotAlerts: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      themePreference: "system",
      pushEnabled: true,
      emailEnabled: true,
      botAlerts: true,
      setThemePreference: (themePreference) => set({ themePreference }),
      setPushEnabled: (pushEnabled) => set({ pushEnabled }),
      setEmailEnabled: (emailEnabled) => set({ emailEnabled }),
      setBotAlerts: (botAlerts) => set({ botAlerts }),
    }),
    {
      name: "hostbot-settings",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
