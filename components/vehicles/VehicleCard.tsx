import { Vehicle } from "@/lib/types";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { router } from "expo-router";
import React from "react";
import { Button, Card, Text } from "react-native-paper";
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
        <Text variant="titleMedium">
          {color} {make} {model}
        </Text>
        <Text variant="bodyMedium">License Plate: {licensePlate}</Text>
        <Text variant="bodyMedium">Insurance company: {insuranceCompany}</Text>
        <Text variant="bodyMedium">Policy number: {policyNumber}</Text>
        {driver && <DriverCard driver={driver} />}
      </Card.Content>
        <Card.Actions>
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
