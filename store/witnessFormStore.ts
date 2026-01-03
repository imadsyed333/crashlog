import { create } from "zustand";

import { Person } from "@/lib/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

interface WitnessFormStore {
  witness: Person;
  isEdit: boolean;
  isDialogVisible: boolean;
  setDialogVisible: (value: boolean) => void;
  updateWitnessField: <K extends keyof Person>(
    key: K,
    value: Person[K]
  ) => void;
  setEdit: (value: boolean) => void;
  setForm: (witness: Person) => void;
  resetForm: () => void;
}

const newWitness = () => {
  return {
    id: "" + uuidv4(),
    name: "",
    phoneNumber: "",
    address: "",
  };
};

export const useWitnessFormStore = create<WitnessFormStore>((set) => ({
  witness: newWitness(),
  isEdit: false,
  isDialogVisible: false,
  setDialogVisible: (value) =>
    set({
      isDialogVisible: value,
    }),
  setEdit: (value) =>
    set({
      isEdit: value,
    }),
  updateWitnessField: (key, value) =>
    set((state) => ({
      witness: {
        ...state.witness,
        [key]: value,
      },
    })),
  setForm: (witness) =>
    set({
      witness: witness,
    }),
  resetForm: () =>
    set({
      witness: newWitness(),
    }),
}));
