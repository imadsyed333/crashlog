import { useCollisionFormStore } from "@/store/collisionFormStore";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, View } from "react-native";
import { Button } from "react-native-paper";
import MediaList from "./MediaList";
const MediaView = () => {
  const { addMedia, collision } = useCollisionFormStore();
  const { media } = collision;

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
      mediaTypes: ["images"],
    });

    if (!result.canceled) {
      addMedia(result.assets[0].uri);
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
      mediaTypes: ["images"],
    });

    if (!result.canceled) {
      addMedia(result.assets[0].uri);
    }
  };

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
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
          Photo Library
        </Button>
      </View>
      <MediaList showActions={true} media={media} />
    </View>
  );
};

export default MediaView;
