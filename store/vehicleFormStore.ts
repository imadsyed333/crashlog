import { Vehicle } from "@/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

interface VehicleFormStore {
  vehicle: Vehicle;
  updateVehicleField: <K extends keyof Vehicle>(
    key: K,
    value: Vehicle[K]
  ) => void;
  setForm: (vehicle: Vehicle) => void;
  resetForm: () => void;
}

const newVehicle = () => {
  return {
    id: "" + uuidv4(),
    make: "",
    model: "",
    color: "",
    licensePlate: "",
    insuranceCompany: "",
    policyNumber: "",
    driver: null,
  };
};

export const useVehicleFormStore = create<VehicleFormStore>((set) => ({
  vehicle: newVehicle(),
  updateVehicleField: (key, value) =>
    set((state) => ({
      vehicle: {
        ...state.vehicle,
        [key]: value,
      },
    })),
  setForm: (vehicle) =>
    set({
      vehicle: vehicle,
    }),
  resetForm: () =>
    set({
      vehicle: newVehicle(),
    }),
}));
