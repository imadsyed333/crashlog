import { Collision, Person, Vehicle } from "@/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

interface CollisionFormStore {
  collison: Collision;
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
  collison: newCollision(),
  updateCollisionField: (key, value) =>
    set((state) => ({
      collison: {
        ...state.collison,
        [key]: value,
      },
    })),
  setForm: (collision) =>
    set({
      collison: collision,
    }),
  addVehicle: (vehicle) =>
    set((state) => ({
      collison: {
        ...state.collison,
        vehicles: [...state.collison.vehicles, vehicle],
      },
    })),
  updateVehicle: (id: string, vehicle: Vehicle) =>
    set((state) => ({
      collison: {
        ...state.collison,
        vehicles: state.collison.vehicles.map((v) =>
          v.id === id ? vehicle : v
        ),
      },
    })),
  addWitness: (witness) =>
    set((state) => ({
      collison: {
        ...state.collison,
        witnesses: [...state.collison.witnesses, witness],
      },
    })),
  updateWitness: (id: string, witness) =>
    set((state) => ({
      collison: {
        ...state.collison,
        witnesses: state.collison.witnesses.map((w) =>
          w.id === id ? witness : w
        ),
      },
    })),
  resetForm: () =>
    set({
      collison: newCollision(),
    }),
}));
