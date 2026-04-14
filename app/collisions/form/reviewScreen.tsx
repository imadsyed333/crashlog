import CollisionInfoView from "@/components/collisions/CollisionInfoView";
import ScreenContainer from "@/components/misc/ScreenContainer";
import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-paper";

const reviewScreen = () => {
  const { collision, isEdit } = useCollisionFormStore();
  const { addCollision, updateCollision } = useCollisionStore();
  const router = useRouter();
  const handleSubmit = () => {
    if (isEdit) {
      updateCollision(collision);
    } else {
      addCollision(collision);
    }
    router.replace("/");
  };
  return (
    <ScreenContainer
      title={isEdit ? "Edit Collision" : "Submit Collision"}
      description={"Make sure all your information is correct!"}
      backButton
    >
      <ScrollView>
        <CollisionInfoView collision={collision} showActions />
      </ScrollView>
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        icon={isEdit ? "content-save" : "plus"}
      >
        {isEdit ? "Save Collision" : "Add Collision"}
      </Button>
    </ScreenContainer>
  );
};
export default reviewScreen;
