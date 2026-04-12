import VehicleCard from "@/components/vehicles/VehicleCard";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { makeVehicle } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    navigate: jest.Mock;
  };
};

describe("VehicleCard", () => {
  it("renders vehicle details and the empty driver state", () => {
    renderWithProviders(<VehicleCard vehicle={makeVehicle("v1")} index={0} />);

    expect(screen.getByText("Vehicle 1")).toBeTruthy();
    expect(screen.getByText("Blue Toyota Camry")).toBeTruthy();
    expect(screen.getByText("No information")).toBeTruthy();
  });

  it("loads the vehicle into the form and navigates to edit it", () => {
    const vehicle = makeVehicle("v42");

    renderWithProviders(
      <VehicleCard vehicle={vehicle} index={0} showActions />,
    );

    fireEvent.press(screen.UNSAFE_getByProps({ icon: "pencil" }));

    expect(useVehicleFormStore.getState().vehicle).toEqual(vehicle);
    expect(useVehicleFormStore.getState().isEdit).toBe(true);
    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith(
      "/collisions/form/vehicleFormScreen",
    );
  });
});
