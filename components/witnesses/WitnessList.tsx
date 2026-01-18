import { theme } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import WitnessCard from "./WitnessCard";

const WitnessList = () => {
  const { collision, deleteWitness } = useCollisionFormStore();
  const { witnesses } = collision;
  return (
    <>
      {witnesses.length > 0 && (
        <SwipeListView
          data={witnesses}
          renderItem={({ item, index }) => (
            <WitnessCard witness={item} index={index} />
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
                onPress={() => deleteWitness(item.id)}
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
      {witnesses.length === 0 && (
        <Text variant="titleLarge">Add a witness</Text>
      )}
    </>
  );
};

export default WitnessList;
