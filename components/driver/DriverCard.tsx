import { styles } from "@/lib/themes";
import { Driver } from "@/lib/types";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import React from "react";
import { View } from "react-native";
import { Button, Card, Divider, IconButton, Text } from "react-native-paper";
import DriverContent from "./DriverContent";

type DriverCardProps = {
  driver: Driver | null;
  showActions?: boolean;
};
const DriverCard = ({ driver, showActions = false }: DriverCardProps) => {
  const { setDialogVisible } = useVehicleFormStore();
  return (
    <Card mode="outlined">
      <Card.Content>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text variant="titleLarge">Driver</Text>
          {showActions && (
            <IconButton
              icon={"pencil"}
              onPress={() => {
                setDialogVisible(true);
              }}
            />
          )}
        </View>
        <Divider bold style={{ marginBottom: 10 }} />
        {driver ? (
          <DriverContent driver={driver} />
        ) : (
          <>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => setDialogVisible(true)}
            >
              Add Driver
            </Button>
          </>
        )}
      </Card.Content>
    </Card>
  );
};

export default DriverCard;
