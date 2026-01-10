import CollisionInfoView from "@/components/collisions/CollisionInfoView";
import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const submitScreen = () => {
  const { collision, isEdit } = useCollisionFormStore();
  const { addCollision, updateCollision } = useCollisionStore();
  const insets = useSafeAreaInsets();
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
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        justifyContent: "space-between",
      }}
    >
      <ScrollView>
        <CollisionInfoView />
      </ScrollView>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {isEdit ? "Update Collision" : "Add Collision"}
      </Button>
    </View>
  );
};
export default submitScreen;
