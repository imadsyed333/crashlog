import { CollisionList } from "@/components/collisions/CollisionList";
import { useCollisionStore } from "@/store/collisionStore";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import React from "react";

import { makeCollision } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

describe("CollisionList", () => {
  it("renders the empty state when no collisions exist", async () => {
    renderWithProviders(<CollisionList />);

    await waitFor(() => {
      expect(screen.getByText("Phew, no collisions yet!")).toBeTruthy();
    });
  });

  it("renders stored collisions and deletes one from the store", async () => {
    useCollisionStore.setState({ collisions: [makeCollision("c1")] });

    renderWithProviders(<CollisionList />);

    await waitFor(() => {
      expect(screen.getByText("5th Ave & Broadway")).toBeTruthy();
    });

    fireEvent.press(screen.UNSAFE_getByProps({ icon: "delete" }));

    expect(useCollisionStore.getState().collisions).toHaveLength(0);
  });
});
