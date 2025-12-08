import { Vehicle } from "@/types";
import "react-native-get-random-values";
import { create } from "zustand";

interface VehicleFormStore extends Vehicle {
  updateVehicleField: <K extends keyof Vehicle>(
    key: K,
    value: Vehicle[K]
  ) => void;
  setForm: (vehicle: Vehicle) => void;
  resetForm: () => void;
}

const defaultVehicle: Vehicle = {
  id: "",
  make: "",
  model: "",
  color: "",
  licensePlate: "",
  insuranceCompany: "",
  policyNumber: "",
  driver: null,
};

export const useVehicleFormStore = create<VehicleFormStore>((set) => ({
  ...defaultVehicle,
  updateVehicleField: (key, value) => set({ [key]: value }),
  setForm: (vehicle) =>
    set({
      ...vehicle,
    }),
  resetForm: () =>
    set({
      ...defaultVehicle,
    }),
}));
