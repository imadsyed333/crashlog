import { Collision } from "@/types";
import { create } from "zustand";

interface CollisionState {
  collisions: Collision[];
  currentCollision: Collision | null;
  addCollision: (collision: Collision) => void;
  deleteCollision: (id: string) => void;
}

export const useCollisionStore = create<CollisionState>((set) => ({
  collisions: [],
  currentCollision: null,
  addCollision: (collision: Collision) =>
    set((state) => ({ collisions: [...state.collisions, collision] })),
  deleteCollision: (id: string) =>
    set((state) => ({
      collisions: state.collisions.filter((collision) => collision.id !== id),
    })),
}));
