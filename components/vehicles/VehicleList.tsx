import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { View } from "react-native";
import { Card, Icon, IconButton, Text, useTheme } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import VehicleCard from "./VehicleCard";

const VehicleList = () => {
  const { collision, deleteVehicle } = useCollisionFormStore();

  const { vehicles } = collision;
  const theme = useTheme();

  return (
    <>
      {vehicles.length > 0 && (
        <SwipeListView
          data={vehicles}
          renderItem={({ item, index }) => (
            <VehicleCard vehicle={item} index={index} showActions />
          )}
          renderHiddenItem={({ item }) => (
            <View
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <IconButton
                icon={"delete"}
                onPress={() => deleteVehicle(item.id)}
                mode="contained"
                size={30}
                iconColor={theme.colors.error}
              />
            </View>
          )}
          style={{
            display: "flex",
            width: "100%",
            padding: 10,
          }}
          rightOpenValue={-75}
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
    </>
  );
};

export default VehicleList;
