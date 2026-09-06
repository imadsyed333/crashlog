import { createMediaFromAsset, MediaPayload } from "@/lib/media";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Card } from "react-native-paper";

const MediaOptions = () => {
  const { addMedia, addMediaMany } = useCollisionFormStore();
  const [isAttaching, setIsAttaching] = useState(false);

  const attachAsset = async (asset: ImagePicker.ImagePickerAsset) => {
    try {
      setIsAttaching(true);
      const media = await createMediaFromAsset(asset);
      addMedia(media);
    } catch {
      Alert.alert(
        "Couldn't add media",
        "The selected file could not be attached.",
      );
    } finally {
      setIsAttaching(false);
    }
  };

  const attachAssets = async (assets: ImagePicker.ImagePickerAsset[]) => {
    setIsAttaching(true);
    try {
      const attached: MediaPayload[] = [];
      for (const asset of assets) {
        try {
          attached.push(await createMediaFromAsset(asset));
        } catch {
          // Skip files that fail conversion; attach the rest.
        }
      }

      if (attached.length === 0) {
        Alert.alert(
          "Couldn't add media",
          "None of the selected files could be attached.",
        );
        return;
      }

      addMediaMany(attached);
    } finally {
      setIsAttaching(false);
    }
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
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      await attachAssets(result.assets);
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
            disabled={isAttaching}
          >
            Camera
          </Button>
          <Button
            mode="contained"
            onPress={useMediaLibrary}
            style={{ flex: 1 }}
            icon={"image-multiple"}
            disabled={isAttaching}
            loading={isAttaching}
          >
            Library
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default MediaOptions;
