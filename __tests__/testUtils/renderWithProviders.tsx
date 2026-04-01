import { theme } from "@/lib/themes";
import { useThemeStore } from "@/store/themeStore";
import { render, RenderOptions } from "@testing-library/react-native";
import React, { ReactElement } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

type AppTheme = "light" | "dark";

type ProviderOptions = RenderOptions & {
  themeMode?: AppTheme;
};

const buildPaperTheme = (themeMode: AppTheme) =>
  themeMode === "dark"
    ? { ...MD3DarkTheme, colors: theme.dark }
    : { ...MD3LightTheme, colors: theme.light };

export const renderWithProviders = (
  ui: ReactElement,
  { themeMode = "light", ...options }: ProviderOptions = {},
) => {
  useThemeStore.setState({ theme: themeMode });

  return render(
    <PaperProvider theme={buildPaperTheme(themeMode)}>
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 390, height: 844 },
          insets: { top: 44, right: 0, bottom: 34, left: 0 },
        }}
      >
        {ui}
      </SafeAreaProvider>
    </PaperProvider>,
    options,
  );
};
