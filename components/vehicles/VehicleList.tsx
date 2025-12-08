import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";
import VehicleCard from "./VehicleCard";

const VehicleList = () => {
  const { vehicles } = useCollisionFormStore();
  return (
    <>
      {vehicles.length > 0 && (
        <FlatList
          data={vehicles}
          renderItem={({ item }) => <VehicleCard vehicle={item} />}
          style={{
            display: "flex",
            width: "100%",
          }}
        />
      )}
      {vehicles.length === 0 && <Text variant="titleLarge">Add a vehicle</Text>}
    </>
  );
};

export default VehicleList;
