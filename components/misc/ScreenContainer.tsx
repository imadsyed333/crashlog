import { Stack, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import ThemeToggle from "./ThemeToggle";

type ScreenContainerProps = {
  children: React.ReactNode;
  gestureEnabled?: boolean;
  title: string;
  backButton?: boolean;
};

const ScreenContainer = ({
  children,
  gestureEnabled = true,
  title,
  backButton = true,
}: ScreenContainerProps) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Stack.Screen
        options={{
          gestureEnabled: gestureEnabled,
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
          <IconButton icon="arrow-left" onPress={() => router.back()} />
        )}
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
        <View style={{ marginLeft: "auto" }}>
          <ThemeToggle />
        </View>
      </View>
      <View style={{ flex: 1, margin: 10 }}>{children}</View>
    </View>
  );
};

export default ScreenContainer;
