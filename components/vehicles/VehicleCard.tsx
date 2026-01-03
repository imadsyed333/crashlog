import { Vehicle } from "@/lib/types";
import React from "react";
import { Card, Text } from "react-native-paper";
import DriverCard from "../driver/DriverCard";

type VehicleCardProps = {
  vehicle: Vehicle;
};

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const {
    make,
    model,
    color,
    licensePlate,
    insuranceCompany,
    policyNumber,
    driver,
  } = vehicle;
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
        <Text variant="bodyMedium">License Plate: {licensePlate}</Text>
        <Text variant="bodyMedium">Insurance company: {insuranceCompany}</Text>
        <Text variant="bodyMedium">Policy number: {policyNumber}</Text>
        {driver && <DriverCard driver={driver} />}
      </Card.Content>
    </Card>
  );
};

export default VehicleCard;
