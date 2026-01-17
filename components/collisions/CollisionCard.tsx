import { Collision } from "@/lib/types";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useRouter } from "expo-router";
import React from "react";
import { Button, Card, Text } from "react-native-paper";

type CollisionCardProps = {
  collision: Collision;
};

export const CollisionCard = ({ collision }: CollisionCardProps) => {
  const { location, date } = collision;
  const { setForm } = useCollisionFormStore();
  const router = useRouter();
  const newDate = new Date(date);
  return (
    <Card mode="outlined">
      <Card.Content>
        <Text variant="titleMedium">Collision at {location}</Text>
        <Text variant="bodyMedium">
          Occured on {newDate.toDateString()} at{" "}
          {newDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => {
            router.navigate(`/collisions/${collision.id}`);
            setForm(collision);
          }}
        >
          View
        </Button>
      </Card.Actions>
    </Card>
  );
};
