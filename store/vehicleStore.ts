import { mmkvStorage } from "@/lib/storage";
import { Vehicle } from "@/lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useVehicleFormStore } from "./vehicleFormStore";

interface VehicleStore {
  vehicle: Vehicle | null;
  setVehicle: (v: Vehicle | null) => void;
  deleteVehicle: () => void;
}

export const useVehicleStore = create<VehicleStore>()(
  persist(
    (set, get): VehicleStore => ({
      vehicle: null,
      setVehicle: (v: Vehicle | null) => set({ vehicle: v }),
      deleteVehicle: () => {
        const { resetForm } = useVehicleFormStore.getState();
        set({ vehicle: null });
        resetForm();
      },
    }),
    {
      name: "vehicle-storage",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
