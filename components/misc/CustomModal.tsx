import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "react-native-paper";

type CustomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const CustomModal = ({ isVisible, onClose, children }: CustomModalProps) => {
  const theme = useTheme();
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn={"fadeInUp"}
      animationOut={"fadeOutDown"}
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View
          style={{
            paddingTop: 10,
            borderRadius: 10,
            paddingHorizontal: 10,
            backgroundColor: theme.colors.background,
          }}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CustomModal;
