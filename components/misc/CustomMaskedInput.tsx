import React from "react";
import { KeyboardTypeOptions } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { TextInput } from "react-native-paper";

type CustomMaskedInputProps = {
  label: string;
  error: boolean;
  value: string;
  onChangeText: (text: string) => void;
  mask: string;
  keyboardType?: KeyboardTypeOptions;
};

const CustomMaskedInput = ({
  label,
  error,
  value,
  onChangeText,
  mask,
  keyboardType = "default",
}: CustomMaskedInputProps) => {
  return (
    <TextInput
      label={label}
      error={error}
      value={value}
      mode="outlined"
      onChangeText={onChangeText}
      render={(props) => (
        <MaskedTextInput
          {...props}
          mask={mask}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      )}
    />
  );
};

export default CustomMaskedInput;
