import MediaList from "@/components/media/MediaList";
import { screen } from "@testing-library/react-native";
import React from "react";
import { Image } from "react-native";

import { makeCollision } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

describe("MediaList", () => {
  it("renders the empty state when no media exists", () => {
    renderWithProviders(<MediaList media={[]} />);

    expect(screen.getByText("Add Images")).toBeTruthy();
  });

  it("renders media cards when media exists", () => {
    const media = makeCollision("c1").media;

    renderWithProviders(<MediaList media={media} />);

    const images = screen.UNSAFE_getAllByType(Image);

    expect(images).toHaveLength(1);
    expect(images[0].props.source.uri).toBe(media[0].uri);
  });
});
