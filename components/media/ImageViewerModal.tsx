import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";

type ImageViewerModalProps = {
  uri: string;
  visible: boolean;
  onClose: () => void;
};

const { width, height } = Dimensions.get("window");

const ImageViewerModal = ({ uri, visible, onClose }: ImageViewerModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <Image source={{ uri }} style={styles.image} resizeMode="contain" />
        <IconButton
          icon="close"
          iconColor="white"
          size={24}
          style={styles.closeButton}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width,
    height,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default ImageViewerModal;
