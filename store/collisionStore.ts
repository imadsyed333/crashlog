import { mmkvStorage } from "@/lib/storage";
import { Collision } from "@/lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CollisionStore {
  collisions: Collision[];
  getCollision: (id: string) => Collision | null;
  deleteCollision: (id: string) => void;
  upsertCollision: (collision: Collision) => void;
}

export const useCollisionStore = create<CollisionStore>()(
  persist(
    (set, get): CollisionStore => ({
      collisions: [],
      getCollision: (id: string) =>
        get().collisions.find((c) => c.id === id) || null,
      deleteCollision: (id: string) =>
        set({
          collisions: get().collisions.filter((c) => c.id !== id),
        }),
      upsertCollision: (collision: Collision) => {
        const oldCollisions = get().collisions;
        const hasCollision = oldCollisions.some((c) => c.id === collision.id);
        let newCollisions: Collision[] = [];
        if (hasCollision) {
          newCollisions = oldCollisions.map((c) =>
            c.id === collision.id ? collision : c,
          );
        } else {
          newCollisions = [collision, ...oldCollisions];
        }
        set({ collisions: newCollisions });
      },
    }),
    {
      name: "collision-storage",
      storage: createJSONStorage(() => mmkvStorage),
      skipHydration: true,
    },
  ),
);
