import React from "react";
import { View } from "react-native";
import { List, Text } from "react-native-paper";
import VehicleList from "../vehicles/VehicleList";
import WitnessList from "../witnesses/WitnessList";

const CollisionInfoView = () => {
  return (
    <View style={{ flex: 1 }}>
      <List.Accordion title="Details">
        <Text>Hello</Text>
      </List.Accordion>
      <List.Accordion title="Vehicle Information">
        <VehicleList />
      </List.Accordion>
      <List.Accordion title="Witness Information">
        <WitnessList />
      </List.Accordion>
    </View>
  );
};

export default CollisionInfoView;
