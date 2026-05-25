import { Collision } from "@/lib/types";
import { getItem, setItem } from "expo-secure-store";
import { createMMKV } from "react-native-mmkv";
import { v4 as uuidv4 } from "uuid";
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

let key = getItem("collision-key");
if (!key) {
  key = uuidv4();
  setItem("collision-key", key);
}

const storage = createMMKV({
  id: "crashlog-storage",
  encryptionType: "AES-256",
  encryptionKey: key,
});

const secureStorage: StateStorage = {
  getItem: (key) => storage.getString(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.remove(key),
};

type CollisionPersist = (
  config: StateCreator<CollisionStore>,
  options: PersistOptions<CollisionStore>,
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
            c.id === collision.id ? collision : c,
          ),
        }),
    }),
    {
      name: "collision-storage",
      storage: createJSONStorage(() => secureStorage),
    },
  ),
);
