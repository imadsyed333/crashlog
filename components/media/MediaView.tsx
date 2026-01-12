import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, View } from "react-native";
import { Button } from "react-native-paper";
import MediaList from "./MediaList";

const MediaView = () => {
  const { addMedia } = useCollisionFormStore();

  const useCamera = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (!cameraPermission.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access camera is required."
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

  return (
    <View>
      <Button mode="contained" style={styles.button} onPress={useCamera}>
        Take picture
      </Button>
      <MediaList />
    </View>
  );
};

export default MediaView;
