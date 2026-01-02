import VehicleList from "@/components/vehicles/VehicleList";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { styles } from "@/themes";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const VehicleListScreen = () => {
  const insets = useSafeAreaInsets();
  const { resetForm } = useVehicleFormStore();
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
      }}
    >
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          resetForm();
          router.navigate("/collisions/form/vehicleFormScreen");
        }}
      >
        Add Vehicle
      </Button>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VehicleList />
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          router.navigate("/collisions/form/witnessListScreen");
        }}
      >
        Next
      </Button>
    </View>
  );
};

export default VehicleListScreen;
