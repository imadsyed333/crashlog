import { styles } from "@/lib/themes";
import { useVehicleFormStore } from "@/store/vehicleFormStore";
import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { Button, Text, TextInput } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import z from "zod";
import ErrorBox from "../ErrorBox";

const driverSchema = z.object({
  name: z.string().min(1, { error: "Name must not be empty" }),
  address: z.string().min(1, { error: "Address must not be empty" }),
  phoneNumber: z.string().min(1, { error: "Phone number must not be empty" }),
  driverLicense: z
    .string()
    .min(1, { error: "Driver license must not be empty" }),
});

type DriverFormErrors = {
  name?: String[];
  address?: String[];
  phoneNumber?: String[];
  driverLicense?: String[];
};

const DriverDialog = () => {
  const { isDialogVisible, setDialogVisible, vehicle } = useVehicleFormStore();
  const [formErrors, setFormErrors] = React.useState<DriverFormErrors>({});
  const [driver, setDriver] = React.useState({
    name: vehicle.driver?.name || "",
    address: vehicle.driver?.address || "",
    phoneNumber: vehicle.driver?.phoneNumber || "",
    driverLicense: vehicle.driver?.driverLicense || "",
  });

  const { updateVehicleField } = useVehicleFormStore();
  const handleSubmit = () => {
    const parse = driverSchema.safeParse({
      ...driver,
    });
    if (!parse.success) {
      const errors = z.flattenError(parse.error);
      setFormErrors(errors.fieldErrors);
    } else {
      updateVehicleField("driver", { id: uuidv4(), ...driver });
      setDialogVisible(false);
    }
  };
  return (
    <Modal isVisible={isDialogVisible} onBackdropPress={() => setDialogVisible(false)} avoidKeyboard={true}>
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
          <TextInput
            label="Address"
            value={driver.address}
            onChangeText={(text) => setDriver({ ...driver, address: text })}
            error={!!formErrors.address}
            style={styles.input}
            mode="outlined"
          />
          <ErrorBox errors={formErrors.address} />
          <TextInput
            label="Phone Number"
            value={driver.phoneNumber}
            onChangeText={(text) => setDriver({ ...driver, phoneNumber: text })}
            error={!!formErrors.phoneNumber}
            style={styles.input}
            mode="outlined"
          />
          <ErrorBox errors={formErrors.phoneNumber} />
          <TextInput
            label="Driver License"
            value={driver.driverLicense}
            onChangeText={(text) =>
              setDriver({ ...driver, driverLicense: text })
            }
            error={!!formErrors.driverLicense}
            style={styles.input}
            mode="outlined"
          />
          <ErrorBox errors={formErrors.driverLicense} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginVertical: 10,
            }}
          >
            <Button
              onPress={() => setDialogVisible(false)}
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
