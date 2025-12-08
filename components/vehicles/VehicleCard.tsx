import { Vehicle } from "@/types";
import React from "react";
import { Card, Text } from "react-native-paper";

type VehicleCardProps = {
  vehicle: Vehicle;
};

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const { make, model, color, licensePlate } = vehicle;
  return (
    <Card
      style={{
        marginHorizontal: 10,
        marginTop: 10,
      }}
      mode="outlined"
    >
      <Card.Content>
        <Text variant="titleMedium">
          {color} {make} {model}
        </Text>
        <Text variant="bodyMedium">{licensePlate}</Text>
      </Card.Content>
    </Card>
  );
};

export default VehicleCard;
