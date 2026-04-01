import MediaCard from "@/components/media/MediaCard";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";
import { Image } from "react-native";

import { makeCollision } from "../testUtils/fixtures";
import { renderWithProviders } from "../testUtils/renderWithProviders";

describe("MediaCard", () => {
  it("renders the image uri", () => {
    const media = makeCollision("c1").media[0];

    renderWithProviders(<MediaCard media={media} showActions={false} />);

    const image = screen.UNSAFE_getByType(Image);

    expect(image.props.source.uri).toBe(media.uri);
  });

  it("deletes media from the collision form when actions are enabled", () => {
    const collision = makeCollision("c1");
    const media = collision.media[0];

    useCollisionFormStore.setState({ collision });

    renderWithProviders(<MediaCard media={media} showActions />);

    fireEvent.press(screen.UNSAFE_getByProps({ icon: "delete" }));

    expect(useCollisionFormStore.getState().collision.media).toHaveLength(0);
  });
});
