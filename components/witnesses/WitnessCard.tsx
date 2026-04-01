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
  showActions = true,
}: WitnessCardProps) => {
  const { name, phoneNumber, address } = witness;
  const { setForm, setEdit, setDialogVisible } = useWitnessFormStore();
  const theme = useTheme();
  return (
    <Card style={{ marginBottom: 10 }} mode="contained">
      <Card.Content style={{ paddingBottom: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text variant="titleLarge" style={{ fontWeight: 600 }}>
              Witness {index + 1}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
              dataDetectorType={"phoneNumber"}
            >
              {name}
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
        <Divider bold style={{ marginTop: 10, marginBottom: 10 }} />
        <View
          style={{
            paddingVertical: 2,
          }}
        >
          <Text
            variant="bodyLarge"
            style={{ marginBottom: 6 }}
            dataDetectorType={"phoneNumber"}
          >
            <Text style={styles.boldText}>Phone Number: </Text>
            {phoneNumber}
          </Text>
          <Text variant="bodyLarge">
            <Text style={styles.boldText}>Address: </Text>
            {address}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default WitnessCard;
