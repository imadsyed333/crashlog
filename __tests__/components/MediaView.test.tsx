import MediaView from "@/components/media/MediaView";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";

import { renderWithProviders } from "../testUtils/renderWithProviders";

jest.mock("expo-image-picker", () => ({
  requestCameraPermissionsAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));

const imagePicker = jest.requireMock("expo-image-picker") as {
  requestCameraPermissionsAsync: jest.Mock;
  launchCameraAsync: jest.Mock;
  requestMediaLibraryPermissionsAsync: jest.Mock;
  launchImageLibraryAsync: jest.Mock;
};

describe("MediaView", () => {
  it("shows an alert when camera permission is denied", async () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
    imagePicker.requestCameraPermissionsAsync.mockResolvedValue({
      granted: false,
    });

    renderWithProviders(<MediaView />);

    fireEvent.press(screen.getByText("Camera"));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Permission required",
        "Permission to access camera is required.",
      );
    });

    alertSpy.mockRestore();
  });

  it("adds media after selecting an image from the photo library", async () => {
    imagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({
      granted: true,
    });
    imagePicker.launchImageLibraryAsync.mockResolvedValue({
      canceled: false,
      assets: [{ uri: "file://library-photo.jpg" }],
    });

    renderWithProviders(<MediaView />);

    fireEvent.press(screen.getByText("Photo Library"));

    await waitFor(() => {
      expect(useCollisionFormStore.getState().collision.media[0].uri).toBe(
        "file://library-photo.jpg",
      );
    });
  });
});
