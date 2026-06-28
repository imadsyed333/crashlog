import CollisionDraftButton from "@/components/collisions/CollisionDraftButton";
import CustomFAB from "@/components/misc/CustomFAB";
import NextButton from "@/components/misc/NextButton";
import ScreenContainer from "@/components/misc/ScreenContainer";
import VehicleList from "@/components/vehicles/VehicleList";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const VehicleListScreen = () => {
  const { resetForm, setEdit } = useVehicleFormStore();
  const router = useRouter();

  const { mode } = useLocalSearchParams<{ mode?: string }>();

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
        <CustomFAB icon="plus" label="" handlePress={handlePress} />
      </View>
      {mode === "edit" ? (
        <NextButton
          href={"/collisions/form/witnessListScreen"}
          mode={mode as "edit" | "create"}
        />
      ) : (
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginVertical: 10,
          }}
        >
          <CollisionDraftButton
            mode="outlined"
            style={{ flex: 1 }}
            children="Save Draft"
          />
          <NextButton
            href={"/collisions/form/witnessListScreen"}
            mode={mode as "edit" | "create"}
            style={{ flex: 2 }}
          />
        </View>
      )}
    </ScreenContainer>
  );
};

export default VehicleListScreen;
