export interface Collision {
  id: string;
  date: Date;
  location: string;
  description: string;
  vehicles: Vehicle[];
  media: Media[];
  witnesses: Person[];
  officer: Officer | null;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  color: string;
  licensePlate: string;
  insuranceCompany: string;
  policyNumber: string;
  driver: Driver | null;
}

export interface Person {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
}

export interface Driver extends Person {
  driverLicense: string;
}

export interface Media {
  id: string;
  mediaUrl: string;
}

export interface Location {
  lon: number;
  lat: number;
}

export interface Officer {
  name: string;
  badgeNumber: string;
}
