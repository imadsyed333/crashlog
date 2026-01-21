import { personSchema } from "@/lib/schemas";
import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import React, { useState } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { Button, Text, TextInput } from "react-native-paper";
import z from "zod";
import ErrorBox from "../misc/ErrorBox";

type WitnessFormErrors = {
  name?: String[];
  address?: String[];
  phoneNumber?: String[];
};

const WitnessDialog = () => {
  const {
    witness,
    updateWitnessField,
    isEdit,
    isDialogVisible,
    setDialogVisible,
  } = useWitnessFormStore();
  const { name, address, phoneNumber } = witness;
  const [formErrors, setFormErrors] = useState<WitnessFormErrors>({});

  const { addWitness, updateWitness } = useCollisionFormStore();

  const handleSubmit = () => {
    const parse = personSchema.safeParse({
      name,
      address,
      phoneNumber,
    });
    if (!parse.success) {
      const errors = z.flattenError(parse.error);
      setFormErrors(errors.fieldErrors);
    } else {
      if (isEdit) {
        updateWitness(witness);
      } else {
        addWitness(witness);
      }
      setDialogVisible(false);
    }
  };
  return (
    <Modal
      isVisible={isDialogVisible}
      onBackdropPress={() => setDialogVisible(false)}
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
          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            <TextInput
              label="Full Name"
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
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: 10,
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

export default WitnessDialog;
