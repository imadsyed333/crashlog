import { mmkvStorage } from "@/lib/storage";
import { Vehicle } from "@/lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface VehicleStore {
  vehicle: Vehicle | null;
  setVehicle: (v: Vehicle) => void;
  getVehicle: () => Vehicle | null;
}

export const useVehicleStore = create<VehicleStore>()(
  persist(
    (set, get): VehicleStore => ({
      vehicle: null,
      setVehicle: (v: Vehicle) => set({ vehicle: v }),
      getVehicle: () => get().vehicle,
    }),
    {
      name: "vehicle-storage",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
