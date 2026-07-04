import CollisionInfoView from "@/components/collisions/CollisionInfoView";
import ScreenContainer from "@/components/misc/ScreenContainer";
import { generateCollisionPDF } from "@/lib/utils";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button, Card, Icon, Text, useTheme } from "react-native-paper";

type SearchParamType = {
  collisionId: string;
};

const viewCollisionScreen = () => {
  const { collisionId } = useLocalSearchParams<SearchParamType>();
  const { getCollision } = useCollisionStore();
  const { setForm, setEdit } = useCollisionFormStore();
  let collision = getCollision(collisionId);

  const router = useRouter();
  const theme = useTheme();

  const handlePress = () => {
    if (collision) {
      router.navigate("/collisions/form/reviewScreen");
      setForm(collision);
      setEdit(true);
    } else {
      router.back();
    }
  };

  const exportPDF = async () => {
    if (collision) {
      await generateCollisionPDF(collision);
    }
  };
  return (
    <ScreenContainer
      title={collision ? "View Collision" : "Collision Not Found"}
    >
      {!collision && (
        <Card mode="contained" style={{ marginBottom: 10 }}>
          <Card.Content style={{ alignItems: "center", padding: 24 }}>
            <Icon source="car-off" size={48} color={theme.colors.primary} />
            <Text
              variant="titleLarge"
              style={{ marginTop: 16, marginBottom: 8, fontWeight: "600" }}
            >
              Collision not found
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
              This collision could not be found. It may have been deleted.
            </Text>
            <Text
              variant="bodySmall"
              style={{
                textAlign: "center",
                opacity: 0.6,
                fontStyle: "italic",
              }}
            >
              Tap the button below to return to your collisions list
            </Text>
          </Card.Content>
        </Card>
      )}
      {!collision && (
        <Button mode="contained" onPress={() => router.back()}>
          Go Back
        </Button>
      )}
      {collision && <CollisionInfoView collision={collision} />}
      {collision && (
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginVertical: 10,
          }}
        >
          <Button
            mode="outlined"
            style={{ flex: 1 }}
            onPress={exportPDF}
            icon={"file-export"}
          >
            Export PDF
          </Button>
          <Button
            mode="contained"
            style={{ flex: 2 }}
            onPress={handlePress}
            icon={"pencil"}
          >
            Edit
          </Button>
        </View>
      )}
    </ScreenContainer>
  );
};

export default viewCollisionScreen;
