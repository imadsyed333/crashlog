import validator from "validator";
import z from "zod";

export const collisionDetailsSchema = z.object({
  location: z.string().min(1, { error: "Location must not be empty" }),
  description: z.string().min(1, { error: "Description must not be empty" }),
});

export const vehicleSchema = z.object({
  make: z.string().min(1, { error: "Make must not be empty" }),
  model: z.string().min(1, { error: "Model must not be empty" }),
  color: z.string().min(1, { error: "Color must not be empty" }),
  licensePlate: z.string().min(1, { error: "License plate must not be empty" }),
  insuranceCompany: z
    .string()
    .min(1, { error: "Insurance company must not be empty" }),
  policyNumber: z.string().min(1, "Policy number must not be empty"),
});

export const personSchema = z.object({
  name: z.string().min(1, { error: "Name must not be empty" }),
  address: z.string().min(1, { error: "Address must not be empty" }),
  phoneNumber: z
    .string()
    .min(1, { error: "Phone number must not be empty" })
    .refine(validator.isMobilePhone, { error: "Not a valid phone number" }),
});

export const driverSchema = personSchema.extend({
  driverLicense: z
    .string()
    .min(1, { error: "Driver license must not be empty" }),
});
