import { Collision, Person, Vehicle } from "@/lib/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

interface CollisionFormStore {
  collision: Collision;
  isEdit: boolean;
  setEdit: (value: boolean) => void;
  updateCollisionField: <K extends keyof Collision>(
    key: K,
    value: Collision[K]
  ) => void;
  setForm: (collision: Collision) => void;
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  addWitness: (witness: Person) => void;
  updateWitness: (witness: Person) => void;
  deleteWitness: (id: string) => void;
  addMedia: (uri: string) => void;
  deleteMedia: (id: string) => void;
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
  isEdit: false,
  setEdit: (value) =>
    set({
      isEdit: value,
    }),
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
  deleteVehicle: (id: string) =>
    set((state) => ({
      collision: {
        ...state.collision,
        vehicles: state.collision.vehicles.filter((v) => v.id !== id),
      },
    })),
  updateVehicle: (vehicle: Vehicle) =>
    set((state) => ({
      collision: {
        ...state.collision,
        vehicles: state.collision.vehicles.map((v) =>
          v.id === vehicle.id ? vehicle : v
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
  updateWitness: (witness: Person) =>
    set((state) => ({
      collision: {
        ...state.collision,
        witnesses: state.collision.witnesses.map((w) =>
          w.id === witness.id ? witness : w
        ),
      },
    })),
  deleteWitness: (id: string) =>
    set((state) => ({
      collision: {
        ...state.collision,
        witnesses: state.collision.witnesses.filter((w) => w.id !== id),
      },
    })),
  addMedia: (uri: string) =>
    set((state) => ({
      collision: {
        ...state.collision,
        media: [
          {
            id: "" + uuidv4(),
            uri,
          },
          ...state.collision.media,
        ],
      },
    })),
  deleteMedia: (id: string) =>
    set((state) => ({
      collision: {
        ...state.collision,
        media: state.collision.media.filter((m) => m.id !== id),
      },
    })),
  resetForm: () =>
    set({
      collision: newCollision(),
      isEdit: false,
    }),
}));
