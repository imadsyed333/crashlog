import DriverCard from "@/components/driver/DriverCard";
import DriverDialog from "@/components/driver/DriverDialog";
import ErrorBox from "@/components/misc/ErrorBox";
import { styles } from "@/lib/themes";
import { validateVehicle } from "@/lib/validators";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type VehicleFormErrors = {
  make?: String[];
  model?: String[];
  color?: String[];
  licensePlate?: String[];
  insuranceCompany?: String[];
  policyNumber?: String[];
};

const VehicleFormScreen = () => {
  const insets = useSafeAreaInsets();

  const { vehicle, updateVehicleField, isEdit } = useVehicleFormStore();
  const { updateVehicle } = useCollisionFormStore();
  const {
    make,
    model,
    color,
    licensePlate,
    insuranceCompany,
    policyNumber,
    driver,
  } = vehicle;
  const [formErrors, setFormErrors] = useState<VehicleFormErrors>({});
  const { addVehicle } = useCollisionFormStore();

  const handleSubmit = () => {
    const parseErrors = validateVehicle(vehicle);
    if (Object.keys(parseErrors).length !== 0) {
      setFormErrors(parseErrors);
    } else {
      if (isEdit) {
        updateVehicle(vehicle);
      } else {
        addVehicle(vehicle);
      }
      router.back();
    }
  };
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        justifyContent: "space-between",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <TextInput
          error={!!formErrors.make}
          label={"Make (e.g., Toyota)"}
          value={make}
          onChangeText={(text) => {
            updateVehicleField("make", text);
            setFormErrors({
              ...formErrors,
              make: undefined,
            });
          }}
          style={styles.input}
          mode="outlined"
        />
        <ErrorBox errors={formErrors.make} />
        <TextInput
          error={!!formErrors.model}
          label={"Model (e.g., Camry)"}
          value={model}
          onChangeText={(text) => {
            updateVehicleField("model", text);
            setFormErrors({
              ...formErrors,
              model: undefined,
            });
          }}
          style={styles.input}
          mode="outlined"
        />
        <ErrorBox errors={formErrors.model} />
        <TextInput
          error={!!formErrors.color}
          label={"Color (e.g., Red)"}
          value={color}
          onChangeText={(text) => {
            updateVehicleField("color", text);
            setFormErrors({
              ...formErrors,
              color: undefined,
            });
          }}
          style={styles.input}
          mode="outlined"
        />
        <ErrorBox errors={formErrors.color} />
        <TextInput
          error={!!formErrors.licensePlate}
          label={"License Plate"}
          value={licensePlate}
          onChangeText={(text) => {
            updateVehicleField("licensePlate", text);
            setFormErrors({
              ...formErrors,
              licensePlate: undefined,
            });
          }}
          style={styles.input}
          mode="outlined"
        />
        <ErrorBox errors={formErrors.licensePlate} />
        <TextInput
          error={!!formErrors.insuranceCompany}
          label={"Insurance Company"}
          value={insuranceCompany}
          onChangeText={(text) => {
            updateVehicleField("insuranceCompany", text);
            setFormErrors({
              ...formErrors,
              insuranceCompany: undefined,
            });
          }}
          style={styles.input}
          mode="outlined"
        />
        <ErrorBox errors={formErrors.insuranceCompany} />
        <TextInput
          error={!!formErrors.policyNumber}
          label={"Policy Number"}
          value={policyNumber}
          onChangeText={(text) => {
            updateVehicleField("policyNumber", text);
            setFormErrors({
              ...formErrors,
              policyNumber: undefined,
            });
          }}
          style={styles.input}
          mode="outlined"
        />
        <ErrorBox errors={formErrors.policyNumber} />
        <View
          style={{
            marginTop: 10,
          }}
        >
          <DriverCard driver={driver} showActions />
        </View>
        <DriverDialog />
      </View>
      <Button mode="contained" style={styles.button} onPress={handleSubmit}>
        Save Vehicle
      </Button>
    </View>
  );
};

export default VehicleFormScreen;
