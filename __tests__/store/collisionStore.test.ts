import { Collision } from "@/lib/types";
import { useCollisionStore } from "@/store/collisionStore";

jest.mock("expo-secure-store");

const makeCollision = (id: string): Collision => ({
  id,
  date: new Date("2024-01-15T10:00:00Z"),
  location: { description: "5th Ave & Broadway", coordinates: null },
  description: "Minor fender-bender",
  vehicles: [],
  media: [],
  witnesses: [],
  officer: null,
});

beforeEach(() => {
  useCollisionStore.setState({ collisions: [] });
});

describe("collisionStore – addCollision", () => {
  it("adds a collision to an empty list", () => {
    const collision = makeCollision("c1");
    useCollisionStore.getState().addCollision(collision);
    expect(useCollisionStore.getState().collisions).toHaveLength(1);
    expect(useCollisionStore.getState().collisions[0]).toEqual(collision);
  });

  it("prepends new collisions so the most-recent one appears first", () => {
    const c1 = makeCollision("c1");
    const c2 = makeCollision("c2");
    useCollisionStore.getState().addCollision(c1);
    useCollisionStore.getState().addCollision(c2);
    const { collisions } = useCollisionStore.getState();
    expect(collisions[0].id).toBe("c2");
    expect(collisions[1].id).toBe("c1");
  });
});

describe("collisionStore – getCollision", () => {
  it("returns the collision with the given id", () => {
    const collision = makeCollision("c1");
    useCollisionStore.getState().addCollision(collision);
    expect(useCollisionStore.getState().getCollision("c1")).toEqual(collision);
  });

  it("returns null when the id does not exist", () => {
    expect(useCollisionStore.getState().getCollision("nonexistent")).toBeNull();
  });
});

describe("collisionStore – updateCollision", () => {
  it("updates an existing collision's fields", () => {
    const original = makeCollision("c1");
    useCollisionStore.getState().addCollision(original);

    const updated: Collision = {
      ...original,
      location: { description: "Updated Location", coordinates: null },
    };
    useCollisionStore.getState().updateCollision(updated);

    const stored = useCollisionStore.getState().getCollision("c1");
    expect(stored?.location.description).toBe("Updated Location");
  });

  it("does not change the number of stored collisions", () => {
    const c1 = makeCollision("c1");
    const c2 = makeCollision("c2");
    useCollisionStore.getState().addCollision(c1);
    useCollisionStore.getState().addCollision(c2);

    useCollisionStore
      .getState()
      .updateCollision({ ...c1, description: "Updated" });
    expect(useCollisionStore.getState().collisions).toHaveLength(2);
  });

  it("leaves other collisions unmodified", () => {
    const c1 = makeCollision("c1");
    const c2 = makeCollision("c2");
    useCollisionStore.getState().addCollision(c1);
    useCollisionStore.getState().addCollision(c2);

    useCollisionStore
      .getState()
      .updateCollision({ ...c1, description: "Changed" });
    expect(useCollisionStore.getState().getCollision("c2")).toEqual(c2);
  });
});

describe("collisionStore – deleteCollision", () => {
  it("removes the collision with the given id", () => {
    const collision = makeCollision("c1");
    useCollisionStore.getState().addCollision(collision);
    useCollisionStore.getState().deleteCollision("c1");
    expect(useCollisionStore.getState().collisions).toHaveLength(0);
  });

  it("only removes the targeted collision", () => {
    const c1 = makeCollision("c1");
    const c2 = makeCollision("c2");
    useCollisionStore.getState().addCollision(c1);
    useCollisionStore.getState().addCollision(c2);

    useCollisionStore.getState().deleteCollision("c1");
    const { collisions } = useCollisionStore.getState();
    expect(collisions).toHaveLength(1);
    expect(collisions[0].id).toBe("c2");
  });

  it("does nothing when the id does not exist", () => {
    const collision = makeCollision("c1");
    useCollisionStore.getState().addCollision(collision);
    useCollisionStore.getState().deleteCollision("nonexistent");
    expect(useCollisionStore.getState().collisions).toHaveLength(1);
  });
});
