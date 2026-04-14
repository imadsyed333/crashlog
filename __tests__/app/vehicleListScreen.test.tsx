import VehicleListScreen from "@/app/collisions/form/vehicleListScreen";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    navigate: jest.Mock;
    back: jest.Mock;
  };
  __mockUseLocalSearchParams: jest.Mock;
};

describe("vehicle list screen", () => {
  it("resets the vehicle form and navigates to the vehicle form screen", () => {
    useVehicleFormStore.getState().updateVehicleField("make", "Ford");
    useVehicleFormStore.getState().setEdit(true);

    renderWithProviders(<VehicleListScreen />);

    fireEvent.press(screen.getByText("Add Vehicle"));

    expect(useVehicleFormStore.getState().vehicle.make).toBe("");
    expect(useVehicleFormStore.getState().isEdit).toBe(false);
    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith(
      "/collisions/form/vehicleFormScreen",
    );
  });

  it("navigates to the witness list when continuing", () => {
    renderWithProviders(<VehicleListScreen />);

    fireEvent.press(screen.getByText("Next"));

    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith(
      "/collisions/form/witnessListScreen",
    );
  });

  it("goes back when saving in edit mode", () => {
    expoRouter.__mockUseLocalSearchParams.mockReturnValue({ mode: "edit" });

    renderWithProviders(<VehicleListScreen />);

    fireEvent.press(screen.getByText("Save Changes"));

    expect(expoRouter.__mockRouter.back).toHaveBeenCalled();
    expect(expoRouter.__mockRouter.navigate).not.toHaveBeenCalled();
  });
});
