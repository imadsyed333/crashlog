import { Person } from "@/lib/types";
import React from "react";
import { Card, Text } from "react-native-paper";

type WitnessCardProps = {
  witness: Person;
};
const WitnessCard = ({ witness }: WitnessCardProps) => {
  const { name, phoneNumber } = witness;
  return (
    <Card style={{ marginHorizontal: 10, marginTop: 10 }} mode="outlined">
      <Card.Content>
        <Text variant="titleMedium">{name}</Text>
        <Text variant="bodyMedium" dataDetectorType={"phoneNumber"}>
          {phoneNumber}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default WitnessCard;
