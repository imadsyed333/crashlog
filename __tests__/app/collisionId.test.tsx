import ViewCollisionScreen from "@/app/collisions/[collisionId]";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { makeCollision } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    navigate: jest.Mock;
  };
  __mockUseLocalSearchParams: jest.Mock;
};

describe("collision details screen", () => {
  it("renders the selected collision and enters edit mode", () => {
    const collision = makeCollision("c1");

    useCollisionStore.setState({ collisions: [collision] });
    expoRouter.__mockUseLocalSearchParams.mockReturnValue({
      collisionId: "c1",
    });

    renderWithProviders(<ViewCollisionScreen />);

    expect(screen.getByText("View Collision")).toBeTruthy();
    expect(screen.getByText("Edit")).toBeTruthy();

    fireEvent.press(screen.getByText("Edit"));

    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith(
      "/collisions/form/reviewScreen",
    );
    expect(useCollisionFormStore.getState().collision).toEqual(collision);
    expect(useCollisionFormStore.getState().isEdit).toBe(true);
  });

  it("shows a not found state when the collision is missing", () => {
    expoRouter.__mockUseLocalSearchParams.mockReturnValue({
      collisionId: "missing-id",
    });

    renderWithProviders(<ViewCollisionScreen />);

    expect(screen.getByText("Collision Not Found")).toBeTruthy();
    expect(screen.queryByText("Edit")).toBeNull();
  });
});
