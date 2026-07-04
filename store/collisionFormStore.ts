import { Collision, Vehicle, Witness } from "@/lib/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { useVehicleStore } from "./vehicleStore";

interface CollisionFormStore {
  collision: Collision;
  isEdit: boolean;
  setEdit: (value: boolean) => void;
  updateCollisionField: <K extends keyof Collision>(
    key: K,
    value: Collision[K],
  ) => void;
  setForm: (collision: Collision) => void;
  upsertVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  addWitness: (witness: Witness) => void;
  updateWitness: (witness: Witness) => void;
  deleteWitness: (id: string) => void;
  addMedia: (uri: string) => void;
  deleteMedia: (id: string) => void;
  resetForm: () => void;
}

const newLocation = () => ({
  description: "",
  coordinates: null,
});

const newCollision = () => {
  const { vehicle } = useVehicleStore.getState();
  return {
    id: "" + uuidv4(),
    date: new Date(),
    location: newLocation(),
    description: "",
    vehicles: vehicle ? [vehicle] : [],
    witnesses: [],
    media: [],
    officer: null,
  };
};

export const useCollisionFormStore = create<CollisionFormStore>((set, get) => ({
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
  deleteVehicle: (id: string) =>
    set((state) => ({
      collision: {
        ...state.collision,
        vehicles: state.collision.vehicles.filter((v) => v.id !== id),
      },
    })),
  upsertVehicle: (vehicle: Vehicle) => {
    const oldVehicles = get().collision.vehicles;
    const hasVehicle = oldVehicles.some((v) => v.id === vehicle.id);
    let newVehicles: Vehicle[] = [];
    if (hasVehicle) {
      newVehicles = oldVehicles.map((v) => (v.id === vehicle.id ? vehicle : v));
    } else {
      newVehicles = [...oldVehicles, vehicle];
    }
    get().updateCollisionField("vehicles", newVehicles);
  },
  addWitness: (witness) =>
    set((state) => ({
      collision: {
        ...state.collision,
        witnesses: [...state.collision.witnesses, witness],
      },
    })),
  updateWitness: (witness: Witness) =>
    set((state) => ({
      collision: {
        ...state.collision,
        witnesses: state.collision.witnesses.map((w) =>
          w.id === witness.id ? witness : w,
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
