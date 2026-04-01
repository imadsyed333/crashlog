import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { Vehicle } from "@/lib/types";

jest.mock("react-native-get-random-values");

const sampleVehicle: Vehicle = {
  id: "v-fixed",
  make: "BMW",
  model: "3 Series",
  color: "Silver",
  licensePlate: "BMW-0001",
  insuranceCompany: "Progressive",
  policyNumber: "PRG-999",
  driver: null,
};

beforeEach(() => {
  useVehicleFormStore.getState().resetForm();
});

describe("vehicleFormStore – updateVehicleField", () => {
  it("updates the make field", () => {
    useVehicleFormStore.getState().updateVehicleField("make", "Tesla");
    expect(useVehicleFormStore.getState().vehicle.make).toBe("Tesla");
  });

  it("updates the model field", () => {
    useVehicleFormStore.getState().updateVehicleField("model", "Model S");
    expect(useVehicleFormStore.getState().vehicle.model).toBe("Model S");
  });

  it("updates the color field", () => {
    useVehicleFormStore.getState().updateVehicleField("color", "White");
    expect(useVehicleFormStore.getState().vehicle.color).toBe("White");
  });

  it("updates the licensePlate field", () => {
    useVehicleFormStore.getState().updateVehicleField("licensePlate", "TSL-0001");
    expect(useVehicleFormStore.getState().vehicle.licensePlate).toBe("TSL-0001");
  });

  it("updates the insuranceCompany field", () => {
    useVehicleFormStore.getState().updateVehicleField("insuranceCompany", "Nationwide");
    expect(useVehicleFormStore.getState().vehicle.insuranceCompany).toBe("Nationwide");
  });

  it("updates the policyNumber field", () => {
    useVehicleFormStore.getState().updateVehicleField("policyNumber", "NW-12345");
    expect(useVehicleFormStore.getState().vehicle.policyNumber).toBe("NW-12345");
  });
});

describe("vehicleFormStore – setForm", () => {
  it("loads a vehicle into the form", () => {
    useVehicleFormStore.getState().setForm(sampleVehicle);
    expect(useVehicleFormStore.getState().vehicle).toEqual(sampleVehicle);
  });
});

describe("vehicleFormStore – setEdit", () => {
  it("sets isEdit to true", () => {
    useVehicleFormStore.getState().setEdit(true);
    expect(useVehicleFormStore.getState().isEdit).toBe(true);
  });

  it("sets isEdit to false", () => {
    useVehicleFormStore.getState().setEdit(true);
    useVehicleFormStore.getState().setEdit(false);
    expect(useVehicleFormStore.getState().isEdit).toBe(false);
  });
});

describe("vehicleFormStore – resetForm", () => {
  it("clears all fields back to empty strings", () => {
    useVehicleFormStore.getState().setForm(sampleVehicle);
    useVehicleFormStore.getState().setEdit(true);
    useVehicleFormStore.getState().resetForm();
    const { vehicle, isEdit } = useVehicleFormStore.getState();
    expect(vehicle.make).toBe("");
    expect(vehicle.model).toBe("");
    expect(vehicle.color).toBe("");
    expect(vehicle.licensePlate).toBe("");
    expect(vehicle.insuranceCompany).toBe("");
    expect(vehicle.policyNumber).toBe("");
    expect(vehicle.driver).toBeNull();
    expect(isEdit).toBe(false);
  });

  it("generates a new id on reset", () => {
    const oldId = useVehicleFormStore.getState().vehicle.id;
    useVehicleFormStore.getState().resetForm();
    expect(useVehicleFormStore.getState().vehicle.id).not.toBe(oldId);
  });
});

describe("vehicleFormStore – setDialogVisible", () => {
  it("sets isDialogVisible to true", () => {
    useVehicleFormStore.getState().setDialogVisible(true);
    expect(useVehicleFormStore.getState().isDialogVisible).toBe(true);
  });

  it("sets isDialogVisible to false", () => {
    useVehicleFormStore.getState().setDialogVisible(true);
    useVehicleFormStore.getState().setDialogVisible(false);
    expect(useVehicleFormStore.getState().isDialogVisible).toBe(false);
  });
});
