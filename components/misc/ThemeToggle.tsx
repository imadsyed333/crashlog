import { useThemeStore } from "@/store/themeStore";
import React from "react";
import { IconButton, useTheme } from "react-native-paper";

const ThemeToggle = () => {
  const { theme: appTheme, toggleTheme } = useThemeStore();
  const paperTheme = useTheme();
  const isLight = appTheme === "light";

  return (
    <IconButton
      icon={isLight ? "moon-waning-crescent" : "white-balance-sunny"}
      iconColor={paperTheme.colors.onSurface}
      onPress={toggleTheme}
      accessibilityLabel={isLight ? "Switch to dark mode" : "Switch to light mode"}
      accessibilityRole="button"
    />
  );
};

export default ThemeToggle;
