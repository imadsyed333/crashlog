import WitnessListScreen from "@/app/collisions/form/witnessListScreen";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    navigate: jest.Mock;
  };
};

describe("witness list screen", () => {
  it("resets the witness form, exits edit mode, and opens the dialog", () => {
    useWitnessFormStore.getState().updateWitnessField("name", "Pat Doe");
    useWitnessFormStore.getState().setEdit(true);

    renderWithProviders(<WitnessListScreen />);

    fireEvent.press(screen.getByText("Add Witness"));

    expect(useWitnessFormStore.getState().witness.name).toBe("");
    expect(useWitnessFormStore.getState().isEdit).toBe(false);
    expect(useWitnessFormStore.getState().isDialogVisible).toBe(true);
  });

  it("navigates to the review screen when continuing", () => {
    renderWithProviders(<WitnessListScreen />);

    fireEvent.press(screen.getByText("Next"));

    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith(
      "/collisions/form/reviewScreen",
    );
  });
});
