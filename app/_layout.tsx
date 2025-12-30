import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "My Collisions", gestureEnabled: false, headerBackVisible: false }} />
          <Stack.Screen
            name="collisions/form/collisionDetailsFormScreen"
            options={{ title: "Description" }}
          />
          <Stack.Screen
            name="collisions/form/vehicleListScreen"
            options={{
              title: "Vehicles",
            }}
          />
          <Stack.Screen
            name="collisions/form/vehicleFormScreen"
            options={{
              title: "New Vehicle",
            }}
          />
          <Stack.Screen
            name="collisions/form/witnessListScreen"
            options={{
              title: "Witnesses",
            }}
          />
          <Stack.Screen
            name="collisions/form/witnessFormScreen"
            options={{
              title: "New Witness",
            }}
          />
          <Stack.Screen
            name="collisions/form/submitScreen"
            options={{
              title: "Add Collision",
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
