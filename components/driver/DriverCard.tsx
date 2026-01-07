import { styles } from "@/lib/themes";
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
        <Text variant="bodyMedium">
          <Text style={styles.boldText}>Full Name: </Text>
          {name}</Text>
        <Text variant="bodyMedium">
        <Text style={styles.boldText}>Driver License: </Text>
         {driverLicense}</Text>
        <Text variant="bodyMedium">
        <Text style={styles.boldText}>Phone Number: </Text>
          {phoneNumber}</Text>
        <Text variant="bodyMedium">
        <Text style={styles.boldText}>Address: </Text>
         {address}</Text>
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
