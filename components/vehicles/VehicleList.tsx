import { theme } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import VehicleCard from "./VehicleCard";

const VehicleList = () => {
  const { collision, deleteVehicle } = useCollisionFormStore();
  const { vehicles } = collision;
  return (
    <>
      {vehicles.length > 0 && (
        <SwipeListView
          data={vehicles}
          renderItem={({ item, index }) => (
            <VehicleCard vehicle={item} index={index} />
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
      {vehicles.length === 0 && <Text variant="titleLarge">Add a vehicle</Text>}
    </>
  );
};

export default VehicleList;
