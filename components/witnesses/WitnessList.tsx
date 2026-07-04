import { useCollisionFormStore } from "@/store/collisionFormStore";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";
import CustomAlertDialog from "../misc/CustomAlertDialog";
import WitnessCard from "./WitnessCard";

const WitnessList = () => {
  const { collision, deleteWitness } = useCollisionFormStore();
  const { witnesses } = collision;
  const theme = useTheme();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  return (
    <>
      {witnesses.length > 0 && (
        <FlatList
          data={witnesses}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <WitnessCard
              witness={item}
              index={index}
              showActions
              onDelete={() => setPendingDeleteId(item.id)}
            />
          )}
          style={{ display: "flex", width: "100%" }}
        />
      )}
      {witnesses.length === 0 && (
        <Card mode="contained" style={{ marginBottom: 10 }}>
          <Card.Content style={{ alignItems: "center", padding: 24 }}>
            <Icon
              source="account-group"
              size={48}
              color={theme.colors.primary}
            />
            <Text
              variant="titleLarge"
              style={{ marginTop: 16, marginBottom: 8, fontWeight: "600" }}
            >
              No witnesses added
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                marginBottom: 8,
                textAlign: "center",
                opacity: 0.7,
                lineHeight: 20,
              }}
            >
              You haven't added any witnesses to this collision yet.
            </Text>
            <Text
              variant="bodySmall"
              style={{
                textAlign: "center",
                opacity: 0.6,
                fontStyle: "italic",
              }}
            >
              When needed, tap the + button below to add witness information
            </Text>
          </Card.Content>
        </Card>
      )}
      <CustomAlertDialog
        title="Delete Witness"
        message="Are you sure you want to delete this witness?"
        isDialogVisible={pendingDeleteId !== null}
        onSuccess={() => {
          if (pendingDeleteId) deleteWitness(pendingDeleteId);
          setPendingDeleteId(null);
        }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </>
  );
};

export default WitnessList;
