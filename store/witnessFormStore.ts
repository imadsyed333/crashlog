import { create } from "zustand";

import { Person } from "@/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

interface WitnessFormStore extends Person {
  updateWitnessField: <K extends keyof Person>(
    key: K,
    value: Person[K]
  ) => void;
  setForm: (witness: Person) => void;
  resetForm: () => void;
}

const defaultWitness = () => {
  return {
    id: "" + uuidv4(),
    name: "",
    phoneNumber: "",
    address: "",
  };
};

export const useWitnessFormStore = create<WitnessFormStore>((set) => ({
  ...defaultWitness(),
  updateWitnessField: (key, value) => set({ [key]: value }),
  setForm: (witness) =>
    set({
      ...witness,
    }),
  resetForm: () =>
    set({
      ...defaultWitness(),
    }),
}));
