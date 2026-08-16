import { createMediaFromAsset } from "@/lib/media";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, View } from "react-native";
import { Button, Card } from "react-native-paper";

const MediaOptions = () => {
  const { addMedia } = useCollisionFormStore();

  const attachAsset = async (asset: ImagePicker.ImagePickerAsset) => {
    const media = await createMediaFromAsset(asset);
    addMedia(media);
  };

  const useCamera = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (!cameraPermission.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access camera is required.",
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images", "videos"],
    });

    if (!result.canceled) {
      await attachAsset(result.assets[0]);
    }
  };

  const useMediaLibrary = async () => {
    const mediaPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!mediaPermission.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
    });

    if (!result.canceled) {
      await attachAsset(result.assets[0]);
    }
  };

  return (
    <Card mode="contained">
      <Card.Content>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            mode="contained"
            onPress={useCamera}
            icon={"camera"}
            style={{ flex: 1, marginRight: 10 }}
          >
            Camera
          </Button>
          <Button
            mode="contained"
            onPress={useMediaLibrary}
            style={{ flex: 1 }}
            icon={"image-multiple"}
          >
            Library
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default MediaOptions;
