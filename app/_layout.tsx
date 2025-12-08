import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "My Collisions" }} />
          <Stack.Screen
            name="collisions/new/index"
            options={{ title: "Description" }}
          />
          <Stack.Screen
            name="collisions/new/vehicleListScreen"
            options={{
              title: "Vehicles",
            }}
          />
          <Stack.Screen
            name="collisions/new/vehicleFormScreen"
            options={{
              title: "New Vehicle",
            }}
          />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
