import { useWitnessFormStore } from "@/store/witnessFormStore";
import { Witness } from "@/lib/types";

jest.mock("react-native-get-random-values");

const sampleWitness: Witness = {
  id: "w-fixed",
  name: "Diana Prince",
  address: "1 Themyscira Way",
  phoneNumber: "+12025550404",
};

beforeEach(() => {
  useWitnessFormStore.getState().resetForm();
});

describe("witnessFormStore – updateWitnessField", () => {
  it("updates the name field", () => {
    useWitnessFormStore.getState().updateWitnessField("name", "Clark Kent");
    expect(useWitnessFormStore.getState().witness.name).toBe("Clark Kent");
  });

  it("updates the address field", () => {
    useWitnessFormStore.getState().updateWitnessField("address", "344 Clinton St");
    expect(useWitnessFormStore.getState().witness.address).toBe("344 Clinton St");
  });

  it("updates the phoneNumber field", () => {
    useWitnessFormStore.getState().updateWitnessField("phoneNumber", "+12025550505");
    expect(useWitnessFormStore.getState().witness.phoneNumber).toBe("+12025550505");
  });
});

describe("witnessFormStore – setForm", () => {
  it("loads a witness into the form", () => {
    useWitnessFormStore.getState().setForm(sampleWitness);
    expect(useWitnessFormStore.getState().witness).toEqual(sampleWitness);
  });
});

describe("witnessFormStore – setEdit", () => {
  it("sets isEdit to true", () => {
    useWitnessFormStore.getState().setEdit(true);
    expect(useWitnessFormStore.getState().isEdit).toBe(true);
  });

  it("sets isEdit to false after being true", () => {
    useWitnessFormStore.getState().setEdit(true);
    useWitnessFormStore.getState().setEdit(false);
    expect(useWitnessFormStore.getState().isEdit).toBe(false);
  });
});

describe("witnessFormStore – resetForm", () => {
  it("clears all fields back to empty strings", () => {
    useWitnessFormStore.getState().setForm(sampleWitness);
    useWitnessFormStore.getState().setEdit(true);
    useWitnessFormStore.getState().resetForm();
    const { witness, isEdit } = useWitnessFormStore.getState();
    expect(witness.name).toBe("");
    expect(witness.address).toBe("");
    expect(witness.phoneNumber).toBe("");
    expect(isEdit).toBe(false);
  });

  it("generates a new id on reset", () => {
    const oldId = useWitnessFormStore.getState().witness.id;
    useWitnessFormStore.getState().resetForm();
    expect(useWitnessFormStore.getState().witness.id).not.toBe(oldId);
  });
});

describe("witnessFormStore – setDialogVisible", () => {
  it("sets isDialogVisible to true", () => {
    useWitnessFormStore.getState().setDialogVisible(true);
    expect(useWitnessFormStore.getState().isDialogVisible).toBe(true);
  });

  it("sets isDialogVisible to false", () => {
    useWitnessFormStore.getState().setDialogVisible(true);
    useWitnessFormStore.getState().setDialogVisible(false);
    expect(useWitnessFormStore.getState().isDialogVisible).toBe(false);
  });
});
