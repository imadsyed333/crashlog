import WitnessCard from "@/components/witnesses/WitnessCard";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { makeWitness } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

describe("WitnessCard", () => {
  it("renders witness details", () => {
    renderWithProviders(<WitnessCard witness={makeWitness("w1")} index={0} />);

    expect(screen.getByText("Witness 1")).toBeTruthy();
    expect(screen.getByText("Taylor Brooks")).toBeTruthy();
    expect(
      screen.getByText(/Address:\s*123 Main St|Address: 123 Main St/),
    ).toBeTruthy();
  });

  it("loads the witness into the dialog form and enters edit mode", () => {
    const witness = makeWitness("w42");

    renderWithProviders(<WitnessCard witness={witness} index={0} />);

    fireEvent.press(screen.UNSAFE_getByProps({ icon: "pencil" }));

    expect(useWitnessFormStore.getState().witness).toEqual(witness);
    expect(useWitnessFormStore.getState().isDialogVisible).toBe(true);
    expect(useWitnessFormStore.getState().isEdit).toBe(true);
  });
});
