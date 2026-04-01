import { Collision, Vehicle, Witness } from "@/lib/types";

export const makeVehicle = (id = "vehicle-1"): Vehicle => ({
  id,
  make: "Toyota",
  model: "Camry",
  color: "Blue",
  licensePlate: "ABC-123",
  insuranceCompany: "Progressive",
  policyNumber: "POL-001",
  driver: null,
});

export const makeWitness = (id = "witness-1"): Witness => ({
  id,
  name: "Taylor Brooks",
  address: "123 Main St",
  phoneNumber: "+12025550123",
});

export const makeCollision = (id = "collision-1"): Collision => ({
  id,
  date: new Date("2024-01-15T10:00:00Z"),
  location: "5th Ave & Broadway",
  description: "Minor fender-bender",
  vehicles: [makeVehicle()],
  media: [{ id: "media-1", uri: "file://photo-1.jpg" }],
  witnesses: [makeWitness()],
  officer: null,
});
