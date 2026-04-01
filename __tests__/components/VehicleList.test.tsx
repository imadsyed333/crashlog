import VehicleList from "@/components/vehicles/VehicleList";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { makeCollision, makeVehicle } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

describe("VehicleList", () => {
  it("renders the empty state when there are no vehicles", () => {
    useCollisionFormStore.setState({
      collision: {
        ...makeCollision("c1"),
        vehicles: [],
      },
    });

    renderWithProviders(<VehicleList />);

    expect(screen.getByText("Add a vehicle")).toBeTruthy();
  });

  it("renders stored vehicles and deletes one from the collision form", () => {
    useCollisionFormStore.setState({
      collision: {
        ...makeCollision("c1"),
        vehicles: [makeVehicle("v1")],
      },
    });

    renderWithProviders(<VehicleList />);

    expect(screen.getByText("Vehicle 1")).toBeTruthy();
    expect(screen.getByText("Blue Toyota Camry")).toBeTruthy();

    fireEvent.press(screen.UNSAFE_getByProps({ icon: "delete" }));

    expect(useCollisionFormStore.getState().collision.vehicles).toHaveLength(0);
  });
});
