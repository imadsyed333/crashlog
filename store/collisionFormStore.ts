import { Collision } from "@/types";
import { nanoid } from "nanoid";
import { create } from "zustand";

interface CollisionFormStore extends Collision {
  updateField: <K extends keyof Collision>(key: K, value: Collision[K]) => void;
  setForm: (collision: Collision) => void;
  resetForm: () => void;
}

const defaultCollision: Collision = {
  id: nanoid(),
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
  updateField: (key, value) => set({ [key]: value }),
  setForm: (collision) =>
    set({
      ...collision,
    }),
  resetForm: () =>
    set({
      ...defaultCollision,
    }),
}));
