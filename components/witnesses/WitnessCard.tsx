import { Person } from "@/lib/types";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import React from "react";
import { Button, Card, Text } from "react-native-paper";

type WitnessCardProps = {
  witness: Person;
};
const WitnessCard = ({ witness }: WitnessCardProps) => {
  const { name, phoneNumber, address } = witness;
  const { setForm, setEdit, setDialogVisible } = useWitnessFormStore();
  const { deleteWitness } = useCollisionFormStore();
  return (
    <Card style={{ marginHorizontal: 10, marginTop: 10 }} mode="outlined">
      <Card.Content>
        <Text variant="titleMedium">{name}</Text>
        <Text variant="bodyMedium" dataDetectorType={"phoneNumber"}>
          Phone Number: {phoneNumber}
        </Text>
        <Text variant="bodyMedium">Address: {address}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => {
          setForm(witness);
          setDialogVisible(true);
          setEdit(true);
        }}>
          Edit
        </Button>
        <Button onPress={() => {
          deleteWitness(witness.id);
        }}>
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default WitnessCard;
