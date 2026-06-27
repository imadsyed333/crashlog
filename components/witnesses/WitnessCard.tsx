import { styles } from "@/lib/themes";
import { Witness } from "@/lib/types";
import { useWitnessFormStore } from "@/store/witnessFormStore";
import React from "react";
import { View } from "react-native";
import { Card, Divider, IconButton, Text, useTheme } from "react-native-paper";

type WitnessCardProps = {
  witness: Witness;
  index: number;
  showActions?: boolean;
};
const WitnessCard = ({
  witness,
  index,
  showActions = false,
}: WitnessCardProps) => {
  const { name, phoneNumber, address } = witness;
  const { setForm, setEdit, setDialogVisible } = useWitnessFormStore();
  const theme = useTheme();
  return (
    <Card style={{ marginBottom: 10 }} mode="contained">
      <Card.Content style={{ paddingBottom: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 6,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text variant="titleLarge" style={{ fontWeight: 600 }}>
              Witness {index + 1}
            </Text>
          </View>
          {showActions && (
            <IconButton
              icon={"pencil"}
              onPress={() => {
                setForm(witness);
                setDialogVisible(true);
                setEdit(true);
              }}
              size={20}
              style={{ margin: 0 }}
            />
          )}
        </View>
        <Divider bold style={{ marginTop: 8, marginBottom: 8 }} />
        <View>
          <Text variant="bodyMedium" style={{ marginBottom: 4 }}>
            <Text style={styles.boldText}>Name: </Text>
            {name}
          </Text>
          <Text variant="bodyMedium" style={{ marginBottom: 4 }}>
            <Text style={styles.boldText}>Address: </Text>
            {address}
          </Text>
          <Text variant="bodyMedium" dataDetectorType={"phoneNumber"}>
            <Text style={styles.boldText}>Phone Number: </Text>
            {phoneNumber}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default WitnessCard;
