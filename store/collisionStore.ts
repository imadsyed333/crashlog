import { Collision } from "@/types";
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
  addCollision: (collision: Collision) => void;
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
      addCollision: (collision: Collision) =>
        set({ collisions: [collision, ...get().collisions] }),
    }),
    {
      name: "collision-storage",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
