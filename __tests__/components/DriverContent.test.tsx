import DriverContent from "@/components/driver/DriverContent";
import { screen } from "@testing-library/react-native";
import React from "react";

import { renderWithProviders } from "../testUtils/renderWithProviders";

describe("DriverContent", () => {
  it("renders the driver fields", () => {
    renderWithProviders(
      <DriverContent
        driver={{
          name: "Jordan Miles",
          license: "A1234-56789-12345",
          phoneNumber: "+12025550111",
          address: "12 Cedar Ave",
        }}
      />,
    );

    expect(screen.getByText(/Full Name:\s*Jordan Miles/)).toBeTruthy();
    expect(
      screen.getByText(/Driver License:\s*A1234-56789-12345/),
    ).toBeTruthy();
    expect(screen.getByText(/Phone Number:\s*\+12025550111/)).toBeTruthy();
    expect(screen.getByText(/Address:\s*12 Cedar Ave/)).toBeTruthy();
  });
});
