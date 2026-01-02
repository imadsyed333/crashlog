import WitnessDialog from "@/components/witnesses/WitnessDialog";
import WitnessList from "@/components/witnesses/WitnessList";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import { styles } from "@/themes";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const witnessListScreen = () => {
  const insets = useSafeAreaInsets();
  const { resetForm } = useWitnessFormStore();
  const router = useRouter();

  const [visible, setVisible] = useState(false);

  const onDismiss = () => {
    setVisible(false);
  };

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          // router.navigate("/collisions/form/witnessFormScreen");
          setVisible(true);
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
        onPress={() => router.navigate("/collisions/form/submitScreen")}
      >
        Next
      </Button>
      <WitnessDialog visible={visible} onDismiss={onDismiss} />
    </View>
  );
};

export default witnessListScreen;
