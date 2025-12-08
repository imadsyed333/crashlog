import { useCollisionStore } from "@/store/collisionStore";
import React from "react";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";
import { CollisionCard } from "./CollisionCard";

export const CollisionList = () => {
  const { collisions } = useCollisionStore();

  return (
    <>
      {collisions.length > 0 && (
        <FlatList
          data={collisions}
          renderItem={({ item }) => <CollisionCard collision={item} />}
          style={{
            display: "flex",
            width: "100%",
          }}
        />
      )}
      {collisions.length === 0 && (
        <Text variant="bodyMedium">Phew, no collisions yet!</Text>
      )}
    </>
  );
};
