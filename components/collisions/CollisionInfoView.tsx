import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { View } from "react-native";
import { Card, List, Text } from "react-native-paper";
import VehicleCard from "../vehicles/VehicleCard";
import WitnessCard from "../witnesses/WitnessCard";

const CollisionInfoView = () => {
  const { collision } = useCollisionFormStore();
  const { vehicles, witnesses, location, description, date } = collision;

  const newDate = new Date(date);
  return (
    <View style={{ flex: 1 }}>
      <List.Accordion title="Details">
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
      </List.Accordion>
      <List.Accordion title="Vehicles">
        {vehicles.map((vehicle) => (
          <VehicleCard vehicle={vehicle} key={vehicle.id} showActions={false} />
        ))}
      </List.Accordion>
      <List.Accordion title="Witnesses">
        {witnesses.map((witness) => (
          <WitnessCard witness={witness} key={witness.id} showActions={false} />
        ))}
      </List.Accordion>
    </View>
  );
};

export default CollisionInfoView;
