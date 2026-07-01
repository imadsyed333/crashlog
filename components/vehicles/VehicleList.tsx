import { useCollisionFormStore } from "@/store/collisionFormStore";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";
import CustomAlertDialog from "../misc/CustomAlertDialog";
import VehicleCard from "./VehicleCard";

const VehicleList = () => {
  const { collision, deleteVehicle } = useCollisionFormStore();

  const { vehicles } = collision;
  const theme = useTheme();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  return (
    <>
      {vehicles.length > 0 && (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <VehicleCard
              vehicle={item}
              index={index}
              showActions
              onDelete={() => setPendingDeleteId(item.id)}
            />
          )}
          style={{ display: "flex", width: "100%" }}
        />
      )}
      {vehicles.length === 0 && (
        <Card mode="contained" style={{ marginBottom: 10 }}>
          <Card.Content style={{ alignItems: "center", padding: 24 }}>
            <Icon
              source="car-multiple"
              size={48}
              color={theme.colors.primary}
            />
            <Text
              variant="titleLarge"
              style={{ marginTop: 16, marginBottom: 8, fontWeight: "600" }}
            >
              No vehicles added
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                marginBottom: 8,
                textAlign: "center",
                opacity: 0.7,
                lineHeight: 20,
              }}
            >
              You haven't added any vehicles involved in this collision yet.
            </Text>
            <Text
              variant="bodySmall"
              style={{
                textAlign: "center",
                opacity: 0.6,
                fontStyle: "italic",
              }}
            >
              Tap the + button below to add vehicle information
            </Text>
          </Card.Content>
        </Card>
      )}
      <CustomAlertDialog
        message="Are you sure you want to delete this vehicle?"
        isDialogVisible={pendingDeleteId !== null}
        onSuccess={() => {
          if (pendingDeleteId) deleteVehicle(pendingDeleteId);
          setPendingDeleteId(null);
        }}
        onClose={() => setPendingDeleteId(null)}
      />
    </>
  );
};

export default VehicleList;
