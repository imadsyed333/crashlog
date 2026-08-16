import { getMediaType } from "@/lib/media";
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
import { Icon, IconButton, useTheme } from "react-native-paper";
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

  const mediaType = getMediaType(media);
  const isVideo = mediaType === "video";
  const previewUri = isVideo ? media.thumbnailUri : media.uri;

  return (
    <View style={containerStyle}>
      <Pressable onPress={() => setEnlarged(true)}>
        {previewUri ? (
          <Image
            source={{ uri: previewUri }}
            style={[styles.image, imageStyle]}
          />
        ) : (
          <View
            style={[
              styles.image,
              imageStyle,
              {
                backgroundColor: theme.colors.surfaceVariant,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Icon source="play-circle" size={40} color={theme.colors.onSurfaceVariant} />
          </View>
        )}
        {isVideo && previewUri && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
            pointerEvents="none"
          >
            <Icon source="play-circle" size={40} color="rgba(255,255,255,0.9)" />
          </View>
        )}
        {!showActions && (
          <IconButton
            icon={isVideo ? "play" : "magnify"}
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
        type={mediaType}
        visible={enlarged}
        onClose={() => setEnlarged(false)}
      />
    </View>
  );
};

export default MediaCard;
