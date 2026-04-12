import CustomFAB from "@/components/misc/CustomFAB";
import NextButton from "@/components/misc/NextButton";
import ScreenContainer from "@/components/misc/ScreenContainer";
import WitnessDialog from "@/components/witnesses/WitnessDialog";
import WitnessList from "@/components/witnesses/WitnessList";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const WitnessListScreen = () => {
  const { resetForm, setDialogVisible, setEdit } = useWitnessFormStore();

  const { mode } = useLocalSearchParams<{ mode?: string }>();

  const handlePress = () => {
    resetForm();
    setEdit(false);
    setDialogVisible(true);
  };

  return (
    <ScreenContainer
      title="Witnesses"
      description="Add witnesses present at the collision."
      backButton
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WitnessList />
        <CustomFAB icon="plus" label="Add Witness" handlePress={handlePress} />
      </View>
      <NextButton
        href={"/collisions/form/reviewScreen"}
        mode={mode as "edit" | "create"}
      />
      <WitnessDialog />
    </ScreenContainer>
  );
};

export default WitnessListScreen;
