import { Collision } from "@/types";
import React from "react";
import { Card, Text } from "react-native-paper";

type CollisionCardProps = {
  collision: Collision;
};

export const CollisionCard = ({ collision }: CollisionCardProps) => {
  const { id, location } = collision;
  return (
    <Card>
      <Card.Content>
        <Text variant="titleMedium">Collision {id}</Text>
        <Text variant="bodyMedium">At {location}</Text>
      </Card.Content>
    </Card>
  );
};
