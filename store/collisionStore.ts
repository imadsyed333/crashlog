import { Collision } from "@/lib/types";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { create, StateCreator } from "zustand";
import {
  createJSONStorage,
  persist,
  PersistOptions,
  StateStorage,
} from "zustand/middleware";

interface CollisionStore {
  collisions: Collision[];
  getCollision: (id: string) => Collision | null;
  addCollision: (collision: Collision) => void;
  deleteCollision: (id: string) => void;
  updateCollision: (collision: Collision) => void;
}

const secureStorage: StateStorage = {
  getItem: getItemAsync,
  setItem: setItemAsync,
  removeItem: deleteItemAsync,
};

type CollisionPersist = (
  config: StateCreator<CollisionStore>,
  options: PersistOptions<CollisionStore>
) => StateCreator<CollisionStore>;

export const useCollisionStore = create<CollisionStore, []>(
  (persist as CollisionPersist)(
    (set, get): CollisionStore => ({
      collisions: [],
      getCollision: (id: string) =>
        get().collisions.find((c) => c.id === id) || null,
      addCollision: (collision: Collision) =>
        set({ collisions: [collision, ...get().collisions] }),
      deleteCollision: (id: string) =>
        set({
          collisions: get().collisions.filter((c) => c.id !== id),
        }),
      updateCollision: (collision: Collision) =>
        set({
          collisions: get().collisions.map((c) =>
            c.id === collision.id ? collision : c
          ),
        }),
    }),
    {
      name: "collision-storage",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
