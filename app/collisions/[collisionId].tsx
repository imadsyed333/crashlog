import CollisionInfoView from "@/components/collisions/CollisionInfoView";
import ScreenContainer from "@/components/misc/ScreenContainer";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Button } from "react-native-paper";

type SearchParamType = {
  collisionId: string;
};

const viewCollisionScreen = () => {
  const { collisionId } = useLocalSearchParams<SearchParamType>();
  const { getCollision } = useCollisionStore();
  const { setForm, setEdit } = useCollisionFormStore();
  let collision = getCollision(collisionId);

  const router = useRouter();

  const handlePress = () => {
    if (collision) {
      router.navigate("/collisions/form/submitScreen");
      setForm(collision);
      setEdit(true);
    } else {
      router.back();
    }
  };
  return (
    <ScreenContainer
      title={collision ? "View Collision" : "Collision Not Found"}
    >
      {collision && <CollisionInfoView collision={collision} />}
      {collision && (
        <Button
          mode="contained"
          style={{ marginTop: 20 }}
          onPress={handlePress}
          icon={"pencil"}
        >
          Edit
        </Button>
      )}
    </ScreenContainer>
  );
};

export default viewCollisionScreen;
