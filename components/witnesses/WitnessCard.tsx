import { styles } from "@/lib/themes";
import { Person } from "@/lib/types";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import React from "react";
import { Button, Card, Divider, Text } from "react-native-paper";

type WitnessCardProps = {
  witness: Person;
  index: number;
  showActions?: boolean;
};
const WitnessCard = ({
  witness,
  index,
  showActions = true,
}: WitnessCardProps) => {
  const { name, phoneNumber, address } = witness;
  const { setForm, setEdit, setDialogVisible } = useWitnessFormStore();
  const { deleteWitness } = useCollisionFormStore();
  return (
    <Card style={{ marginHorizontal: 10, marginTop: 10 }} mode="outlined">
      <Card.Content style={{ paddingBottom: 20 }}>
        <Text variant="titleLarge">Witness {index + 1}</Text>
        <Divider bold style={{ marginVertical: 10 }} />
        <Text variant="bodyLarge">
          <Text style={styles.boldText}>Full Name: </Text>
          {name}
        </Text>
        <Text variant="bodyLarge" dataDetectorType={"phoneNumber"}>
          <Text style={styles.boldText}>Phone Number: </Text>
          {phoneNumber}
        </Text>
        <Text variant="bodyLarge">
          <Text style={styles.boldText}>Address: </Text>
          {address}
        </Text>
      </Card.Content>
      {showActions && (
        <Card.Actions>
          <Button
            onPress={() => {
              setForm(witness);
              setDialogVisible(true);
              setEdit(true);
            }}
          >
            Edit
          </Button>
          <Button
            onPress={() => {
              deleteWitness(witness.id);
            }}
          >
            Delete
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
};

export default WitnessCard;
