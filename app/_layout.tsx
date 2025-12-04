import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "My Collisions" }} />
        <Stack.Screen
          name="collisions/new/index"
          options={{ title: "New Collision" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
