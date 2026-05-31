import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { useThemeStore } from "@/store/themeStore";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { useWitnessFormStore } from "@/store/witnessFormStore";

export const resetAllStores = async () => {
  // Clear mock MMKV storage
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mmkvMock = require("react-native-mmkv");
  if (mmkvMock.storage) {
    Object.keys(mmkvMock.storage).forEach((id: string) => {
      mmkvMock.storage[id] = {};
    });
  }

  // Reset Zustand stores
  useCollisionStore.setState({ collisions: [] });
  useThemeStore.setState({ theme: "light" });

  useCollisionFormStore.getState().resetForm();

  useVehicleFormStore.getState().resetForm();
  useVehicleFormStore.getState().setDialogVisible(false);

  useWitnessFormStore.getState().resetForm();
  useWitnessFormStore.getState().setDialogVisible(false);
};
