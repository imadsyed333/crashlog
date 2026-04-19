import { styles } from "@/lib/themes";
import { Media } from "@/lib/types";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { Image, ImageStyle, StyleProp, View, ViewStyle } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

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

  const theme = useTheme();
  return (
    <View style={containerStyle}>
      <Image source={{ uri: media.uri }} style={[styles.image, imageStyle]} />
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
    </View>
  );
};

export default MediaCard;
