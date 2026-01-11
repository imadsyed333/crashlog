import { Vehicle } from "@/lib/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

interface VehicleFormStore {
  vehicle: Vehicle;
  isEdit: boolean;
  isDialogVisible: boolean;
  setDialogVisible: (value: boolean) => void;
  setEdit: (value: boolean) => void;
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
  isEdit: false,
  isDialogVisible: false,
  setDialogVisible: (value) =>
    set({
      isDialogVisible: value,
    }),
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
  setEdit: (value) =>
    set({
      isEdit: value,
    }),
  resetForm: () =>
    set({
      vehicle: newVehicle(),
      isEdit: false,
    }),
}));
