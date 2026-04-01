import DriverCard from "@/components/driver/DriverCard";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

const makeDriver = () => ({
  name: "Jordan Miles",
  license: "A1234-56789-12345",
  phoneNumber: "+12025550111",
  address: "12 Cedar Ave",
});

describe("DriverCard", () => {
  it("renders an add button when no driver exists", () => {
    renderWithProviders(<DriverCard driver={null} showActions />);

    expect(screen.getByText("Driver")).toBeTruthy();
    expect(screen.getByText("Add Driver")).toBeTruthy();
  });

  it("opens the dialog when adding a driver", () => {
    renderWithProviders(<DriverCard driver={null} showActions />);

    fireEvent.press(screen.getByText("Add Driver"));

    expect(useVehicleFormStore.getState().isDialogVisible).toBe(true);
  });

  it("renders driver details and opens edit mode from the pencil action", () => {
    renderWithProviders(<DriverCard driver={makeDriver()} showActions />);

    expect(screen.getByText(/Full Name:\s*Jordan Miles/)).toBeTruthy();
    expect(
      screen.getByText(/Driver License:\s*A1234-56789-12345/),
    ).toBeTruthy();

    fireEvent.press(screen.UNSAFE_getByProps({ icon: "pencil" }));

    expect(useVehicleFormStore.getState().isDialogVisible).toBe(true);
  });
});
