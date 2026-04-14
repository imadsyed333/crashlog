import Index from "@/app/index";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    navigate: jest.Mock;
  };
};

describe("index screen", () => {
  it("resets the form and navigates to the collision details flow", () => {
    useCollisionFormStore.getState().updateCollisionField("location", {
      description: "Old value",
      coordinates: null,
    });
    useCollisionFormStore.getState().setEdit(true);

    renderWithProviders(<Index />);

    fireEvent.press(screen.getByText("Add Collision"));

    expect(useCollisionFormStore.getState().collision.location).toEqual({
      description: "",
      coordinates: null,
    });
    expect(useCollisionFormStore.getState().isEdit).toBe(false);
    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith(
      "/collisions/form/detailsFormScreen",
    );
  });
});
