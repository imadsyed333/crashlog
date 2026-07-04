import { useCollisionStore } from "@/store/collisionStore";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";
import CustomAlertDialog from "../misc/CustomAlertDialog";
import { CollisionCard } from "./CollisionCard";

export const CollisionList = () => {
  const { collisions, deleteCollision } = useCollisionStore();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const theme = useTheme();

  return (
    <>
      {collisions.length > 0 && (
        <FlatList
          data={collisions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CollisionCard
              collision={item}
              onDelete={() => setPendingDeleteId(item.id)}
            />
          )}
          style={{ display: "flex", width: "100%" }}
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
      <CustomAlertDialog
        message="Are you sure you want to delete this collision?"
        isDialogVisible={pendingDeleteId !== null}
        onSuccess={() => {
          if (pendingDeleteId) deleteCollision(pendingDeleteId);
          setPendingDeleteId(null);
        }}
        onClose={() => setPendingDeleteId(null)}
      />
    </>
  );
};
