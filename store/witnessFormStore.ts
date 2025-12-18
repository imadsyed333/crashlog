import { create } from "zustand";

import { Person } from "@/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

interface WitnessFormStore {
  witness: Person;
  updateWitnessField: <K extends keyof Person>(
    key: K,
    value: Person[K]
  ) => void;
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
