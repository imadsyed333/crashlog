import { styles } from "@/lib/themes";
import { Media } from "@/lib/types";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { Image, View } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";

type MediaCardProps = {
  media: Media;
};

const MediaCard = ({ media }: MediaCardProps) => {
  const { deleteMedia } = useCollisionFormStore();
  return (
    <View>
      <Image source={{ uri: media.uri }} style={styles.image} />
      <IconButton
        icon={"delete"}
        onPress={() => deleteMedia(media.id)}
        mode="contained"
        iconColor={MD3Colors.error50}
        style={{
          position: "absolute",
          bottom: 0,
          right: 10,
        }}
        size={20}
      />
    </View>
  );
};

export default MediaCard;
