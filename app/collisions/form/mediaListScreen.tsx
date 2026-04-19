import MediaView from "@/components/media/MediaView";
import ScreenContainer from "@/components/misc/ScreenContainer";
import { styles } from "@/lib/themes";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const MediaListScreen = () => {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const router = useRouter();

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
        <MediaView />
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={handlePress}
        icon={mode === "edit" ? "content-save" : "arrow-right"}
        contentStyle={{
          flexDirection: mode === "edit" ? "row" : "row-reverse",
        }}
      >
        {mode === "edit" ? "Save Changes" : "Next"}
      </Button>
    </ScreenContainer>
  );
};

export default MediaListScreen;
