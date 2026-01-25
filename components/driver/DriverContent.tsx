import { styles } from "@/lib/themes";
import { Driver } from "@/lib/types";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

type DriverContentProps = {
  driver: Driver;
};

const DriverContent = ({ driver }: DriverContentProps) => {
  const { name, license, phoneNumber, address } = driver;
  return (
    <View>
      <Text variant="bodyMedium">
        <Text style={styles.boldText}>Full Name: </Text>
        {name}
      </Text>
      <Text variant="bodyMedium">
        <Text style={styles.boldText}>Driver License: </Text>
        {license}
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

export default DriverContent;
