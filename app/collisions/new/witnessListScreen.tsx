import WitnessList from "@/components/witnesses/WitnessList";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import { styles } from "@/themes";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const witnessListScreen = () => {
  const { resetForm } = useWitnessFormStore();
  const router = useRouter();
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
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => router.navigate("/collisions/new/submitScreen")}
      >
        Next
      </Button>
    </View>
  );
};

export default witnessListScreen;
