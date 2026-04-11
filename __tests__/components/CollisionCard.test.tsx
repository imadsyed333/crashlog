import { CollisionCard } from "@/components/collisions/CollisionCard";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { makeCollision } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    navigate: jest.Mock;
  };
};

describe("CollisionCard", () => {
  it("renders key collision details", () => {
    renderWithProviders(<CollisionCard collision={makeCollision("c1")} />);

    expect(screen.getByText("5th Ave & Broadway")).toBeTruthy();
    expect(screen.getByText("Minor fender-bender")).toBeTruthy();
    expect(screen.getByText("1 vehicle")).toBeTruthy();
    expect(screen.getByText("1 witness")).toBeTruthy();
    expect(screen.getByText("1 photo")).toBeTruthy();
  });

  it("navigates to the collision details screen and seeds the form store", () => {
    const collision = makeCollision("c42");

    renderWithProviders(<CollisionCard collision={collision} />);

    fireEvent.press(screen.getByText(collision.location.description));

    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith(
      "/collisions/c42",
    );
    expect(useCollisionFormStore.getState().collision).toEqual(collision);
  });
});
