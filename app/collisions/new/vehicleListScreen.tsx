import VehicleList from "@/components/vehicles/VehicleList";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { styles } from "@/themes";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const VehicleListScreen = () => {
  const { resetForm } = useVehicleFormStore();
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          resetForm();
          router.navigate("/collisions/new/vehicleFormScreen");
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
          router.back();
        }}
      >
        Next
      </Button>
    </View>
  );
};

export default VehicleListScreen;
