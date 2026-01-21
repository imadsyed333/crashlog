import z from "zod";
import { driverSchema, personSchema, vehicleSchema } from "./schemas";
import { Driver, Person, Vehicle } from "./types";

export const validateVehicle = (vehicle: Vehicle) => {
  const parse = vehicleSchema.safeParse(vehicle);
  if (!parse.success) {
    const errors = z.flattenError(parse.error);
    return errors.fieldErrors;
  } else {
    return {};
  }
};

export const validateDriver = (driver: Driver) => {
  const parse = driverSchema.safeParse(driver);
  if (!parse.success) {
    const errors = z.flattenError(parse.error);
    return errors.fieldErrors;
  } else {
    return {};
  }
};

export const validateWitness = (witness: Person) => {
  const parse = personSchema.safeParse(witness);
  if (!parse.success) {
    const errors = z.flattenError(parse.error);
    return errors.fieldErrors;
  } else {
    return {};
  }
};
