import { useCollisionFormStore } from "@/store/collisionFormStore";
import { Collision } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import { Card, Text } from "react-native-paper";

type CollisionCardProps = {
  collision: Collision;
};

export const CollisionCard = ({ collision }: CollisionCardProps) => {
  const { location, date } = collision;
  const { setForm } = useCollisionFormStore();
  const router = useRouter();
  const newDate = new Date(date);
  return (
    <Card
      style={{
        marginHorizontal: 10,
        marginTop: 10,
      }}
      mode="outlined"
      onPress={() => {
        setForm(collision);
        router.navigate("/collisions/new/collisionDetailsFormScreen");
      }}
    >
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
    </Card>
  );
};
