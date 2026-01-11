import { styles } from "@/lib/themes";
import React from "react";
import { FAB } from "react-native-paper";

type CustomFABProps = {
  handlePress: () => void;
};

const CustomFAB = ({ handlePress }: CustomFABProps) => {
  return (
    <FAB icon={"plus"} style={styles.fab} onPress={handlePress} mode="flat" />
  );
};

export default CustomFAB;
