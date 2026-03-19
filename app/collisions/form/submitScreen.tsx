import CollisionInfoView from "@/components/collisions/CollisionInfoView";
import ScreenContainer from "@/components/misc/ScreenContainer";
import WitnessDialog from "@/components/witnesses/WitnessDialog";
import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-paper";

const submitScreen = () => {
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
      backButton
    >
      <ScrollView>
        <CollisionInfoView collision={collision} showActions />
      </ScrollView>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {isEdit ? "Update Collision" : "Add Collision"}
      </Button>
      <WitnessDialog />
    </ScreenContainer>
  );
};
export default submitScreen;
