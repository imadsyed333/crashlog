import MediaGrid from "@/components/media/MediaGrid";
import { Media } from "@/lib/types";
import { screen } from "@testing-library/react-native";
import React from "react";
import { Image } from "react-native";

import { renderWithProviders } from "../testUtils/renderWithProviders";

const makeMedia = (): Media[] => [
  { id: "media-1", uri: "file://photo-1.jpg" },
  { id: "media-2", uri: "file://photo-2.jpg" },
  { id: "media-3", uri: "file://photo-3.jpg" },
];

describe("MediaGrid", () => {
  it("renders the empty state when no media exists", () => {
    renderWithProviders(<MediaGrid media={[]} />);

    expect(screen.getByText("Add Images")).toBeTruthy();
  });

  it("renders all media items in the grid", () => {
    const media = makeMedia();

    renderWithProviders(<MediaGrid media={media} />);

    const images = screen.UNSAFE_getAllByType(Image);

    expect(images).toHaveLength(3);
    expect(images.map((image) => image.props.source.uri)).toEqual(
      media.map((item) => item.uri),
    );
  });

  it("shows delete actions when actions are enabled", () => {
    renderWithProviders(<MediaGrid media={makeMedia()} showActions />);

    expect(screen.UNSAFE_getAllByProps({ icon: "delete" })).toHaveLength(3);
  });
});
