import WitnessDialog from "@/components/witnesses/WitnessDialog";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

describe("WitnessDialog", () => {
  it("shows validation errors for an invalid submission", () => {
    useWitnessFormStore.getState().setDialogVisible(true);

    renderWithProviders(<WitnessDialog />);

    fireEvent.press(screen.getByText("Save"));

    expect(screen.getByText("Name must not be empty")).toBeTruthy();
    expect(screen.getByText("Phone number must not be empty")).toBeTruthy();
    expect(screen.getByText("Address must not be empty")).toBeTruthy();
  });

  it("adds a witness and closes the dialog after a valid submission", () => {
    useWitnessFormStore.getState().setDialogVisible(true);

    renderWithProviders(<WitnessDialog />);

    const inputs = screen.getAllByTestId("text-input-flat");

    fireEvent.changeText(inputs[0], "Jordan Lee");
    fireEvent.changeText(inputs[1], "+12025550199");
    fireEvent.changeText(inputs[2], "88 State St");
    fireEvent.press(screen.getByText("Save"));

    expect(useCollisionFormStore.getState().collision.witnesses).toHaveLength(
      1,
    );
    expect(
      useCollisionFormStore.getState().collision.witnesses[0],
    ).toMatchObject({
      name: "Jordan Lee",
      phoneNumber: "+12025550199",
      address: "88 State St",
    });
    expect(useWitnessFormStore.getState().isDialogVisible).toBe(false);
  });
});
