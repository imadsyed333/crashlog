import { styles } from "@/lib/themes";
import { Vehicle } from "@/lib/types";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { router } from "expo-router";
import React from "react";
import { Button, Card, Divider, Text } from "react-native-paper";
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
  const { setForm, setEdit } = useVehicleFormStore();
  const { deleteVehicle } = useCollisionFormStore();
  return (
    <Card
      style={{
        marginHorizontal: 10,
        marginTop: 10,
      }}
      mode="outlined"
    >
      <Card.Content>
        <Text variant="titleLarge">
          Vehicle Details
        </Text>
        <Divider bold style={{marginVertical: 10}}/>
        <Text variant="bodyLarge">
          <Text style={styles.boldText}>Car: </Text>
          {color} {make} {model}
        </Text>
        <Text variant="bodyLarge">
          <Text style={styles.boldText}>License Plate: </Text>
           {licensePlate}</Text>
        <Text variant="bodyLarge">
          <Text style={styles.boldText}>Insurance Company: </Text>
        {insuranceCompany}</Text>
        <Text variant="bodyLarge">
          <Text style={styles.boldText}>Policy Number: </Text>
          {policyNumber}</Text>

        {driver && (
          <>
          <Text variant="titleLarge" style={{marginTop: 10}}>Driver Details</Text>
          <Divider bold style={{ marginVertical: 10}}/>
          <DriverCard driver={driver}/>
          </>
        )}
      </Card.Content>
        <Card.Actions style={{ marginHorizontal: 10 }}>
          <Button onPress={() => {
            setForm(vehicle);
            router.navigate("/collisions/form/vehicleFormScreen");
            setEdit(true);
          }}>
            Edit
          </Button>
          <Button onPress={() => {
            deleteVehicle(vehicle.id);
          }}>
            Delete
          </Button>
        </Card.Actions>
    </Card>
  );
};

export default VehicleCard;
