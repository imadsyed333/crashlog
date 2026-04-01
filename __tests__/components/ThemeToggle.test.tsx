import ThemeToggle from "@/components/misc/ThemeToggle";
import { useThemeStore } from "@/store/themeStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

describe("ThemeToggle", () => {
  it("shows the dark-mode label in light theme and toggles to dark", () => {
    renderWithProviders(<ThemeToggle />, { themeMode: "light" });

    fireEvent.press(screen.getByLabelText("Switch to dark mode"));

    expect(useThemeStore.getState().theme).toBe("dark");
  });

  it("shows the light-mode label in dark theme and toggles to light", () => {
    renderWithProviders(<ThemeToggle />, { themeMode: "dark" });

    fireEvent.press(screen.getByLabelText("Switch to light mode"));

    expect(useThemeStore.getState().theme).toBe("light");
  });
});
