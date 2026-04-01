import DriverDialog from "@/components/driver/DriverDialog";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

describe("DriverDialog", () => {
  it("shows validation errors for an invalid submission", () => {
    useVehicleFormStore.getState().setDialogVisible(true);

    renderWithProviders(<DriverDialog />);

    fireEvent.press(screen.getByText("Save"));

    expect(screen.getByText("Name must not be empty")).toBeTruthy();
    expect(screen.getByText("Driver license must not be empty")).toBeTruthy();
    expect(screen.getByText("Phone number must not be empty")).toBeTruthy();
    expect(screen.getByText("Address must not be empty")).toBeTruthy();
  });

  it("adds driver information to the vehicle form and closes the dialog", () => {
    useVehicleFormStore.getState().setDialogVisible(true);

    renderWithProviders(<DriverDialog />);

    const inputs = screen.getAllByTestId("text-input-flat");

    fireEvent.changeText(inputs[0], "Jordan Miles");
    fireEvent.changeText(inputs[1], "A1234-56789-12345");
    fireEvent.changeText(inputs[2], "+12025550111");
    fireEvent.changeText(inputs[3], "12 Cedar Ave");
    fireEvent.press(screen.getByText("Save"));

    expect(useVehicleFormStore.getState().vehicle.driver).toMatchObject({
      name: "Jordan Miles",
      license: "A1234-56789-12345",
      phoneNumber: "+12025550111",
      address: "12 Cedar Ave",
    });
    expect(useVehicleFormStore.getState().isDialogVisible).toBe(false);
  });
});
