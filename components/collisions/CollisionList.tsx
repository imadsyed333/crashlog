import { useCollisionStore } from "@/store/collisionStore";
import React from "react";
import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import { CollisionCard } from "./CollisionCard";

export const CollisionList = () => {
  const { collisions, deleteCollision } = useCollisionStore();

  const theme = useTheme();

  return (
    <>
      {collisions.length > 0 && (
        <SwipeListView
          data={collisions}
          renderItem={({ item }) => <CollisionCard collision={item} />}
          renderHiddenItem={({ item }) => (
            <View
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <IconButton
                icon={"delete"}
                onPress={() => deleteCollision(item.id)}
                mode="contained"
                size={30}
                iconColor={theme.colors.error}
              />
            </View>
          )}
          style={{
            display: "flex",
            width: "100%",
            padding: 10,
          }}
          rightOpenValue={-75}
        />
      )}
      {collisions.length === 0 && (
        <Text variant="bodyMedium">Phew, no collisions yet!</Text>
      )}
    </>
  );
};
