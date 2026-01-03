import { Driver } from "@/lib/types";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import React from "react";
import { Button, Card, Text } from "react-native-paper";

type DriverCardProps = {
  driver: Driver;
};
const DriverCard = ({ driver }: DriverCardProps) => {
  const { name, driverLicense, phoneNumber, address } = driver;
  const { setDialogVisible } = useVehicleFormStore();
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
      <Card.Actions>
        <Button onPress={() => {
          setDialogVisible(true);
        }}>
          Edit
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default DriverCard;
