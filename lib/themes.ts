import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    marginTop: 5,
  },
  button: {
    margin: 10,
  },
  datetimepicker: {
    marginTop: 5,
  },
  fab: {
    position: "absolute",
    marginRight: 15,
    right: 0,
    bottom: 0,
    borderRadius: 100,
  },
  errorbox: {
    color: "red",
    marginHorizontal: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
  },
});

export const theme = {
  light: {
    primary: "rgb(25, 110, 200)", // slightly more vibrant blue
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(210, 230, 255)",
    onPrimaryContainer: "rgb(0, 32, 70)",

    secondary: "rgb(70, 100, 190)", // shifted from purple → indigo-blue
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(220, 228, 255)",
    onSecondaryContainer: "rgb(10, 20, 90)",

    tertiary: "rgb(0, 120, 140)", // slightly bluer teal
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(170, 235, 255)",
    onTertiaryContainer: "rgb(0, 36, 42)",

    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",

    background: "rgb(248, 250, 255)", // subtle cool tint
    onBackground: "rgb(20, 24, 30)",

    surface: "rgb(248, 250, 255)",
    onSurface: "rgb(20, 24, 30)",

    surfaceVariant: "rgb(220, 226, 240)", // cooler gray
    onSurfaceVariant: "rgb(65, 72, 85)",

    outline: "rgb(110, 120, 135)",
    outlineVariant: "rgb(190, 198, 210)",

    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",

    inverseSurface: "rgb(42, 46, 55)",
    inverseOnSurface: "rgb(240, 242, 248)",
    inversePrimary: "rgb(150, 200, 255)",

    elevation: {
      level0: "transparent",
      level1: "rgb(240, 244, 255)",
      level2: "rgb(232, 238, 252)",
      level3: "rgb(224, 232, 248)",
      level4: "rgb(220, 228, 246)",
      level5: "rgb(216, 224, 244)",
    },

    surfaceDisabled: "rgba(20, 24, 30, 0.12)",
    onSurfaceDisabled: "rgba(20, 24, 30, 0.38)",
    backdrop: "rgba(40, 50, 70, 0.4)", // cooler overlay
  },

  dark: {
    primary: "rgb(150, 200, 255)", // brighter blue pop
    onPrimary: "rgb(0, 45, 90)",
    primaryContainer: "rgb(0, 75, 140)",
    onPrimaryContainer: "rgb(210, 230, 255)",

    secondary: "rgb(180, 200, 255)", // more blue, less purple
    onSecondary: "rgb(30, 40, 110)",
    secondaryContainer: "rgb(55, 70, 150)",
    onSecondaryContainer: "rgb(220, 228, 255)",

    tertiary: "rgb(90, 220, 245)",
    onTertiary: "rgb(0, 50, 60)",
    tertiaryContainer: "rgb(0, 85, 100)",
    onTertiaryContainer: "rgb(170, 235, 255)",

    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",

    background: "rgb(18, 22, 28)", // slightly cooler dark
    onBackground: "rgb(225, 230, 240)",

    surface: "rgb(18, 22, 28)",
    onSurface: "rgb(225, 230, 240)",

    surfaceVariant: "rgb(60, 70, 85)",
    onSurfaceVariant: "rgb(190, 200, 215)",

    outline: "rgb(135, 145, 160)",
    outlineVariant: "rgb(60, 70, 85)",

    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",

    inverseSurface: "rgb(225, 230, 240)",
    inverseOnSurface: "rgb(40, 45, 55)",
    inversePrimary: "rgb(25, 110, 200)",

    elevation: {
      level0: "transparent",
      level1: "rgb(28, 34, 42)",
      level2: "rgb(32, 39, 48)",
      level3: "rgb(36, 44, 54)",
      level4: "rgb(40, 48, 58)",
      level5: "rgb(44, 52, 64)",
    },

    surfaceDisabled: "rgba(225, 230, 240, 0.12)",
    onSurfaceDisabled: "rgba(225, 230, 240, 0.38)",
    backdrop: "rgba(30, 40, 60, 0.4)",
  },
};
