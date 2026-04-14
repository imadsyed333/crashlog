import ReviewScreen from "@/app/collisions/form/reviewScreen";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { makeCollision } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    replace: jest.Mock;
  };
};

describe("review screen", () => {
  it("adds a new collision and returns to the home screen", () => {
    const collision = makeCollision("c1");

    useCollisionFormStore.setState({ collision, isEdit: false });

    renderWithProviders(<ReviewScreen />);

    fireEvent.press(screen.getByText("Add Collision"));

    expect(useCollisionStore.getState().collisions).toEqual([collision]);
    expect(expoRouter.__mockRouter.replace).toHaveBeenCalledWith("/");
  });

  it("updates an existing collision when editing", () => {
    const originalCollision = makeCollision("c1");
    const editedCollision = {
      ...originalCollision,
      location: { description: "Updated Location", coordinates: null },
    };

    useCollisionStore.setState({ collisions: [originalCollision] });
    useCollisionFormStore.setState({
      collision: editedCollision,
      isEdit: true,
    });

    renderWithProviders(<ReviewScreen />);

    fireEvent.press(screen.getByText("Save Collision"));

    expect(
      useCollisionStore.getState().collisions[0].location.description,
    ).toBe("Updated Location");
    expect(expoRouter.__mockRouter.replace).toHaveBeenCalledWith("/");
  });
});
