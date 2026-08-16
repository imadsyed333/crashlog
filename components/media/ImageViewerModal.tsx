import { MediaType } from "@/lib/types";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect } from "react";
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
  type?: MediaType;
  visible: boolean;
  onClose: () => void;
};

const { width, height } = Dimensions.get("window");

const VideoPlayerContent = ({
  uri,
  visible,
}: {
  uri: string;
  visible: boolean;
}) => {
  const player = useVideoPlayer(uri, (p) => {
    p.loop = false;
  });

  useEffect(() => {
    if (visible) {
      player.play();
    } else {
      player.pause();
    }
  }, [visible, player]);

  return (
    <VideoView
      style={styles.media}
      player={player}
      allowsFullscreen
      contentFit="contain"
      nativeControls
    />
  );
};

const ImageViewerModal = ({
  uri,
  type = "image",
  visible,
  onClose,
}: ImageViewerModalProps) => {
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
        {type === "video" ? (
          visible ? <VideoPlayerContent uri={uri} visible={visible} /> : null
        ) : (
          <Image source={{ uri }} style={styles.media} resizeMode="contain" />
        )}
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
  media: {
    width,
    height,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
});

export default ImageViewerModal;
