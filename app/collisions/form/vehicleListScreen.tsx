import CustomFAB from "@/components/misc/CustomFAB";
import VehicleList from "@/components/vehicles/VehicleList";
import { styles } from "@/lib/themes";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const VehicleListScreen = () => {
  const insets = useSafeAreaInsets();
  const { resetForm, setEdit } = useVehicleFormStore();
  const router = useRouter();

  const handleFABPress = () => {
    resetForm();
    setEdit(false);
    router.navigate("/collisions/form/vehicleFormScreen");
  };
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VehicleList />
        <CustomFAB handlePress={handleFABPress} />
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          router.navigate("/collisions/form/witnessListScreen");
        }}
      >
        Next
      </Button>
    </View>
  );
};

export default VehicleListScreen;
