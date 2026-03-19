import CustomFAB from "@/components/misc/CustomFAB";
import NextButton from "@/components/misc/NextButton";
import ScreenContainer from "@/components/misc/ScreenContainer";
import WitnessDialog from "@/components/witnesses/WitnessDialog";
import WitnessList from "@/components/witnesses/WitnessList";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import React from "react";
import { View } from "react-native";

const witnessListScreen = () => {
  const { resetForm, setDialogVisible, setEdit } = useWitnessFormStore();

  const handlePress = () => {
    resetForm();
    setEdit(false);
    setDialogVisible(true);
  };

  return (
    <ScreenContainer title="Witnesses" backButton>
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
      <NextButton href={"/collisions/form/submitScreen"} />
      <WitnessDialog />
    </ScreenContainer>
  );
};

export default witnessListScreen;
