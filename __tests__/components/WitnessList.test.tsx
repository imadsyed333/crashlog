import WitnessList from "@/components/witnesses/WitnessList";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { makeCollision, makeWitness } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

describe("WitnessList", () => {
  it("renders the empty state when there are no witnesses", () => {
    useCollisionFormStore.setState({
      collision: {
        ...makeCollision("c1"),
        witnesses: [],
      },
    });

    renderWithProviders(<WitnessList />);

    expect(screen.getByText("Add a witness")).toBeTruthy();
  });

  it("renders stored witnesses and deletes one from the collision form", () => {
    useCollisionFormStore.setState({
      collision: {
        ...makeCollision("c1"),
        witnesses: [makeWitness("w1")],
      },
    });

    renderWithProviders(<WitnessList />);

    expect(screen.getByText("Witness 1")).toBeTruthy();
    expect(screen.getByText("Taylor Brooks")).toBeTruthy();

    fireEvent.press(screen.UNSAFE_getByProps({ icon: "delete" }));

    expect(useCollisionFormStore.getState().collision.witnesses).toHaveLength(
      0,
    );
  });
});
