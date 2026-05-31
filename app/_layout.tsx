import { theme } from "@/lib/themes";
import { useThemeStore } from "@/store/themeStore";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const { theme: appTheme } = useThemeStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useThemeStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );
    if (useThemeStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  if (!hydrated) return null;

  const paperTheme =
    appTheme === "dark"
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };
  return (
    <>
      <StatusBar style={appTheme === "dark" ? "light" : "dark"} />
      <PaperProvider theme={paperTheme}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: paperTheme.colors.background }}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </SafeAreaView>
      </PaperProvider>
    </>
  );
}
