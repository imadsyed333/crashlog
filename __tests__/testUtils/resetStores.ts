import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { useThemeStore } from "@/store/themeStore";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { useWitnessFormStore } from "@/store/witnessFormStore";

export const resetAllStores = () => {
  useCollisionStore.setState({ collisions: [] });
  useThemeStore.setState({ theme: "light" });

  useCollisionFormStore.getState().resetForm();

  useVehicleFormStore.getState().resetForm();
  useVehicleFormStore.getState().setDialogVisible(false);

  useWitnessFormStore.getState().resetForm();
  useWitnessFormStore.getState().setDialogVisible(false);
};
