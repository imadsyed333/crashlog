import { useCollisionFormStore } from "@/store/collisionFormStore";
import { Vehicle, Witness } from "@/lib/types";

jest.mock("react-native-get-random-values");

const makeVehicle = (id: string): Vehicle => ({
  id,
  make: "Ford",
  model: "F-150",
  color: "Black",
  licensePlate: "TRK-0001",
  insuranceCompany: "Geico",
  policyNumber: "GEC-555",
  driver: null,
});

const makeWitness = (id: string): Witness => ({
  id,
  name: "Carol White",
  address: "99 Maple Ave",
  phoneNumber: "+12025550303",
});

beforeEach(() => {
  useCollisionFormStore.getState().resetForm();
});

describe("collisionFormStore – updateCollisionField", () => {
  it("updates the location field", () => {
    useCollisionFormStore.getState().updateCollisionField("location", "Oak Street");
    expect(useCollisionFormStore.getState().collision.location).toBe("Oak Street");
  });

  it("updates the description field", () => {
    useCollisionFormStore.getState().updateCollisionField("description", "Side swipe");
    expect(useCollisionFormStore.getState().collision.description).toBe("Side swipe");
  });
});

describe("collisionFormStore – vehicle CRUD", () => {
  it("adds a vehicle to the collision", () => {
    const vehicle = makeVehicle("v1");
    useCollisionFormStore.getState().addVehicle(vehicle);
    expect(useCollisionFormStore.getState().collision.vehicles).toHaveLength(1);
    expect(useCollisionFormStore.getState().collision.vehicles[0]).toEqual(vehicle);
  });

  it("updates an existing vehicle in the collision", () => {
    const vehicle = makeVehicle("v1");
    useCollisionFormStore.getState().addVehicle(vehicle);
    const updated: Vehicle = { ...vehicle, color: "White" };
    useCollisionFormStore.getState().updateVehicle(updated);
    expect(useCollisionFormStore.getState().collision.vehicles[0].color).toBe("White");
  });

  it("does not change the number of vehicles when updating", () => {
    useCollisionFormStore.getState().addVehicle(makeVehicle("v1"));
    useCollisionFormStore.getState().addVehicle(makeVehicle("v2"));
    useCollisionFormStore
      .getState()
      .updateVehicle({ ...makeVehicle("v1"), make: "Chevy" });
    expect(useCollisionFormStore.getState().collision.vehicles).toHaveLength(2);
  });

  it("deletes a vehicle by id", () => {
    useCollisionFormStore.getState().addVehicle(makeVehicle("v1"));
    useCollisionFormStore.getState().addVehicle(makeVehicle("v2"));
    useCollisionFormStore.getState().deleteVehicle("v1");
    const vehicles = useCollisionFormStore.getState().collision.vehicles;
    expect(vehicles).toHaveLength(1);
    expect(vehicles[0].id).toBe("v2");
  });
});

describe("collisionFormStore – witness CRUD", () => {
  it("adds a witness to the collision", () => {
    const witness = makeWitness("w1");
    useCollisionFormStore.getState().addWitness(witness);
    expect(useCollisionFormStore.getState().collision.witnesses).toHaveLength(1);
    expect(useCollisionFormStore.getState().collision.witnesses[0]).toEqual(witness);
  });

  it("updates an existing witness in the collision", () => {
    const witness = makeWitness("w1");
    useCollisionFormStore.getState().addWitness(witness);
    const updated: Witness = { ...witness, name: "Updated Name" };
    useCollisionFormStore.getState().updateWitness(updated);
    expect(useCollisionFormStore.getState().collision.witnesses[0].name).toBe(
      "Updated Name"
    );
  });

  it("deletes a witness by id", () => {
    useCollisionFormStore.getState().addWitness(makeWitness("w1"));
    useCollisionFormStore.getState().addWitness(makeWitness("w2"));
    useCollisionFormStore.getState().deleteWitness("w1");
    const witnesses = useCollisionFormStore.getState().collision.witnesses;
    expect(witnesses).toHaveLength(1);
    expect(witnesses[0].id).toBe("w2");
  });
});

describe("collisionFormStore – media CRUD", () => {
  it("adds media to the collision", () => {
    useCollisionFormStore.getState().addMedia("file://photo1.jpg");
    expect(useCollisionFormStore.getState().collision.media).toHaveLength(1);
    expect(useCollisionFormStore.getState().collision.media[0].uri).toBe(
      "file://photo1.jpg"
    );
  });

  it("prepends media so the newest appears first", () => {
    useCollisionFormStore.getState().addMedia("file://photo1.jpg");
    useCollisionFormStore.getState().addMedia("file://photo2.jpg");
    expect(useCollisionFormStore.getState().collision.media[0].uri).toBe(
      "file://photo2.jpg"
    );
  });

  it("deletes media by id", () => {
    useCollisionFormStore.getState().addMedia("file://photo1.jpg");
    const mediaId = useCollisionFormStore.getState().collision.media[0].id;
    useCollisionFormStore.getState().deleteMedia(mediaId);
    expect(useCollisionFormStore.getState().collision.media).toHaveLength(0);
  });
});

describe("collisionFormStore – setForm and isEdit", () => {
  it("setForm replaces the current collision", () => {
    const id = useCollisionFormStore.getState().collision.id;
    useCollisionFormStore.getState().setForm({
      id: "custom-id",
      date: new Date("2024-06-01"),
      location: "Broadway",
      description: "T-bone",
      vehicles: [],
      media: [],
      witnesses: [],
      officer: null,
    });
    expect(useCollisionFormStore.getState().collision.id).toBe("custom-id");
    expect(useCollisionFormStore.getState().collision.id).not.toBe(id);
  });

  it("setEdit toggles the edit flag", () => {
    expect(useCollisionFormStore.getState().isEdit).toBe(false);
    useCollisionFormStore.getState().setEdit(true);
    expect(useCollisionFormStore.getState().isEdit).toBe(true);
  });
});

describe("collisionFormStore – resetForm", () => {
  it("resets the form to a fresh collision", () => {
    useCollisionFormStore.getState().updateCollisionField("location", "Some Location");
    useCollisionFormStore.getState().setEdit(true);
    useCollisionFormStore.getState().resetForm();
    expect(useCollisionFormStore.getState().collision.location).toBe("");
    expect(useCollisionFormStore.getState().isEdit).toBe(false);
  });

  it("generates a new collision id on reset", () => {
    const oldId = useCollisionFormStore.getState().collision.id;
    useCollisionFormStore.getState().resetForm();
    expect(useCollisionFormStore.getState().collision.id).not.toBe(oldId);
  });
});
