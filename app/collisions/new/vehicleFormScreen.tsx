import DriverDialog from "@/components/driver/DriverDialog";
import ErrorBox from "@/components/ErrorBox";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import { styles } from "@/themes";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import "react-native-get-random-values";
import { Button, Portal, TextInput } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import z from "zod";

const vehicleSchema = z.object({
  make: z.string().min(1, { error: "Make must not be empty" }),
  model: z.string().min(1, { error: "Model must not be empty" }),
  color: z.string().min(1, { error: "Color must not be empty" }),
  licensePlate: z.string().min(1, { error: "License plate must not be empty" }),
  insuranceCompany: z
    .string()
    .min(1, { error: "Insurance company must not be empty" }),
  policyNumber: z.string().min(1, "Policy number must not be empty"),
});

type VehicleFormErrors = {
  make?: String[];
  model?: String[];
  color?: String[];
  licensePlate?: String[];
  insuranceCompany?: String[];
  policyNumber?: String[];
};

const VehicleFormScreen = () => {
  const {
    make,
    model,
    color,
    licensePlate,
    insuranceCompany,
    policyNumber,
    updateVehicleField,
  } = useVehicleFormStore();

  const { addVehicle } = useCollisionFormStore();

  const [formErrors, setFormErrors] = useState<VehicleFormErrors>({});

  const [visible, setVisible] = useState(false);

  const showDriverDialog = () => setVisible(true);
  const hideDriverDialog = () => setVisible(false);

  const handleSubmit = () => {
    const parse = vehicleSchema.safeParse({
      make,
      model,
      color,
      licensePlate,
      insuranceCompany,
      policyNumber,
    });
    if (!parse.success) {
      const errors = z.flattenError(parse.error);
      setFormErrors(errors.fieldErrors);
    } else {
      addVehicle({
        make,
        model,
        color,
        licensePlate,
        insuranceCompany,
        policyNumber,
        driver: null,
        id: uuidv4(),
      });
      router.back();
    }
  };
  return (
    <View>
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
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => setVisible(true)}
      >
        Add Driver
      </Button>
      <Portal>
        <DriverDialog visible={visible} onDismiss={hideDriverDialog} />
      </Portal>
      <Button mode="contained" style={styles.button} onPress={handleSubmit}>
        Save Vehicle
      </Button>
    </View>
  );
};

export default VehicleFormScreen;
