import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

export const AddCollisionButton = () => {
  const router = useRouter();
  return (
    <FAB
      icon={"plus"}
      style={styles.fab}
      onPress={() => router.navigate("/collisions/new")}
      mode="flat"
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 100,
  },
});
