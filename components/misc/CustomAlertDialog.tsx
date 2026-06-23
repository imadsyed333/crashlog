import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import CustomModal from "./CustomModal";

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
    <CustomModal isVisible={isDialogVisible} onClose={onClose}>
      <Text
        variant="bodyLarge"
        style={{
          marginLeft: 10,
          paddingTop: 5,
        }}
      >
        {message}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginVertical: 10,
        }}
      >
        <Button onPress={onClose} mode="contained" style={{ marginRight: 5 }}>
          No
        </Button>
        <Button onPress={onSuccess} mode="contained">
          Yes
        </Button>
      </View>
    </CustomModal>
  );
};

export default CustomAlertDialog;
