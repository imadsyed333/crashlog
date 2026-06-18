import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Alert, StyleProp, ViewStyle } from "react-native";
import { Button } from "react-native-paper";

type VehicleDraftButtonProps = {
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
  children?: string;
};

const VehicleDraftButton = ({
  mode = "contained",
  style,
  compact = false,
  children = "Save for Later",
}: VehicleDraftButtonProps) => {
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
    <Button
      mode={mode}
      onPress={saveForLater}
      style={style || { marginTop: 10 }}
      icon="content-save"
      compact={compact}
    >
      {children}
    </Button>
  );
};

export default VehicleDraftButton;
