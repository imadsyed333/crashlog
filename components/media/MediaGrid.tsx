import { Media } from "@/lib/types";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";
import MediaCard from "./MediaCard";

type MediaGridProps = {
  media: Media[];
  showActions?: boolean;
};

const MediaGrid = ({ media, showActions = false }: MediaGridProps) => {
  const theme = useTheme();

  if (media.length < 1) {
    return (
      <Card mode="contained" style={{ marginBottom: 10 }}>
        <Card.Content style={{ alignItems: "center", padding: 24 }}>
          <Icon
            source="image-multiple"
            size={48}
            color={theme.colors.primary}
          />
          <Text
            variant="titleLarge"
            style={{ marginTop: 16, marginBottom: 8, fontWeight: "600" }}
          >
            No images added
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              marginBottom: 8,
              textAlign: "center",
              opacity: 0.7,
              lineHeight: 20,
            }}
          >
            No photos or media have been attached to this collision yet.
          </Text>
          <Text
            variant="bodySmall"
            style={{
              textAlign: "center",
              opacity: 0.6,
              fontStyle: "italic",
            }}
          >
            Use the Camera or the Photo Library to add images or media
          </Text>
        </Card.Content>
      </Card>
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
});

export default MediaGrid;
