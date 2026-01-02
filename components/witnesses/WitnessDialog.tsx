import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import { styles } from "@/themes";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { Button, Text, TextInput } from "react-native-paper";
import validator from "validator";
import z from "zod";
import ErrorBox from "../ErrorBox";

type WitnessDialogProps = {
  visible: boolean;
  onDismiss: () => void;
};

const witnessSchema = z.object({
  name: z.string().min(1, { error: "Name must not be empty" }),
  address: z.string().min(1, { error: "Address must not be empty" }),
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

const WitnessDialog = ({ visible, onDismiss }: WitnessDialogProps) => {
  const { witness, updateWitnessField } = useWitnessFormStore();
  const { name, address, phoneNumber } = witness;
  const [formErrors, setFormErrors] = useState<WitnessFormErrors>({});

  const { addWitness } = useCollisionFormStore();

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
      addWitness(witness);
      router.back();
    }
  };
  return (
    <Modal isVisible={visible} onBackdropPress={onDismiss} avoidKeyboard={true}>
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
          }}
        >
          <Text
            variant="titleLarge"
            style={{
              marginLeft: 10,
              paddingTop: 5,
            }}
          >
            Witness Information
          </Text>
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: 10,
              marginVertical: 10,
            }}
          >
            <Button
              onPress={onDismiss}
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

export default WitnessDialog;
