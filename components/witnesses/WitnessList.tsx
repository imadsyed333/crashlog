import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { View } from "react-native";
import { Card, Icon, IconButton, Text, useTheme } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import WitnessCard from "./WitnessCard";

const WitnessList = () => {
  const { collision, deleteWitness } = useCollisionFormStore();
  const { witnesses } = collision;
  const theme = useTheme();

  return (
    <>
      {witnesses.length > 0 && (
        <SwipeListView
          data={witnesses}
          renderItem={({ item, index }) => (
            <WitnessCard witness={item} index={index} showActions />
          )}
          renderHiddenItem={({ item }) => (
            <View
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <IconButton
                icon={"delete"}
                onPress={() => deleteWitness(item.id)}
                mode="contained"
                size={30}
                iconColor={theme.colors.error}
              />
            </View>
          )}
          style={{
            display: "flex",
            width: "100%",
            padding: 10,
          }}
          rightOpenValue={-75}
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
    </>
  );
};

export default WitnessList;
