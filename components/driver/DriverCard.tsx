import { Driver } from "@/types";
import React from "react";
import { Card, Text } from "react-native-paper";

type DriverCardProps = {
  driver: Driver;
};
const DriverCard = ({ driver }: DriverCardProps) => {
  const { name, driverLicense, phoneNumber, address } = driver;
  return (
    <Card
      style={{
        marginHorizontal: 10,
        marginTop: 10,
      }}
      mode="outlined"
    >
      <Card.Content>
        <Text variant="titleMedium">{name}</Text>
        <Text variant="bodyMedium">{driverLicense}</Text>
        <Text variant="bodyMedium">{phoneNumber}</Text>
        <Text variant="bodyMedium">{address}</Text>
      </Card.Content>
    </Card>
  );
};

export default DriverCard;
