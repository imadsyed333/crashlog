import CollisionInfoView from "@/components/collisions/CollisionInfoView";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { styles } from "@/themes";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

const submitScreen = () => {
  const { collision } = useCollisionFormStore();
  const { addCollision } = useCollisionStore();
  const router = useRouter();
  const handleSubmit = () => {
    addCollision(collision);
    router.replace("/");
  };
  return (
    <View>
      <Text variant="bodyLarge" style={styles.text}>Review your collision information</Text>
      <CollisionInfoView/>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Add collision
      </Button>
    </View>
  );
};
export default submitScreen;
