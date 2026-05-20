import DetailsFormScreen from "@/app/collisions/form/detailsFormScreen";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  reverseGeocodeAsync: jest.fn(),
}));

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

const expoLocation = jest.requireMock("expo-location") as {
  requestForegroundPermissionsAsync: jest.Mock;
  getCurrentPositionAsync: jest.Mock;
  reverseGeocodeAsync: jest.Mock;
};

describe("details form screen", () => {
  beforeEach(() => {
    expoLocation.requestForegroundPermissionsAsync.mockResolvedValue({
      status: "granted",
    });
    expoLocation.getCurrentPositionAsync.mockResolvedValue({
      coords: {
        latitude: 43.6532,
        longitude: -79.3832,
      },
    });
    expoLocation.reverseGeocodeAsync.mockResolvedValue([
      {
        streetNumber: "123",
        street: "Main St",
        city: "Toronto",
      },
    ]);
  });

  it("shows validation errors when required fields are empty", () => {
    renderWithProviders(<DetailsFormScreen />);

    fireEvent.press(screen.getByText("Next"));

    expect(screen.getAllByText("Don't leave this empty!")).toHaveLength(2);
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

  it("shows a loading indicator while fetching location", async () => {
    let resolvePermission: ((value: { status: string }) => void) | undefined;
    expoLocation.requestForegroundPermissionsAsync.mockReturnValue(
      new Promise((resolve) => {
        resolvePermission = resolve;
      }),
    );

    renderWithProviders(<DetailsFormScreen />);

    fireEvent.press(screen.getByTestId("location-fetch-icon"));

    expect(screen.getByTestId("location-loading-indicator")).toBeTruthy();

    resolvePermission?.({ status: "granted" });

    await waitFor(() => {
      expect(screen.queryByTestId("location-loading-indicator")).toBeNull();
    });

    expect(screen.getByTestId("location-fetch-icon")).toBeTruthy();
  });
});
