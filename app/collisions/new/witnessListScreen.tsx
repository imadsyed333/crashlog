import WitnessList from "@/components/witnesses/WitnessList";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import { styles } from "@/themes";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const witnessListScreen = () => {
  const { resetForm } = useWitnessFormStore();
  return (
    <View style={{ flex: 1 }}>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          router.navigate("/collisions/new/witnessFormScreen");
          resetForm();
        }}
      >
        Add Witness
      </Button>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WitnessList />
      </View>
      <Button mode="contained" style={styles.button} onPress={() => {}}>
        Next
      </Button>
    </View>
  );
};

export default witnessListScreen;
