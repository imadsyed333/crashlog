import { validateDriver, validateVehicle, validateWitness } from "@/lib/validators";
import { Driver, Vehicle, Witness } from "@/lib/types";

const validVehicle: Vehicle = {
  id: "v1",
  make: "Honda",
  model: "Civic",
  color: "Red",
  licensePlate: "XYZ-5678",
  insuranceCompany: "Allstate",
  policyNumber: "ALT-111222",
  driver: null,
};

const validDriver: Driver = {
  name: "Alice Johnson",
  address: "10 Baker St, Metropolis",
  phoneNumber: "+12025550101",
  license: "DL-AABBCC",
};

const validWitness: Witness = {
  id: "w1",
  name: "Bob Williams",
  address: "22 Pine Rd, Gotham",
  phoneNumber: "+12025550202",
};

describe("validateVehicle", () => {
  it("returns no errors for a valid vehicle", () => {
    expect(validateVehicle(validVehicle)).toEqual({});
  });

  it("returns an error when make is empty", () => {
    const errors = validateVehicle({ ...validVehicle, make: "" });
    expect(errors.make).toBeDefined();
  });

  it("returns an error when model is empty", () => {
    const errors = validateVehicle({ ...validVehicle, model: "" });
    expect(errors.model).toBeDefined();
  });

  it("returns an error when color is empty", () => {
    const errors = validateVehicle({ ...validVehicle, color: "" });
    expect(errors.color).toBeDefined();
  });

  it("returns an error when licensePlate is empty", () => {
    const errors = validateVehicle({ ...validVehicle, licensePlate: "" });
    expect(errors.licensePlate).toBeDefined();
  });

  it("returns an error when insuranceCompany is empty", () => {
    const errors = validateVehicle({ ...validVehicle, insuranceCompany: "" });
    expect(errors.insuranceCompany).toBeDefined();
  });

  it("returns an error when policyNumber is empty", () => {
    const errors = validateVehicle({ ...validVehicle, policyNumber: "" });
    expect(errors.policyNumber).toBeDefined();
  });

  it("returns errors for multiple invalid fields", () => {
    const errors = validateVehicle({ ...validVehicle, make: "", model: "" });
    expect(errors.make).toBeDefined();
    expect(errors.model).toBeDefined();
  });
});

describe("validateDriver", () => {
  it("returns no errors for a valid driver", () => {
    expect(validateDriver(validDriver)).toEqual({});
  });

  it("returns an error when name is empty", () => {
    const errors = validateDriver({ ...validDriver, name: "" });
    expect(errors.name).toBeDefined();
  });

  it("returns an error when address is empty", () => {
    const errors = validateDriver({ ...validDriver, address: "" });
    expect(errors.address).toBeDefined();
  });

  it("returns an error when phoneNumber is empty", () => {
    const errors = validateDriver({ ...validDriver, phoneNumber: "" });
    expect(errors.phoneNumber).toBeDefined();
  });

  it("returns an error when phoneNumber is not a valid mobile number", () => {
    const errors = validateDriver({ ...validDriver, phoneNumber: "abc" });
    expect(errors.phoneNumber).toBeDefined();
  });

  it("returns an error when license is empty", () => {
    const errors = validateDriver({ ...validDriver, license: "" });
    expect(errors.license).toBeDefined();
  });
});

describe("validateWitness", () => {
  it("returns no errors for a valid witness", () => {
    expect(validateWitness(validWitness)).toEqual({});
  });

  it("returns an error when name is empty", () => {
    const errors = validateWitness({ ...validWitness, name: "" });
    expect(errors.name).toBeDefined();
  });

  it("returns an error when address is empty", () => {
    const errors = validateWitness({ ...validWitness, address: "" });
    expect(errors.address).toBeDefined();
  });

  it("returns an error when phoneNumber is empty", () => {
    const errors = validateWitness({ ...validWitness, phoneNumber: "" });
    expect(errors.phoneNumber).toBeDefined();
  });

  it("returns an error when phoneNumber is invalid", () => {
    const errors = validateWitness({ ...validWitness, phoneNumber: "notaphone" });
    expect(errors.phoneNumber).toBeDefined();
  });
});
