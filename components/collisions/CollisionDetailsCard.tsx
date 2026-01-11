import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { Card, Text } from "react-native-paper";

const CollisionDetailsCard = () => {
  const { collision } = useCollisionFormStore();
  const { location, description, date } = collision;

  const newDate = new Date(date);
  return (
    <Card
      mode="outlined"
      style={{
        margin: 10,
      }}
    >
      <Card.Content>
        <Text variant="bodyLarge">
          <Text style={styles.boldText}>Location: </Text>
          {location}
        </Text>
        <Text variant="bodyLarge">
          <Text style={styles.boldText}>Description: </Text>
          {description}
        </Text>
        <Text variant="bodyLarge">
          <Text style={styles.boldText}>Datetime: </Text>
          {newDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          on {newDate.toDateString()}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default CollisionDetailsCard;
