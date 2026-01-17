import { Collision } from "@/lib/types";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { useRouter } from "expo-router";
import React from "react";
import { Button, Card, Text } from "react-native-paper";

type CollisionCardProps = {
  collision: Collision;
};

export const CollisionCard = ({ collision }: CollisionCardProps) => {
  const { location, date } = collision;
  const { setForm, setEdit } = useCollisionFormStore();
  const { deleteCollision } = useCollisionStore();
  const router = useRouter();
  const newDate = new Date(date);
  return (
    <Card
      style={{
        marginHorizontal: 10,
        marginTop: 10,
      }}
      mode="outlined"
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
      <Card.Actions>
        <Button
          onPress={() => {
            router.navigate(`/collisions/${collision.id}`);
            setEdit(false);
          }}
        >
          View
        </Button>
        <Button
          onPress={() => {
            setForm(collision);
            router.navigate("/collisions/form/collisionDetailsFormScreen");
            setEdit(true);
          }}
        >
          Edit
        </Button>
        <Button
          onPress={() => {
            deleteCollision(collision.id);
          }}
        >
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );
};
