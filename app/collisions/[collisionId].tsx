import CollisionInfoView from "@/components/collisions/CollisionInfoView";
import { useCollisionStore } from "@/store/collisionStore";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SearchParamType = {
  collisionId: string;
};

const viewCollisionScreen = () => {
  const insets = useSafeAreaInsets();

  const { collisionId } = useLocalSearchParams<SearchParamType>();
  const { getCollision } = useCollisionStore();
  let collision = getCollision(collisionId);
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
      }}
    >
      {collision && <CollisionInfoView collision={collision} />}
    </View>
  );
};

export default viewCollisionScreen;
