import CustomFAB from "@/components/misc/CustomFAB";
import NextButton from "@/components/misc/NextButton";
import VehicleList from "@/components/vehicles/VehicleList";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const VehicleListScreen = () => {
  const insets = useSafeAreaInsets();
  const { resetForm, setEdit } = useVehicleFormStore();
  const router = useRouter();

  const handleFABPress = () => {
    resetForm();
    setEdit(false);
    router.navigate("/collisions/form/vehicleFormScreen");
  };
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
      }}
    >
      <Stack.Screen
        options={{
          title: "Vehicles",
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VehicleList />
        <CustomFAB
          handlePress={handleFABPress}
          icon="plus"
          label="Add Vehicle"
        />
      </View>
      <NextButton href={"/collisions/form/witnessListScreen"} />
    </View>
  );
};

export default VehicleListScreen;
