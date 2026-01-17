import { styles } from "@/lib/themes";
import { Media } from "@/lib/types";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { Image, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

type MediaCardProps = {
  media: Media;
  showActions: boolean;
};

const MediaCard = ({ media, showActions }: MediaCardProps) => {
  const { deleteMedia } = useCollisionFormStore();

  const theme = useTheme();
  return (
    <View>
      <Image source={{ uri: media.uri }} style={styles.image} />
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
