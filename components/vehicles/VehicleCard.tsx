import { styles } from "@/lib/themes";
import { Vehicle } from "@/lib/types";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Card, Divider, IconButton, Text } from "react-native-paper";
import DriverContent from "../driver/DriverContent";

type VehicleCardProps = {
  vehicle: Vehicle;
  index: number;
  showActions?: boolean;
};

const VehicleCard = ({
  vehicle,
  index,
  showActions = true,
}: VehicleCardProps) => {
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
  return (
    <Card
      style={{
        marginBottom: 10,
      }}
      mode="outlined"
    >
      <Card.Content style={{ paddingBottom: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text variant="titleLarge">Vehicle {index + 1}</Text>
          {showActions && (
            <IconButton
              icon={"pencil"}
              onPress={() => {
                setForm(vehicle);
                router.navigate("/collisions/form/vehicleFormScreen");
                setEdit(true);
              }}
            />
          )}
        </View>
        <Divider bold style={{ marginBottom: 10 }} />
        <Text variant="bodyLarge">
          <Text style={styles.boldText}>Car: </Text>
          {color} {make} {model}
        </Text>
        <Text variant="bodyLarge">
          <Text style={styles.boldText}>License Plate: </Text>
          {licensePlate}
        </Text>
        <Text variant="bodyLarge">
          <Text style={styles.boldText}>Insurance Company: </Text>
          {insuranceCompany}
        </Text>
        <Text variant="bodyLarge">
          <Text style={styles.boldText}>Policy Number: </Text>
          {policyNumber}
        </Text>

        <Text variant="titleMedium" style={{ marginTop: 10 }}>
          Driver
        </Text>
        <Divider bold style={{ marginBottom: 10 }} />
        {driver && (
          <>
            <DriverContent driver={driver} />
          </>
        )}
        {!driver && <Text variant="bodyLarge">No information</Text>}
      </Card.Content>
    </Card>
  );
};

export default VehicleCard;
