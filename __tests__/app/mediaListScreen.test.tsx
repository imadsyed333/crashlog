import MediaListScreen from "@/app/collisions/form/mediaListScreen";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

jest.mock("@/components/media/MediaOptions", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return () => React.createElement(Text, null, "Media Options");
});

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    navigate: jest.Mock;
    back: jest.Mock;
  };
  __mockUseLocalSearchParams: jest.Mock;
};

describe("media list screen", () => {
  it("navigates to the vehicle list screen when continuing in create mode", () => {
    renderWithProviders(<MediaListScreen />);

    fireEvent.press(screen.getByText("Next"));

    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith(
      "/collisions/form/vehicleListScreen",
    );
    expect(expoRouter.__mockRouter.back).not.toHaveBeenCalled();
  });

  it("returns to the previous screen when saving in edit mode", () => {
    expoRouter.__mockUseLocalSearchParams.mockReturnValue({ mode: "edit" });

    renderWithProviders(<MediaListScreen />);

    fireEvent.press(screen.getByText("Save Changes"));

    expect(expoRouter.__mockRouter.back).toHaveBeenCalledTimes(1);
    expect(expoRouter.__mockRouter.navigate).not.toHaveBeenCalled();
  });
});
