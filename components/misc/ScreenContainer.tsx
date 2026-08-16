import { Stack, useNavigation, useRouter, type Href } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import ThemeToggle from "./ThemeToggle";

type ScreenContainerProps = {
  children: React.ReactNode;
  gestureEnabled?: boolean;
  title: string;
  description?: string;
  backButton?: boolean;
  backHref?: Href;
};

const ScreenContainer = ({
  children,
  gestureEnabled = true,
  title,
  description,
  backButton = true,
  backHref,
}: ScreenContainerProps) => {
  const theme = useTheme();
  const router = useRouter();
  const navigation = useNavigation();

  const handleBack = () => {
    if (backHref) {
      router.dismissTo(backHref);
    } else {
      router.back();
    }
  };

  // Align hardware back with header dismissTo when backHref is set (draft stacks
  // often only contain home + the saved step, so a default pop would go home).
  useEffect(() => {
    if (!backHref) return;

    return navigation.addListener("beforeRemove", (e) => {
      const type = e.data.action.type;
      if (type !== "GO_BACK" && type !== "POP") {
        return;
      }
      e.preventDefault();
      router.dismissTo(backHref);
    });
  }, [backHref, navigation, router]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Stack.Screen
        options={{
          // Avoid native-stack swipe desync with beforeRemove; use header/hardware back.
          gestureEnabled: backHref ? false : gestureEnabled,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 10,
          marginHorizontal: backButton ? 0 : 10,
        }}
      >
        {backButton && (
          <IconButton icon="arrow-left" onPress={handleBack} />
        )}
        <View style={{ flexShrink: 1 }}>
          <Text
            variant="headlineLarge"
            style={{
              textAlign: "left",
              fontWeight: 600,
              fontFamily: "Inter_600SemiBold",
            }}
          >
            {title}
          </Text>
          {description && (
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.onSurfaceVariant,
              }}
            >
              {description}
            </Text>
          )}
        </View>
        <View style={{ marginLeft: "auto" }}>
          <ThemeToggle />
        </View>
      </View>
      <View style={{ flex: 1, margin: 10 }}>{children}</View>
    </View>
  );
};

export default ScreenContainer;
