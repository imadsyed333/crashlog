import { styles } from "@/lib/themes";
import React, { useCallback } from "react";
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
  const renderInput = useCallback(
    (props: any) => (
      <MaskedTextInput {...props} mask={mask} keyboardType={keyboardType} />
    ),
    [mask, keyboardType],
  );

  return (
    <TextInput
      label={label}
      error={error}
      value={value}
      mode="flat"
      style={styles.input}
      onChangeText={onChangeText}
      render={renderInput}
    />
  );
};

export default CustomMaskedInput;
