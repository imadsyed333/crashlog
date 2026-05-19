import SafetyScreen from "@/app/collisions/form/safetyScreen";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

const expoRouter = jest.requireMock("expo-router") as {
  __mockRouter: {
    navigate: jest.Mock;
  };
};

describe("SafetyScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the safety guidelines correctly", () => {
    renderWithProviders(<SafetyScreen />);

    expect(screen.getByText("Safety First")).toBeTruthy();
    expect(
      screen.getByText("Follow these steps before documenting the collision."),
    ).toBeTruthy();
    expect(screen.getByText("Call 911 Immediately If:")).toBeTruthy();
    expect(screen.getByText("Assess danger")).toBeTruthy();
    expect(screen.getByText("Check for injuries")).toBeTruthy();
    expect(screen.getByText("Stay calm")).toBeTruthy();
  });

  it("displays emergency service criteria", () => {
    renderWithProviders(<SafetyScreen />);

    expect(screen.getByText(/Anyone is injured or in pain/)).toBeTruthy();
    expect(
      screen.getByText(/There is a fire or hazardous materials/),
    ).toBeTruthy();
    expect(screen.getByText(/Vehicles are blocking traffic/)).toBeTruthy();
  });

  it("displays numbered safety checklist steps", () => {
    renderWithProviders(<SafetyScreen />);

    expect(screen.getByText("1")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy();
    expect(screen.getByText("3")).toBeTruthy();
  });

  it("navigates to details form when continue button is pressed", () => {
    renderWithProviders(<SafetyScreen />);

    fireEvent.press(screen.getByText("I'm Safe — Continue"));

    expect(expoRouter.__mockRouter.navigate).toHaveBeenCalledWith(
      "/collisions/form/detailsFormScreen",
    );
  });

  it("displays actionable instructions for each step", () => {
    renderWithProviders(<SafetyScreen />);

    expect(
      screen.getByText(
        /Move vehicles to a safe location if possible. Turn on hazard lights./,
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /Check yourself and all passengers. Do not move injured persons unless necessary./,
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /Take deep breaths. You're safe now and this app will guide you through documentation./,
      ),
    ).toBeTruthy();
  });
});
