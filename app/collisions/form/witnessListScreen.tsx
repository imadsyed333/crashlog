import CustomFAB from "@/components/misc/CustomFAB";
import NextButton from "@/components/misc/NextButton";
import WitnessDialog from "@/components/witnesses/WitnessDialog";
import WitnessList from "@/components/witnesses/WitnessList";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const witnessListScreen = () => {
  const insets = useSafeAreaInsets();
  const { resetForm, setDialogVisible, setEdit } = useWitnessFormStore();

  const handleFABPress = () => {
    resetForm();
    setEdit(false);
    setDialogVisible(true);
  };

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Stack.Screen
        options={{
          title: "Witnesses",
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WitnessList />
        <CustomFAB
          handlePress={handleFABPress}
          icon="plus"
          label="Add Witness"
        />
      </View>
      <NextButton href={"/collisions/form/submitScreen"} />
      <WitnessDialog />
    </View>
  );
};

export default witnessListScreen;
