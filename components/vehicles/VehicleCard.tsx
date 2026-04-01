import { styles } from "@/lib/themes";
import { Vehicle } from "@/lib/types";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Card, Divider, IconButton, Text, useTheme } from "react-native-paper";
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
  const theme = useTheme();
  return (
    <Card
      style={{
        marginBottom: 10,
      }}
      mode="contained"
    >
      <Card.Content style={{ paddingBottom: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text variant="titleLarge" style={{ fontWeight: 600 }}>
              Vehicle {index + 1}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
            >
              {color} {make} {model}
            </Text>
          </View>
          {showActions && (
            <IconButton
              icon={"pencil"}
              onPress={() => {
                setForm(vehicle);
                router.navigate("/collisions/form/vehicleFormScreen");
                setEdit(true);
              }}
              style={{ margin: 0 }}
            />
          )}
        </View>
        <Divider bold style={{ marginTop: 10, marginBottom: 10 }} />
        <View
          style={{
            paddingVertical: 2,
          }}
        >
          <Text variant="bodyLarge" style={{ marginBottom: 6 }}>
            <Text style={styles.boldText}>License Plate: </Text>
            {licensePlate}
          </Text>
          <Text variant="bodyLarge" style={{ marginBottom: 6 }}>
            <Text style={styles.boldText}>Insurance Company: </Text>
            {insuranceCompany}
          </Text>
          <Text variant="bodyLarge">
            <Text style={styles.boldText}>Policy Number: </Text>
            {policyNumber}
          </Text>
        </View>

        <Text variant="titleMedium" style={{ marginTop: 12, fontWeight: 600 }}>
          Driver
        </Text>
        <Divider bold style={{ marginBottom: 8 }} />
        {driver && (
          <>
            <DriverContent driver={driver} />
          </>
        )}
        {!driver && (
          <Text
            variant="bodyLarge"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            No information
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

export default VehicleCard;
