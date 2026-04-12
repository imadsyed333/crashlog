import NextButton from "@/components/misc/NextButton";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    navigate: jest.Mock;
    back: jest.Mock;
  };
};

describe("NextButton", () => {
  it("navigates to the provided route when pressed", () => {
    renderWithProviders(<NextButton href="/collisions/form/reviewScreen" />);

    fireEvent.press(screen.getByText("Next"));

    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith(
      "/collisions/form/reviewScreen",
    );
  });

  it("goes back and shows save label when in edit mode", () => {
    renderWithProviders(
      <NextButton href="/collisions/form/reviewScreen" mode="edit" />,
    );

    fireEvent.press(screen.getByText("Save Changes"));

    expect(expoRouter.__mockRouter.back).toHaveBeenCalled();
    expect(expoRouter.__mockRouter.navigate).not.toHaveBeenCalled();
  });
});
