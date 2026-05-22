import React from "react";
import { KeyboardAvoidingView, Modal, Platform, View } from "react-native";
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
      visible={isVisible}
      onRequestClose={onClose}
      animationType="fade"
      transparent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: theme.colors.backdrop,
          padding: 10,
        }}
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
