import CollisionInfoView from "@/components/collisions/CollisionInfoView";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SearchParamType = {
  collisionId: string;
};

const viewCollisionScreen = () => {
  const insets = useSafeAreaInsets();

  const { collisionId } = useLocalSearchParams<SearchParamType>();
  const { getCollision } = useCollisionStore();
  const { setForm, setEdit } = useCollisionFormStore();
  let collision = getCollision(collisionId);

  const router = useRouter();

  const handlePress = () => {
    if (collision) {
      router.navigate("/collisions/form/collisionDetailsFormScreen");
      setForm(collision);
      setEdit(true);
    } else {
      router.back();
    }
  };
  return (
    <View
      style={{
        flex: 1,
        marginBottom: insets.bottom,
      }}
    >
      <Stack.Screen
        options={{
          title: collision ? "View Collision" : "Collision Not Found",
          headerRight: () => (
            <Button textColor="white" icon={"pencil"} onPress={handlePress}>
              Edit
            </Button>
          ),
        }}
      />
      {collision && <CollisionInfoView collision={collision} />}
    </View>
  );
};

export default viewCollisionScreen;
