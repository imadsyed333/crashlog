import { useVehicleStore } from "@/store/vehicleStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import CustomAlertDialog from "../misc/CustomAlertDialog";
import VehicleCard from "./VehicleCard";

const UserVehicleView = () => {
  const { vehicle, deleteVehicle } = useVehicleStore();
  const router = useRouter();
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

  const handleDelete = () => {
    setIsDeleteDialogVisible(true);
  };

  const handleConfirmDelete = () => {
    deleteVehicle();
    setIsDeleteDialogVisible(false);
  };

  return (
    <View>
      {vehicle ? (
        <VehicleCard
          vehicle={vehicle}
          index={0}
          showActions
          editRoute="/prefillVehicleScreen"
          onDelete={handleDelete}
        />
      ) : (
        <Card mode="contained" style={{ marginBottom: 10 }}>
          <Card.Content style={{ alignItems: "center", padding: 20 }}>
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>
              No vehicle saved
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                marginBottom: 16,
                textAlign: "center",
                opacity: 0.7,
              }}
            >
              Save your vehicle information to quickly fill collision reports
            </Text>
            <Button
              mode="contained"
              onPress={() => router.navigate("/prefillVehicleScreen")}
            >
              Add My Vehicle
            </Button>
          </Card.Content>
        </Card>
      )}
      <CustomAlertDialog
        message="Are you sure you want to delete your saved vehicle information? This action cannot be undone."
        onSuccess={handleConfirmDelete}
        onClose={() => setIsDeleteDialogVisible(false)}
        isDialogVisible={isDeleteDialogVisible}
      />
    </View>
  );
};

export default UserVehicleView;
