import { styles } from "@/lib/themes";
import { Driver } from "@/lib/types";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import React, { useState } from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import CustomMaskedInput from "../misc/CustomMaskedInput";
import ErrorBox from "../misc/ErrorBox";

type DriverFormErrors = {
  name?: string[];
  address?: string[];
  phoneNumber?: string[];
  license?: string[];
};

const emptyDriver: Driver = {
  name: "",
  phoneNumber: "",
  address: "",
  license: "",
};

const DriverForm = () => {
  const { vehicle, updateVehicleField } = useVehicleFormStore();
  const [formErrors, setFormErrors] = useState<DriverFormErrors>({});
  const {
    vehicle: { driver },
  } = useVehicleFormStore();

  const setDriver = (driver: Driver) => {
    updateVehicleField("driver", driver);
  };

  return (
    <View>
      <Text
        variant="titleLarge"
        style={{
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
        mode="flat"
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
        mode="flat"
      />
      <ErrorBox errors={formErrors.address} />
    </View>
  );
};

export default DriverForm;
