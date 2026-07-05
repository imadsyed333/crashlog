import { styles } from "@/lib/themes";
import { DraftVehicle, Vehicle } from "@/lib/types";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Card, Divider, IconButton, Text, useTheme } from "react-native-paper";
import DriverContent from "../driver/DriverContent";

type VehicleCardProps = {
  vehicle: Vehicle | DraftVehicle;
  index: number;
  showActions?: boolean;
  editRoute?: string;
  onDelete?: () => void;
};

const isDraftVehicle = (
  vehicle: Vehicle | DraftVehicle,
): vehicle is DraftVehicle => {
  return "savePoint" in vehicle;
};

const VehicleCard = ({
  vehicle,
  index,
  showActions = false,
  editRoute,
  onDelete,
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
      <Card.Content style={{ paddingBottom: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 6,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text variant="titleLarge" style={{ fontWeight: 600 }}>
              Vehicle {index + 1}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            {isDraftVehicle(vehicle) && (
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  backgroundColor: (theme.colors as any).warningContainer,
                  borderRadius: 8,
                }}
              >
                <Text
                  variant="labelSmall"
                  style={{
                    color: (theme.colors as any).onWarningContainer,
                    fontWeight: 600,
                  }}
                >
                  Draft
                </Text>
              </View>
            )}
            {showActions && (
              <>
                <IconButton
                  icon={"pencil"}
                  onPress={() => {
                    setForm(vehicle);
                    router.navigate(
                      (editRoute ||
                        "/collisions/form/vehicleFormScreen") as any,
                    );
                    setEdit(true);
                  }}
                  style={{ margin: 0 }}
                />
                {onDelete && (
                  <IconButton
                    icon={"delete"}
                    iconColor={theme.colors.error}
                    onPress={onDelete}
                    style={{ margin: 0 }}
                  />
                )}
              </>
            )}
          </View>
        </View>
        <Divider bold style={{ marginTop: 8, marginBottom: 8 }} />
        <View>
          <Text variant="bodyMedium" style={{ marginBottom: 4 }}>
            <Text style={styles.boldText}>Make: </Text>
            {make}
          </Text>
          <Text variant="bodyMedium" style={{ marginBottom: 4 }}>
            <Text style={styles.boldText}>Model: </Text>
            {model}
          </Text>
          <Text variant="bodyMedium" style={{ marginBottom: 4 }}>
            <Text style={styles.boldText}>Color: </Text>
            {color}
          </Text>
          <Text variant="bodyMedium" style={{ marginBottom: 4 }}>
            <Text style={styles.boldText}>License Plate: </Text>
            {licensePlate}
          </Text>
          <Text variant="bodyMedium" style={{ marginBottom: 4 }}>
            <Text style={styles.boldText}>Insurance Company: </Text>
            {insuranceCompany}
          </Text>
          <Text variant="bodyMedium">
            <Text style={styles.boldText}>Policy Number: </Text>
            {policyNumber}
          </Text>
        </View>

        <Text variant="titleMedium" style={{ marginTop: 10, fontWeight: 600 }}>
          Driver
        </Text>
        <Divider bold style={{ marginBottom: 6 }} />
        {driver && (
          <>
            <DriverContent driver={driver} />
          </>
        )}
        {!driver && (
          <Text
            variant="bodyMedium"
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
