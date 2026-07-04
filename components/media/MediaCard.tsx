import { styles } from "@/lib/themes";
import { Media } from "@/lib/types";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import React, { useState } from "react";
import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import ImageViewerModal from "./ImageViewerModal";

type MediaCardProps = {
  media: Media;
  showActions: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

const MediaCard = ({
  media,
  showActions,
  containerStyle,
  imageStyle,
}: MediaCardProps) => {
  const { deleteMedia } = useCollisionFormStore();
  const [enlarged, setEnlarged] = useState(false);

  const theme = useTheme();
  return (
    <View style={containerStyle}>
      <Pressable onPress={() => setEnlarged(true)}>
        <Image source={{ uri: media.uri }} style={[styles.image, imageStyle]} />
        {!showActions && (
          <IconButton
            icon="magnify"
            size={16}
            style={{
              position: "absolute",
              bottom: 0,
              right: 10,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
            iconColor="white"
          />
        )}
      </Pressable>
      {showActions && (
        <IconButton
          icon={"delete"}
          onPress={() => deleteMedia(media.id)}
          mode="contained"
          iconColor={theme.colors.error}
          style={{
            position: "absolute",
            bottom: 0,
            right: 10,
          }}
          size={20}
        />
      )}
      <ImageViewerModal
        uri={media.uri}
        visible={enlarged}
        onClose={() => setEnlarged(false)}
      />
    </View>
  );
};

export default MediaCard;
