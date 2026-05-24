import React from "react";
import { Modal, View } from "react-native";
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
    <Modal visible={isDialogVisible} onRequestClose={onClose}>
      <View>{message}</View>
      <View>
        <Button onPress={onClose}>No</Button>
        <Button onPress={onSuccess}>Yes</Button>
      </View>
    </Modal>
  );
};

export default CustomAlertDialog;
