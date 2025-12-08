import { useVehicleFormStore } from "@/store/vehicleFormStore";
import React from "react";
import { Button, Dialog, TextInput } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import z from "zod";
import ErrorBox from "../ErrorBox";

type DriverDialogProps = {
  visible: boolean;
  onDismiss: () => void;
};

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

const DriverDialog = ({ visible, onDismiss }: DriverDialogProps) => {
  const [formErrors, setFormErrors] = React.useState<DriverFormErrors>({});
  const [driver, setDriver] = React.useState({
    name: "",
    address: "",
    phoneNumber: "",
    driverLicense: "",
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
      onDismiss();
    }
  };
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Driver Information</Dialog.Title>
      <Dialog.Content>
        <TextInput
          label="Name"
          value={driver.name}
          onChangeText={(text) => setDriver({ ...driver, name: text })}
          error={!!formErrors.name}
        />
        <ErrorBox errors={formErrors.name} />
        <TextInput
          label="Address"
          value={driver.address}
          onChangeText={(text) => setDriver({ ...driver, address: text })}
          error={!!formErrors.address}
        />
        <ErrorBox errors={formErrors.address} />
        <TextInput
          label="Phone Number"
          value={driver.phoneNumber}
          onChangeText={(text) => setDriver({ ...driver, phoneNumber: text })}
          error={!!formErrors.phoneNumber}
        />
        <ErrorBox errors={formErrors.phoneNumber} />
        <TextInput
          label="Driver License"
          value={driver.driverLicense}
          onChangeText={(text) => setDriver({ ...driver, driverLicense: text })}
          error={!!formErrors.driverLicense}
        />
        <ErrorBox errors={formErrors.driverLicense} />
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleSubmit}>Save</Button>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  );
};

export default DriverDialog;
