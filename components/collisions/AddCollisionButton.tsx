import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useRouter } from "expo-router";
import React from "react";
import { FAB } from "react-native-paper";

export const AddCollisionButton = () => {
  const { resetForm } = useCollisionFormStore();
  const router = useRouter();
  return (
    <FAB
      icon={"plus"}
      style={styles.fab}
      onPress={() => {
        resetForm();
        router.navigate("/collisions/form/collisionDetailsFormScreen");
      }}
      mode="flat"
    />
  );
};
