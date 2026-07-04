import React from "react";
import { View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import CustomModal from "./CustomModal";

type CustomAlertDialogProps = {
  title: string;
  message: string;
  onSuccess: () => void;
  onCancel?: () => void;
  isDialogVisible: boolean;
  isInfo?: boolean;
};

const CustomAlertDialog = ({
  title,
  message,
  onSuccess,
  isDialogVisible,
  onCancel = () => {},
  isInfo = false,
}: CustomAlertDialogProps) => {
  return (
    <CustomModal isVisible={isDialogVisible} onClose={onCancel}>
      <Text
        variant="titleLarge"
        style={{ fontWeight: "600", marginHorizontal: 6, marginBottom: 10 }}
      >
        {title}
      </Text>
      <Divider bold />
      <Text
        variant="bodyMedium"
        style={{
          marginHorizontal: 6,
          marginTop: 12,
          lineHeight: 20,
          opacity: 0.8,
        }}
      >
        {message}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 20,
          marginBottom: 14,
        }}
      >
        {!isInfo && (
          <Button onPress={onCancel} mode="outlined">
            No
          </Button>
        )}
        <Button onPress={onSuccess} mode="contained">
          {isInfo ? "Ok" : "Yes"}
        </Button>
      </View>
    </CustomModal>
  );
};

export default CustomAlertDialog;
