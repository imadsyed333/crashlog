import ScreenContainer from "@/components/misc/ScreenContainer";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { renderWithProviders } from "../testUtils/renderWithProviders";

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    back: jest.Mock;
  };
};

describe("ScreenContainer", () => {
  it("renders the title, description, and children", () => {
    renderWithProviders(
      <ScreenContainer
        title="Details"
        description="Review the current collision"
      >
        <Text>Child content</Text>
      </ScreenContainer>,
    );

    expect(screen.getByText("Details")).toBeTruthy();
    expect(screen.getByText("Review the current collision")).toBeTruthy();
    expect(screen.getByText("Child content")).toBeTruthy();
    expect(screen.getByLabelText("Switch to dark mode")).toBeTruthy();
  });

  it("uses the back button when enabled", () => {
    renderWithProviders(
      <ScreenContainer title="Details">Child content</ScreenContainer>,
    );

    fireEvent.press(screen.UNSAFE_getByProps({ icon: "arrow-left" }));

    expect(expoRouter.__mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it("omits the back button when disabled", () => {
    renderWithProviders(
      <ScreenContainer title="Home" backButton={false}>
        <Text>Child content</Text>
      </ScreenContainer>,
    );

    expect(screen.queryAllByTestId("icon-button")).toHaveLength(1);
  });
});
