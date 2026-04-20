import CustomDTPicker from "@/components/datetime/CustomDTPicker";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";
import { Platform } from "react-native";

import { renderWithProviders } from "../testUtils/renderWithProviders";

jest.mock("@react-native-community/datetimepicker", () => {
  const React = require("react");
  const { Text } = require("react-native");

  const MockRNDateTimePicker = jest.fn(() =>
    React.createElement(Text, { testID: "mock-rn-datetimepicker" }, "picker"),
  );

  return {
    __esModule: true,
    default: MockRNDateTimePicker,
    DateTimePickerAndroid: {
      open: jest.fn(),
    },
  };
});

const setPlatformOS = (os: string) => {
  Object.defineProperty(Platform, "OS", {
    value: os,
    configurable: true,
  });
};

const mockedDateTimePickerAndroid = DateTimePickerAndroid as {
  open: jest.Mock;
};
const mockedRNDateTimePicker = RNDateTimePicker as unknown as jest.Mock;
const originalPlatformOS = Platform.OS;

describe("CustomDTPicker", () => {
  const fixedDate = new Date("2026-04-19T13:45:00.000Z");

  beforeEach(() => {
    useCollisionFormStore
      .getState()
      .updateCollisionField("date", new Date(fixedDate));
  });

  afterAll(() => {
    setPlatformOS(originalPlatformOS);
  });

  it("renders non-iOS prompt and uses current date/time as button labels", () => {
    setPlatformOS("android");
    renderWithProviders(<CustomDTPicker />);

    const expectedDate = fixedDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const expectedTime = fixedDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    expect(screen.getByText("When did the collision happen?")).toBeTruthy();
    expect(screen.getByText(expectedDate)).toBeTruthy();
    expect(screen.getByText(expectedTime)).toBeTruthy();
    expect(screen.queryByText("Pick Date")).toBeNull();
    expect(screen.queryByText("Pick Time")).toBeNull();
  });

  it("opens Android date and time pickers with correct modes", () => {
    setPlatformOS("android");
    renderWithProviders(<CustomDTPicker />);

    const expectedDate = fixedDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const expectedTime = fixedDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    fireEvent.press(screen.getByText(expectedDate));
    fireEvent.press(screen.getByText(expectedTime));

    expect(mockedDateTimePickerAndroid.open).toHaveBeenCalledTimes(2);
    expect(mockedDateTimePickerAndroid.open.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        mode: "date",
        is24Hour: false,
        onChange: expect.any(Function),
        value: expect.any(Date),
      }),
    );
    expect(mockedDateTimePickerAndroid.open.mock.calls[1][0]).toEqual(
      expect.objectContaining({
        mode: "time",
        is24Hour: false,
        onChange: expect.any(Function),
        value: expect.any(Date),
      }),
    );
  });

  it("renders iOS datetime picker with light theme variant by default", () => {
    setPlatformOS("ios");
    renderWithProviders(<CustomDTPicker />);

    expect(screen.getByText("When did the collision happen?")).toBeTruthy();
    expect(screen.getByTestId("mock-rn-datetimepicker")).toBeTruthy();
    expect(mockedRNDateTimePicker).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "datetime",
        themeVariant: "light",
        value: expect.any(Date),
      }),
      undefined,
    );
  });

  it("renders iOS datetime picker with dark theme variant in dark mode", () => {
    setPlatformOS("ios");
    renderWithProviders(<CustomDTPicker />, { themeMode: "dark" });

    expect(mockedRNDateTimePicker).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "datetime",
        themeVariant: "dark",
        value: expect.any(Date),
      }),
      undefined,
    );
  });
});
