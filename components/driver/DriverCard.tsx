import { Driver } from "@/lib/types";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import React from "react";
import { Button, Card, Text } from "react-native-paper";

type DriverCardProps = {
  driver: Driver;
  showActions?: boolean;
};
const DriverCard = ({ driver, showActions = false }: DriverCardProps) => {
  const { name, driverLicense, phoneNumber, address } = driver;
  const { setDialogVisible } = useVehicleFormStore();
  return (
    <Card
      style={{
        marginTop: 10,
      }}
      mode="outlined"
    >
      <Card.Content style={{ marginBottom: showActions ? 0 : 20 }}>
        <Text variant="titleMedium">Full Name: {name}</Text>
        <Text variant="bodyMedium">Driver License: {driverLicense}</Text>
        <Text variant="bodyMedium">Phone Number: {phoneNumber}</Text>
        <Text variant="bodyMedium">Address: {address}</Text>
      </Card.Content>
      {showActions && (
        <Card.Actions>
        <Button onPress={() => {
          setDialogVisible(true);
        }}>
          Edit
        </Button>
      </Card.Actions>
      )}
    </Card>
  );
};

export default DriverCard;
