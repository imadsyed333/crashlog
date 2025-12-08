import { styles } from "@/themes";
import React from "react";
import { Text } from "react-native-paper";

const ErrorBox = ({ errors }: { errors: String[] | undefined }) => {
  return <>{errors && <Text style={styles.errorbox}>{errors?.at(0)}</Text>}</>;
};

export default ErrorBox;
