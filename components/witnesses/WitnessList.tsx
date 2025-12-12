import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";
import WitnessCard from "./WitnessCard";

const WitnessList = () => {
  const { witnesses } = useCollisionFormStore();
  return (
    <>
      {witnesses.length > 0 && (
        <FlatList
          data={witnesses}
          renderItem={({ item }) => <WitnessCard witness={item} />}
          style={{
            display: "flex",
            width: "100%",
          }}
        />
      )}
      {witnesses.length === 0 && (
        <Text variant="titleLarge">Add a witness</Text>
      )}
    </>
  );
};

export default WitnessList;
