import { Media } from "@/lib/types";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import MediaCard from "./MediaCard";

type MediaGridProps = {
  media: Media[];
  showActions?: boolean;
};

const MediaGrid = ({ media, showActions = false }: MediaGridProps) => {
  if (media.length < 1) {
    return (
      <Surface mode="flat" style={localStyles.emptyState}>
        <Text variant="bodyLarge">Add Images</Text>
      </Surface>
    );
  }

  return (
    <FlatList
      data={media}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={localStyles.row}
      contentContainerStyle={localStyles.contentContainer}
      renderItem={({ item }) => (
        <View style={localStyles.item}>
          <MediaCard
            media={item}
            showActions={showActions}
            containerStyle={localStyles.cardContainer}
            imageStyle={localStyles.image}
          />
        </View>
      )}
    />
  );
};

const localStyles = StyleSheet.create({
  contentContainer: {
    gap: 12,
    paddingBottom: 8,
  },
  row: {
    gap: 12,
  },
  item: {
    flex: 1,
  },
  cardContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    height: undefined,
    marginRight: 0,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
});

export default MediaGrid;
