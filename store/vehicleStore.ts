import { mmkvStorage } from "@/lib/storage";
import { Vehicle } from "@/lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface VehicleStore {
  vehicle: Vehicle | null;
  setVehicle: (v: Vehicle) => void;
  getVehicle: () => Vehicle | null;
  askedForVehicle: boolean;
  setAskedForVehicle: (value: boolean) => void;
  getAskedForVehicle: () => boolean;
}

export const useVehicleStore = create<VehicleStore>()(
  persist(
    (set, get): VehicleStore => ({
      vehicle: null,
      askedForVehicle: false,
      setVehicle: (v: Vehicle) => set({ vehicle: v }),
      getVehicle: () => get().vehicle,
      setAskedForVehicle: (value: boolean) => set({ askedForVehicle: value }),
      getAskedForVehicle: () => get().askedForVehicle,
    }),
    {
      name: "vehicle-storage",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
