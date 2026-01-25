export interface Collision {
  id: string;
  date: Date;
  location: string;
  description: string;
  vehicles: Vehicle[];
  media: Media[];
  witnesses: Witness[];
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
  name: string;
  address: string;
  phoneNumber: string;
}

export interface Driver extends Person {
  license: string;
}

export interface Witness extends Person {
  id: string;
}

export interface Media {
  id: string;
  uri: string;
}

export interface Officer {
  name: string;
  badgeNumber: string;
}
