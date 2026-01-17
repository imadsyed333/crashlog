import { styles } from "@/lib/themes";
import React from "react";
import { FAB } from "react-native-paper";

type CustomFABProps = {
  handlePress: () => void;
  icon: string;
  label?: string;
};

const CustomFAB = ({ handlePress, icon, label }: CustomFABProps) => {
  return (
    <FAB
      icon={icon}
      style={styles.fab}
      onPress={handlePress}
      mode="flat"
      label={label}
    />
  );
};

export default CustomFAB;
