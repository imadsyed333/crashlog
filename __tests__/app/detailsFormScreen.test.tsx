import DetailsFormScreen from "@/app/collisions/form/detailsFormScreen";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

jest.mock("@/components/datetime/CustomDTPicker", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return () => React.createElement(Text, null, "Date Time Picker");
});

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    navigate: jest.Mock;
    back: jest.Mock;
  };
  __mockUseLocalSearchParams: jest.Mock;
};

describe("details form screen", () => {
  it("shows validation errors when required fields are empty", () => {
    renderWithProviders(<DetailsFormScreen />);

    fireEvent.press(screen.getByText("Next"));

    expect(screen.getByText("Location must not be empty")).toBeTruthy();
    expect(screen.getByText("Description must not be empty")).toBeTruthy();
    expect(expoRouter.__mockRouter.navigate).not.toHaveBeenCalled();
  });

  it("updates the form and navigates to the media list in create mode", () => {
    renderWithProviders(<DetailsFormScreen />);

    const inputs = screen.getAllByTestId("text-input-flat");

    fireEvent.changeText(inputs[0], "Elm Street");
    fireEvent.changeText(inputs[1], "Rear-end collision at a red light");
    fireEvent.press(screen.getByText("Next"));

    expect(useCollisionFormStore.getState().collision.location).toEqual({
      description: "Elm Street",
      coordinates: null,
    });
    expect(useCollisionFormStore.getState().collision.description).toBe(
      "Rear-end collision at a red light",
    );
    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith(
      "/collisions/form/mediaListScreen",
    );
  });

  it("returns to the previous screen when saving valid edits", () => {
    expoRouter.__mockUseLocalSearchParams.mockReturnValue({ mode: "edit" });
    useCollisionFormStore.getState().updateCollisionField("location", {
      description: "Oak Ave",
      coordinates: null,
    });
    useCollisionFormStore
      .getState()
      .updateCollisionField("description", "Side-swipe while merging");

    renderWithProviders(<DetailsFormScreen />);

    fireEvent.press(screen.getByText("Save Changes"));

    expect(expoRouter.__mockRouter.back).toHaveBeenCalledTimes(1);
    expect(expoRouter.__mockRouter.navigate).not.toHaveBeenCalled();
  });
});
