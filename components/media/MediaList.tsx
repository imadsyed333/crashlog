import { Media } from "@/lib/types";
import React from "react";
import { ScrollView } from "react-native";
import MediaCard from "./MediaCard";

type MediaListProps = {
  media: Media[];
  showActions?: boolean;
};

const MediaList = ({ media, showActions = false }: MediaListProps) => {
  return (
    <ScrollView horizontal>
      {media.map((item) => (
        <MediaCard key={item.id} media={item} showActions={showActions} />
      ))}
    </ScrollView>
  );
};

export default MediaList;
