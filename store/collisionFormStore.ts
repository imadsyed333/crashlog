import { Collision, Person, Vehicle } from "@/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

interface CollisionFormStore extends Collision {
  updateCollisionField: <K extends keyof Collision>(
    key: K,
    value: Collision[K]
  ) => void;
  setForm: (collision: Collision) => void;
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (id: string, vehicle: Vehicle) => void;
  addWitness: (witness: Person) => void;
  updateWitness: (id: string, witness: Person) => void;
  resetForm: () => void;
}

const defaultCollision: Collision = {
  id: uuidv4(),
  date: new Date(),
  location: "",
  description: "",
  vehicles: [],
  witnesses: [],
  media: [],
  officer: null,
};

export const useCollisionFormStore = create<CollisionFormStore>((set) => ({
  ...defaultCollision,
  updateCollisionField: (key, value) => set({ [key]: value }),
  setForm: (collision) =>
    set({
      ...collision,
    }),
  addVehicle: (vehicle) =>
    set((state) => ({
      vehicles: [...state.vehicles, vehicle],
    })),
  updateVehicle: (id: string, vehicle: Vehicle) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) => (v.id === id ? vehicle : v)),
    })),
  addWitness: (witness) =>
    set((state) => ({
      witnesses: [...state.witnesses, witness],
    })),
  updateWitness: (id: string, witness) =>
    set((state) => ({
      witnesses: state.witnesses.map((w) => (w.id === id ? witness : w)),
    })),
  resetForm: () =>
    set({
      ...defaultCollision,
    }),
}));
