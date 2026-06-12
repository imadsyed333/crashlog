import CollisionDraftButton from "@/components/collisions/CollisionDraftButton";
import MediaGrid from "@/components/media/MediaGrid";
import MediaOptions from "@/components/media/MediaOptions";
import ScreenContainer from "@/components/misc/ScreenContainer";
import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const MediaListScreen = () => {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const router = useRouter();

  const { collision } = useCollisionFormStore();
  const { media } = collision;

  const handlePress = () => {
    if (mode === "edit") {
      router.back();
    } else {
      router.navigate("/collisions/form/vehicleListScreen");
    }
  };
  return (
    <ScreenContainer
      title="Media"
      description="Provide as many photos as you can of the collision."
    >
      <View style={{ flex: 1 }}>
        <MediaOptions />
        <View style={{ flex: 1, marginTop: 10 }}>
          <MediaGrid media={media} showActions={true} />
        </View>
      </View>
      {mode === "edit" ? (
        <Button
          mode="contained"
          style={styles.button}
          onPress={handlePress}
          icon="content-save"
        >
          Save Changes
        </Button>
      ) : (
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginVertical: 10,
          }}
        >
          <CollisionDraftButton
            mode="outlined"
            style={{ flex: 1 }}
            children="Save Draft"
          />
          <Button
            mode="contained"
            style={{ flex: 2 }}
            onPress={handlePress}
            icon="arrow-right"
            contentStyle={{
              flexDirection: "row-reverse",
            }}
          >
            Next
          </Button>
        </View>
      )}
    </ScreenContainer>
  );
};

export default MediaListScreen;
