import { Appearance } from "react-native";
import { createMMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const storage = createMMKV({
  id: "crashlog-storage",
});

const secureStorage: StateStorage = {
  getItem: (key) => storage.getString(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.remove(key),
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
