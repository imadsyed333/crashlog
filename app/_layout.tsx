import { initializeSecureStorage } from "@/lib/storage";
import { theme } from "@/lib/themes";
import { useCollisionStore } from "@/store/collisionStore";
import { useThemeStore } from "@/store/themeStore";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const { theme: appTheme } = useThemeStore();
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const initializeStorage = async () => {
      try {
        await initializeSecureStorage();
        await useCollisionStore.persist.rehydrate();
        await useThemeStore.persist.rehydrate();
        setStorageReady(true);
      } catch (error) {
        console.error("Error initializing secure storage:", error);
      }
    };
    initializeStorage();
  }, []);

  if (!storageReady) {
    return null; // Or a loading indicator
  }

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
