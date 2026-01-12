import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { Image, ScrollView } from "react-native";

const MediaList = () => {
  const { collision } = useCollisionFormStore();
  return (
    <ScrollView horizontal>
      {collision.media.map((item) => (
        <Image source={{ uri: item.uri }} style={styles.image} key={item.id} />
      ))}
    </ScrollView>
  );
};

export default MediaList;
