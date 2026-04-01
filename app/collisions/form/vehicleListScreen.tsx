import CustomFAB from "@/components/misc/CustomFAB";
import NextButton from "@/components/misc/NextButton";
import ScreenContainer from "@/components/misc/ScreenContainer";
import VehicleList from "@/components/vehicles/VehicleList";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const VehicleListScreen = () => {
  const { resetForm, setEdit } = useVehicleFormStore();
  const router = useRouter();

  const handlePress = () => {
    resetForm();
    setEdit(false);
    router.navigate("/collisions/form/vehicleFormScreen");
  };
  return (
    <ScreenContainer
      title="Vehicles"
      description="Add vehicles involved in the collision."
      backButton
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VehicleList />
        <CustomFAB icon="plus" label="Add Vehicle" handlePress={handlePress} />
      </View>
      <NextButton href={"/collisions/form/witnessListScreen"} />
    </ScreenContainer>
  );
};

export default VehicleListScreen;
