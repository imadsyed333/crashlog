import React from "react";
import { Text, useTheme } from "react-native-paper";

const ErrorBox = ({ errors }: { errors: String[] | undefined }) => {
  const paperTheme = useTheme();
  return <>{errors && <Text style={{
    color: paperTheme.colors.error,
  }}>{errors?.at(0)}</Text>}</>;
};

export default ErrorBox;
