import {
  detailsSchema,
  driverSchema,
  locationSchema,
  personSchema,
  vehicleSchema,
} from "@/lib/schemas";

describe("locationSchema", () => {
  it("passes with a non-empty description and null coordinates", () => {
    const result = locationSchema.safeParse({
      description: "123 Main St",
      coordinates: null,
    });
    expect(result.success).toBe(true);
  });

  it("passes with a non-empty description and valid coordinates", () => {
    const result = locationSchema.safeParse({
      description: "123 Main St",
      coordinates: { latitude: 40.7128, longitude: -74.006 },
    });
    expect(result.success).toBe(true);
  });

  it("fails when description is empty", () => {
    const result = locationSchema.safeParse({
      description: "",
      coordinates: null,
    });
    expect(result.success).toBe(false);
  });

  it("fails when coordinates are provided but malformed", () => {
    const result = locationSchema.safeParse({
      description: "123 Main St",
      coordinates: { latitude: "not-a-number", longitude: -74.006 },
    });
    expect(result.success).toBe(false);
  });
});

describe("detailsSchema", () => {
  it("passes with valid location and description", () => {
    const result = detailsSchema.safeParse({
      location: { description: "123 Main St", coordinates: null },
      description: "Rear-end collision at intersection",
    });
    expect(result.success).toBe(true);
  });

  it("fails when location description is empty", () => {
    const result = detailsSchema.safeParse({
      location: { description: "", coordinates: null },
      description: "Some description",
    });
    expect(result.success).toBe(false);
  });

  it("fails when description is empty", () => {
    const result = detailsSchema.safeParse({
      location: { description: "123 Main St", coordinates: null },
      description: "",
    });
    expect(result.success).toBe(false);
  });

  it("fails when both fields are empty", () => {
    const result = detailsSchema.safeParse({
      location: { description: "", coordinates: null },
      description: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("vehicleSchema", () => {
  const validVehicle = {
    make: "Toyota",
    model: "Camry",
    color: "Blue",
    licensePlate: "ABC-1234",
    insuranceCompany: "State Farm",
    policyNumber: "POL-987654",
  };

  it("passes with all valid fields", () => {
    expect(vehicleSchema.safeParse(validVehicle).success).toBe(true);
  });

  it.each([
    "make",
    "model",
    "color",
    "licensePlate",
    "insuranceCompany",
    "policyNumber",
  ])("fails when %s is empty", (field) => {
    const data = { ...validVehicle, [field]: "" };
    expect(vehicleSchema.safeParse(data).success).toBe(false);
  });
});

describe("personSchema", () => {
  const validPerson = {
    name: "Jane Doe",
    address: "456 Elm Street, Springfield",
    phoneNumber: "+12025550123",
  };

  it("passes with valid person data", () => {
    expect(personSchema.safeParse(validPerson).success).toBe(true);
  });

  it("fails when name is empty", () => {
    expect(personSchema.safeParse({ ...validPerson, name: "" }).success).toBe(
      false,
    );
  });

  it("fails when address is empty", () => {
    expect(
      personSchema.safeParse({ ...validPerson, address: "" }).success,
    ).toBe(false);
  });

  it("fails when phoneNumber is empty", () => {
    expect(
      personSchema.safeParse({ ...validPerson, phoneNumber: "" }).success,
    ).toBe(false);
  });

  it("fails when phoneNumber is not a valid mobile number", () => {
    expect(
      personSchema.safeParse({ ...validPerson, phoneNumber: "not-a-phone" })
        .success,
    ).toBe(false);
  });
});

describe("driverSchema", () => {
  const validDriver = {
    name: "John Smith",
    address: "789 Oak Ave, Shelbyville",
    phoneNumber: "+12025550199",
    license: "DL-00112233",
  };

  it("passes with all valid driver fields", () => {
    expect(driverSchema.safeParse(validDriver).success).toBe(true);
  });

  it("fails when license is empty", () => {
    expect(
      driverSchema.safeParse({ ...validDriver, license: "" }).success,
    ).toBe(false);
  });

  it("fails when name is empty", () => {
    expect(driverSchema.safeParse({ ...validDriver, name: "" }).success).toBe(
      false,
    );
  });

  it("fails when phoneNumber is invalid", () => {
    expect(
      driverSchema.safeParse({ ...validDriver, phoneNumber: "12345" }).success,
    ).toBe(false);
  });
});
