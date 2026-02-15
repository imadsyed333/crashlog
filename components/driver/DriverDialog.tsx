import { driverSchema } from "@/lib/schemas";
import { styles } from "@/lib/themes";
import { Driver } from "@/lib/types";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import React, { useState } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { Button, Text, TextInput } from "react-native-paper";
import z from "zod";
import CustomMaskedInput from "../misc/CustomMaskedInput";
import ErrorBox from "../misc/ErrorBox";

type DriverFormErrors = {
  name?: String[];
  address?: String[];
  phoneNumber?: String[];
  license?: String[];
};

const DriverDialog = () => {
  const { isDialogVisible, setDialogVisible, vehicle } = useVehicleFormStore();
  const [formErrors, setFormErrors] = useState<DriverFormErrors>({});

  const [driver, setDriver] = useState<Driver>(
    vehicle.driver || {
      name: "",
      phoneNumber: "",
      address: "",
      license: "",
    },
  );

  const { updateVehicleField } = useVehicleFormStore();

  const onClose = () => {
    setDialogVisible(false);
    setFormErrors({});
    setDriver(
      vehicle.driver || {
        name: "",
        phoneNumber: "",
        address: "",
        license: "",
      },
    );
  };

  const handleSubmit = () => {
    const parse = driverSchema.safeParse(driver);
    if (!parse.success) {
      const errors = z.flattenError(parse.error);
      setFormErrors(errors.fieldErrors);
    } else {
      updateVehicleField("driver", driver);
      onClose();
    }
  };

  return (
    <Modal
      isVisible={isDialogVisible}
      onBackdropPress={() => {
        onClose();
      }}
      avoidKeyboard={true}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            paddingTop: 10,
            backgroundColor: "white",
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text
            variant="titleLarge"
            style={{
              marginLeft: 10,
              paddingTop: 5,
            }}
          >
            Driver Information
          </Text>
          <TextInput
            label="Name"
            value={driver.name}
            onChangeText={(text) => setDriver({ ...driver, name: text })}
            error={!!formErrors.name}
            style={styles.input}
            mode="outlined"
          />
          <ErrorBox errors={formErrors.name} />

          <CustomMaskedInput
            label="Driver License"
            value={driver.license}
            onChangeText={(text) => setDriver({ ...driver, license: text })}
            error={!!formErrors.license}
            mask="A9999-99999-99999"
          />
          <ErrorBox errors={formErrors.license} />
          <CustomMaskedInput
            label="Phone Number"
            error={!!formErrors.phoneNumber}
            value={driver.phoneNumber}
            onChangeText={(text) => setDriver({ ...driver, phoneNumber: text })}
            mask="(999) 999-9999"
            keyboardType="phone-pad"
          />
          <ErrorBox errors={formErrors.phoneNumber} />
          <TextInput
            label="Address"
            value={driver.address}
            onChangeText={(text) => setDriver({ ...driver, address: text })}
            error={!!formErrors.address}
            style={styles.input}
            mode="outlined"
          />
          <ErrorBox errors={formErrors.address} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginVertical: 10,
            }}
          >
            <Button
              onPress={onClose}
              mode="outlined"
              style={{ marginRight: 5 }}
            >
              Cancel
            </Button>
            <Button onPress={handleSubmit} mode="contained">
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DriverDialog;
