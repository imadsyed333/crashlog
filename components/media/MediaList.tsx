import { Media } from "@/lib/types";
import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import MediaCard from "./MediaCard";

type MediaListProps = {
  media: Media[];
  showActions?: boolean;
};

const MediaList = ({ media, showActions = false }: MediaListProps) => {
  return (
    <>
      {media.length > 0 && (
        <ScrollView horizontal>
          {media.map((item) => (
            <MediaCard key={item.id} media={item} showActions={showActions} />
          ))}
        </ScrollView>
      )}
      {media.length < 1 && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
          }}
        >
          <Text variant="bodyLarge">Add Images</Text>
        </View>
      )}
    </>
  );
};

export default MediaList;
