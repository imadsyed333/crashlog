import { useCollisionFormStore } from "@/store/collisionFormStore";
import {
  initializeCollisionStore,
  useCollisionStore,
} from "@/store/collisionStore";
import { useThemeStore } from "@/store/themeStore";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { useWitnessFormStore } from "@/store/witnessFormStore";

export const resetAllStores = async () => {
  // Reinitialize collision store
  await initializeCollisionStore();

  // Clear mock MMKV storage
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mmkvMock = require("react-native-mmkv");
  if (mmkvMock.storage) {
    Object.keys(mmkvMock.storage).forEach((id: string) => {
      mmkvMock.storage[id] = {};
    });
  }

  // Clear mock expo-secure-store storage
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const secureStoreMock = require("expo-secure-store");
  if (secureStoreMock.store) {
    Object.keys(secureStoreMock.store).forEach((key: string) => {
      delete secureStoreMock.store[key];
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
