import CustomAlertDialog from "@/components/misc/CustomAlertDialog";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
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
  const [dialogVisible, setDialogVisible] = useState(false);

  const saveForLater = () => {
    const draftVehicle = {
      ...vehicle,
      savePoint: pathname,
    };
    upsertVehicle(draftVehicle);
    setDialogVisible(true);
  };

  return (
    <>
      <Button
        mode={mode}
        onPress={saveForLater}
        style={style || { marginTop: 10 }}
        icon="content-save"
        compact={compact}
      >
        {children}
      </Button>
      <CustomAlertDialog
        title="Saved Draft"
        message="Your progress has been saved. You can continue filling out the form later."
        isInfo
        isDialogVisible={dialogVisible}
        onSuccess={() => {
          setDialogVisible(false);
          router.back();
        }}
      />
    </>
  );
};

export default VehicleDraftButton;
