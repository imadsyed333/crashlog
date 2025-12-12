import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
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
        <Stack.Screen
          name="collisions/new/witnessListScreen"
          options={{
            title: "Witnesses",
          }}
        />
        <Stack.Screen
          name="collisions/new/witnessFormScreen"
          options={{
            title: "New Witness",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
