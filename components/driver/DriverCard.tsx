import { styles } from "@/lib/themes";
import { Driver } from "@/lib/types";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

type DriverCardProps = {
  driver: Driver;
  showActions?: boolean;
};
const DriverCard = ({ driver, showActions = false }: DriverCardProps) => {
  const { name, driverLicense, phoneNumber, address } = driver;
  const { setDialogVisible } = useVehicleFormStore();
  return (
    <View>
      <Text variant="bodyMedium">
        <Text style={styles.boldText}>Full Name: </Text>
        {name}
      </Text>
      <Text variant="bodyMedium">
        <Text style={styles.boldText}>Driver License: </Text>
        {driverLicense}
      </Text>
      <Text variant="bodyMedium">
        <Text style={styles.boldText}>Phone Number: </Text>
        {phoneNumber}
      </Text>
      <Text variant="bodyMedium">
        <Text style={styles.boldText}>Address: </Text>
        {address}
      </Text>
    </View>
  );
};

export default DriverCard;
