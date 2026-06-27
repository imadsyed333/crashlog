import { useCollisionStore } from "@/store/collisionStore";
import React from "react";
import { View } from "react-native";
import { Card, Icon, IconButton, Text, useTheme } from "react-native-paper";
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
          }}
          rightOpenValue={-75}
        />
      )}
      {collisions.length === 0 && (
        <Card mode="contained" style={{ marginBottom: 10 }}>
          <Card.Content style={{ alignItems: "center", padding: 24 }}>
            <Icon
              source="shield-check"
              size={48}
              color={theme.colors.primary}
            />
            <Text
              variant="titleLarge"
              style={{ marginTop: 16, marginBottom: 8, fontWeight: "600" }}
            >
              No collisions recorded
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
              Great news! You haven't recorded any collisions yet.
            </Text>
            <Text
              variant="bodySmall"
              style={{
                textAlign: "center",
                opacity: 0.6,
                fontStyle: "italic",
              }}
            >
              When you do, tap the + button below to document the incident
            </Text>
          </Card.Content>
        </Card>
      )}
    </>
  );
};
