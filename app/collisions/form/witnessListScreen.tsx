import CustomFAB from "@/components/misc/CustomFAB";
import WitnessDialog from "@/components/witnesses/WitnessDialog";
import WitnessList from "@/components/witnesses/WitnessList";
import { styles } from "@/lib/themes";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const witnessListScreen = () => {
  const insets = useSafeAreaInsets();
  const { resetForm, setDialogVisible, setEdit } = useWitnessFormStore();
  const router = useRouter();

  const handleFABPress = () => {
    resetForm();
    setEdit(false);
    setDialogVisible(true);
  };

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WitnessList />
        <CustomFAB handlePress={handleFABPress} />
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => router.navigate("/collisions/form/submitScreen")}
      >
        Next
      </Button>
      <WitnessDialog />
    </View>
  );
};

export default witnessListScreen;
