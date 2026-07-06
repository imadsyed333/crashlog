import CollisionInfoView from "@/components/collisions/CollisionInfoView";
import CustomAlertDialog from "@/components/misc/CustomAlertDialog";
import ScreenContainer from "@/components/misc/ScreenContainer";
import { styles } from "@/lib/themes";
import { Collision } from "@/lib/types";
import { containsDraftVehicles } from "@/lib/validators";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-paper";

const reviewScreen = () => {
  const { collision, isEdit } = useCollisionFormStore();
  const { upsertCollision } = useCollisionStore();
  const [isAlertVisible, setAlertVisible] = useState(false);
  const router = useRouter();
  const handleSubmit = () => {
    if (containsDraftVehicles(collision)) {
      setAlertVisible(true);
      return;
    }
    const { savePoint, ...cleanCollision } = collision as any;
    upsertCollision(cleanCollision as Collision);
    router.replace("/");
  };

  const goToVehicles = () => {
    router.dismissTo("/collisions/form/vehicleListScreen");
    setAlertVisible(false);
  };
  return (
    <ScreenContainer
      title={isEdit ? "Edit Collision" : "Submit Collision"}
      description={"Make sure all your information is correct!"}
      backButton
      backHref={!isEdit ? "/collisions/form/witnessListScreen" : undefined}
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
      <CustomAlertDialog
        title="Draft Vehicles Found"
        message="You have unsaved vehicles in your collision. Please save them before submitting."
        isInfo
        isDialogVisible={isAlertVisible}
        onSuccess={goToVehicles}
      />
    </ScreenContainer>
  );
};
export default reviewScreen;
