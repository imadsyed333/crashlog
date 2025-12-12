import { create } from "zustand";

import { Person } from "@/types";
import "react-native-get-random-values";

interface WitnessFormStore extends Person {
  updateWitnessField: <K extends keyof Person>(
    key: K,
    value: Person[K]
  ) => void;
  setForm: (witness: Person) => void;
  resetForm: () => void;
}

const defaultWitness: Person = {
  id: "",
  name: "",
  phoneNumber: "",
  address: "",
};

export const useWitnessFormStore = create<WitnessFormStore>((set) => ({
  ...defaultWitness,
  updateWitnessField: (key, value) => set({ [key]: value }),
  setForm: (witness) =>
    set({
      ...witness,
    }),
  resetForm: () =>
    set({
      ...defaultWitness,
    }),
}));
