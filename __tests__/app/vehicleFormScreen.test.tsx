import VehicleFormScreen from "@/app/collisions/form/vehicleFormScreen";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { makeCollision, makeVehicle } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    back: jest.Mock;
  };
};

describe("vehicle form screen", () => {
  it("shows validation errors when required fields are empty", () => {
    renderWithProviders(<VehicleFormScreen />);

    fireEvent.press(screen.getByText("Save Vehicle"));

    expect(screen.getByText("Make must not be empty")).toBeTruthy();
    expect(screen.getByText("Model must not be empty")).toBeTruthy();
    expect(screen.getByText("Color must not be empty")).toBeTruthy();
    expect(screen.getByText("License plate must not be empty")).toBeTruthy();
    expect(
      screen.getByText("Insurance company must not be empty"),
    ).toBeTruthy();
    expect(screen.getByText("Policy number must not be empty")).toBeTruthy();
    expect(expoRouter.__mockRouter.back).not.toHaveBeenCalled();
  });

  it("adds a vehicle to the collision form in create mode", () => {
    renderWithProviders(<VehicleFormScreen />);

    const inputs = screen.getAllByTestId("text-input-flat");

    fireEvent.changeText(inputs[0], "Honda");
    fireEvent.changeText(inputs[1], "Civic");
    fireEvent.changeText(inputs[2], "Silver");
    fireEvent.changeText(inputs[3], "XYZ-987");
    fireEvent.changeText(inputs[4], "Allstate");
    fireEvent.changeText(inputs[5], "POL-999");
    fireEvent.press(screen.getByText("Save Vehicle"));

    expect(useCollisionFormStore.getState().collision.vehicles).toHaveLength(1);
    expect(
      useCollisionFormStore.getState().collision.vehicles[0],
    ).toMatchObject({
      make: "Honda",
      model: "Civic",
      color: "Silver",
      licensePlate: "XYZ-987",
      insuranceCompany: "Allstate",
      policyNumber: "POL-999",
    });
    expect(expoRouter.__mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it("updates an existing vehicle in edit mode", () => {
    const originalVehicle = makeVehicle("v1");
    const editedVehicle = {
      ...originalVehicle,
      color: "White",
    };

    useCollisionFormStore.setState({
      collision: {
        ...makeCollision("c1"),
        vehicles: [originalVehicle],
      },
    });
    useVehicleFormStore.setState({ vehicle: editedVehicle, isEdit: true });

    renderWithProviders(<VehicleFormScreen />);

    fireEvent.press(screen.getByText("Save Vehicle"));

    expect(useCollisionFormStore.getState().collision.vehicles[0].color).toBe(
      "White",
    );
    expect(expoRouter.__mockRouter.back).toHaveBeenCalledTimes(1);
  });
});
