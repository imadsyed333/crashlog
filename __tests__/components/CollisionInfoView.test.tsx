import CollisionInfoView from "@/components/collisions/CollisionInfoView";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { makeCollision } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    navigate: jest.Mock;
  };
};

describe("CollisionInfoView", () => {
  it("renders the main collision sections", () => {
    renderWithProviders(<CollisionInfoView collision={makeCollision("c1")} />);

    expect(screen.getByText("Details")).toBeTruthy();
    expect(screen.getByText("Media")).toBeTruthy();
    expect(screen.getByText("Vehicles")).toBeTruthy();
    expect(screen.getByText("Witnesses")).toBeTruthy();
  });

  it("navigates to edit collision details when actions are enabled", () => {
    renderWithProviders(
      <CollisionInfoView collision={makeCollision("c1")} showActions />,
    );

    fireEvent.press(screen.UNSAFE_getAllByProps({ icon: "pencil" })[0]);

    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith({
      pathname: "/collisions/form/detailsFormScreen",
      params: {
        mode: "edit",
      },
    });
  });

  it("navigates to edit media when actions are enabled", () => {
    renderWithProviders(
      <CollisionInfoView collision={makeCollision("c1")} showActions />,
    );

    fireEvent.press(screen.UNSAFE_getAllByProps({ icon: "pencil" })[1]);

    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith({
      pathname: "/collisions/form/mediaListScreen",
      params: {
        mode: "edit",
      },
    });
  });

  it("navigates to edit vehicles when actions are enabled", () => {
    renderWithProviders(
      <CollisionInfoView collision={makeCollision("c1")} showActions />,
    );

    fireEvent.press(screen.UNSAFE_getAllByProps({ icon: "pencil" })[2]);

    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith({
      pathname: "/collisions/form/vehicleListScreen",
      params: {
        mode: "edit",
      },
    });
  });

  it("navigates to edit witnesses when actions are enabled", () => {
    renderWithProviders(
      <CollisionInfoView collision={makeCollision("c1")} showActions />,
    );

    fireEvent.press(screen.UNSAFE_getAllByProps({ icon: "pencil" })[3]);

    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith({
      pathname: "/collisions/form/witnessListScreen",
      params: {
        mode: "edit",
      },
    });
  });
});
