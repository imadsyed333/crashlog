import CustomFAB from "@/components/misc/CustomFAB";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

describe("CustomFAB", () => {
  it("renders the label and calls the press handler", () => {
    const handlePress = jest.fn();

    renderWithProviders(
      <CustomFAB icon="plus" label="Add Collision" handlePress={handlePress} />,
    );

    fireEvent.press(screen.getByText("Add Collision"));

    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
