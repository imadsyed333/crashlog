import { CollisionList } from "@/components/collisions/CollisionList";
import { useCollisionStore } from "@/store/collisionStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { makeCollision } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

describe("CollisionList", () => {
  it("renders the empty state when no collisions exist", () => {
    renderWithProviders(<CollisionList />);

    expect(screen.getByText("Phew, no collisions yet!")).toBeTruthy();
  });

  it("renders stored collisions and deletes one from the store", () => {
    useCollisionStore.setState({ collisions: [makeCollision("c1")] });

    renderWithProviders(<CollisionList />);

    expect(screen.getByText("5th Ave & Broadway")).toBeTruthy();

    fireEvent.press(screen.UNSAFE_getByProps({ icon: "delete" }));

    expect(useCollisionStore.getState().collisions).toHaveLength(0);
  });
});
