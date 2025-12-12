import ErrorBox from "@/components/ErrorBox";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import { styles } from "@/themes";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import "react-native-get-random-values";
import { Button, TextInput } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import z from "zod";

const witnessSchema = z.object({
  name: z.string().min(1, { error: "Name must not be empty" }),
  address: z.string(),
  phoneNumber: z
    .string()
    .min(1, { error: "Phone number must not be empty" })
    .refine(validator.isMobilePhone, { error: "Not a valid phone number" }),
});

type WitnessFormErrors = {
  name?: String[];
  address?: String[];
  phoneNumber?: String[];
};

const witnessFormScreen = () => {
  const { name, address, phoneNumber, updateWitnessField } =
    useWitnessFormStore();
  const { addWitness } = useCollisionFormStore();
  const [formErrors, setFormErrors] = useState<WitnessFormErrors>({});

  const handleSubmit = () => {
    const parse = witnessSchema.safeParse({
      name,
      address,
      phoneNumber,
    });
    if (!parse.success) {
      const errors = z.flattenError(parse.error);
      setFormErrors(errors.fieldErrors);
    } else {
      addWitness({
        id: uuidv4(),
        name,
        address,
        phoneNumber,
      });
      router.back();
    }
  };
  return (
    <View>
      <TextInput
        label="Name"
        value={name}
        style={styles.input}
        onChangeText={(text) => {
          updateWitnessField("name", text);
          setFormErrors({
            ...formErrors,
            name: undefined,
          });
        }}
        mode="outlined"
        error={!!formErrors.name}
      />
      <ErrorBox errors={formErrors.name} />
      <TextInput
        label="Address"
        value={address}
        style={styles.input}
        onChangeText={(text) => {
          updateWitnessField("address", text);
          setFormErrors({
            ...formErrors,
            address: undefined,
          });
        }}
        mode="outlined"
        error={!!formErrors.address}
      />
      <ErrorBox errors={formErrors.address} />
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        style={styles.input}
        onChangeText={(text) => {
          updateWitnessField("phoneNumber", text);
          setFormErrors({
            ...formErrors,
            phoneNumber: undefined,
          });
        }}
        mode="outlined"
        error={!!formErrors.phoneNumber}
      />
      <ErrorBox errors={formErrors.phoneNumber} />
      <Button mode="contained" style={styles.button} onPress={handleSubmit}>
        Save Witness
      </Button>
    </View>
  );
};

export default witnessFormScreen;
