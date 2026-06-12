import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Alert } from "react-native";
import { Button } from "react-native-paper";

const VehicleDraftButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { vehicle } = useVehicleFormStore();
  const { upsertVehicle } = useCollisionFormStore();

  const saveForLater = () => {
    const draftVehicle = {
      ...vehicle,
      savePoint: pathname,
    };

    upsertVehicle(draftVehicle);

    Alert.alert(
      "Saved",
      "Your progress has been saved. You can continue filling out the form later.",
    );
    router.back();
  };
  return (
    <Button mode="contained" onPress={saveForLater} style={{ marginTop: 10 }}>
      Save for Later
    </Button>
  );
};

export default VehicleDraftButton;
