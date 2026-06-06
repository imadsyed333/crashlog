import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Alert } from "react-native";
import { Button } from "react-native-paper";

const CollisionDraftButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { collision } = useCollisionFormStore();
  const { upsertCollision } = useCollisionStore();
  const saveForLater = () => {
    const draftCollision = {
      ...collision,
      savePoint: pathname,
    };

    upsertCollision(draftCollision);

    Alert.alert(
      "Saved",
      "Your progress has been saved. You can continue filling out the form later.",
    );
    router.replace("/");
  };
  return (
    <Button
      mode="contained"
      onPress={saveForLater}
      style={{
        marginTop: 10,
      }}
    >
      Save for Later
    </Button>
  );
};

export default CollisionDraftButton;
