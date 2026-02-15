import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-paper";

type CustomAlertDialogProps = {
  message: string;
  onSuccess: () => void;
  onClose: () => void;
  isDialogVisible: boolean;
};

const CustomAlertDialog = ({
  message,
  onSuccess,
  isDialogVisible,
  onClose,
}: CustomAlertDialogProps) => {
  return (
    <Modal isVisible={isDialogVisible} onBackdropPress={onClose}>
      <View>{message}</View>
      <View>
        <Button>No</Button>
        <Button onPress={onSuccess}>yes</Button>
      </View>
    </Modal>
  );
};

export default CustomAlertDialog;
