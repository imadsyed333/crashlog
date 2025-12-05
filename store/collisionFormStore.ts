import { Media, Officer, Person, Vehicle } from "@/types";
import { nanoid } from "nanoid";
import { create } from "zustand";

interface CollisionFormStore {
  id: string;
  date: Date | null;
  location: string;
  description: string;
  vehicles: Vehicle[];
  media: Media[];
  witnesses: Person[];
  officer: Officer | null;
  updateField: <K extends keyof CollisionFormStore>(
    key: K,
    value: CollisionFormStore[K]
  ) => void;
  resetForm: () => void;
}

export const useCollisionFormStore = create<CollisionFormStore>((set) => ({
  id: nanoid(),
  date: null,
  location: "",
  description: "",
  vehicles: [],
  witnesses: [],
  media: [],
  officer: null,
  updateField: (key, value) => set({ [key]: value }),
  resetForm: () =>
    set({
      id: nanoid(),
      date: null,
      location: "",
      description: "",
      vehicles: [],
      witnesses: [],
      media: [],
      officer: null,
    }),
}));
