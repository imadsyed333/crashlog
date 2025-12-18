import { Collision, Person, Vehicle } from "@/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

interface CollisionFormStore {
  collision: Collision;
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

const newCollision = () => {
  return {
    id: "" + uuidv4(),
    date: new Date(),
    location: "",
    description: "",
    vehicles: [],
    witnesses: [],
    media: [],
    officer: null,
  };
};

export const useCollisionFormStore = create<CollisionFormStore>((set) => ({
  collision: newCollision(),
  updateCollisionField: (key, value) =>
    set((state) => ({
      collision: {
        ...state.collision,
        [key]: value,
      },
    })),
  setForm: (collision) =>
    set({
      collision: collision,
    }),
  addVehicle: (vehicle) =>
    set((state) => ({
      collision: {
        ...state.collision,
        vehicles: [...state.collision.vehicles, vehicle],
      },
    })),
  updateVehicle: (id: string, vehicle: Vehicle) =>
    set((state) => ({
      collision: {
        ...state.collision,
        vehicles: state.collision.vehicles.map((v) =>
          v.id === id ? vehicle : v
        ),
      },
    })),
  addWitness: (witness) =>
    set((state) => ({
      collision: {
        ...state.collision,
        witnesses: [...state.collision.witnesses, witness],
      },
    })),
  updateWitness: (id: string, witness) =>
    set((state) => ({
      collision: {
        ...state.collision,
        witnesses: state.collision.witnesses.map((w) =>
          w.id === id ? witness : w
        ),
      },
    })),
  resetForm: () =>
    set({
      collision: newCollision(),
    }),
}));
