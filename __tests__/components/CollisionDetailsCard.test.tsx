import CollisionDetailsCard from "@/components/collisions/CollisionDetailsCard";
import { screen } from "@testing-library/react-native";
import React from "react";

import { makeCollision } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

describe("CollisionDetailsCard", () => {
  it("renders the collision detail fields", () => {
    renderWithProviders(
      <CollisionDetailsCard collision={makeCollision("c1")} />,
    );

    expect(screen.getByText(/Location:\s*5th Ave & Broadway/)).toBeTruthy();
    expect(screen.getByText(/Description:\s*Minor fender-bender/)).toBeTruthy();
    expect(screen.getByText(/Date:\s*Mon Jan 15 2024/)).toBeTruthy();
    expect(screen.getByText(/Time:/)).toBeTruthy();
  });
});
