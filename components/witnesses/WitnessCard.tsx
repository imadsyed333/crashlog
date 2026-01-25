import { styles } from "@/lib/themes";
import { Witness } from "@/lib/types";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import React from "react";
import { View } from "react-native";
import { Card, Divider, IconButton, Text } from "react-native-paper";

type WitnessCardProps = {
  witness: Witness;
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
  return (
    <Card style={{ marginBottom: 10 }} mode="outlined">
      <Card.Content style={{ paddingBottom: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text variant="titleLarge">Witness {index + 1}</Text>
          {showActions && (
            <IconButton
              icon={"pencil"}
              onPress={() => {
                setForm(witness);
                setDialogVisible(true);
                setEdit(true);
              }}
              size={20}
            />
          )}
        </View>
        <Divider bold style={{ marginBottom: 10 }} />
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
    </Card>
  );
};

export default WitnessCard;
