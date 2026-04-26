import * as SecureStore from "expo-secure-store";
import { Appearance } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const secureStorage: StateStorage = {
  getItem: async (key) => await SecureStore.getItemAsync(key),
  setItem: async (key, value) => await SecureStore.setItemAsync(key, value),
  removeItem: async (key) => await SecureStore.deleteItemAsync(key),
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: (Appearance.getColorScheme() ?? "light") as Theme,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme-preference",
      storage: createJSONStorage(() => secureStorage),
    },
  ),
);
