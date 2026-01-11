import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { View } from "react-native";
import { List, Text } from "react-native-paper";
import VehicleCard from "../vehicles/VehicleCard";
import WitnessCard from "../witnesses/WitnessCard";

const CollisionInfoView = () => {
  const { collision } = useCollisionFormStore();
  const { vehicles, witnesses } = collision;
  return (
    <View style={{ flex: 1 }}>
      <List.Accordion title="Details">
        <Text>Hello</Text>
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
