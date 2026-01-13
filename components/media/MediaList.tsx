import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { ScrollView } from "react-native";
import MediaCard from "./MediaCard";

const MediaList = () => {
  const { collision } = useCollisionFormStore();
  return (
    <ScrollView horizontal>
      {collision.media.map((item) => (
        <MediaCard key={item.id} media={item} />
      ))}
    </ScrollView>
  );
};

export default MediaList;
