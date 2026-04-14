import { styles } from "@/lib/themes";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Button } from "react-native-paper";

type NextButtonProps = {
  href: Href;
  mode?: "edit" | "create";
};

const NextButton = ({ href, mode }: NextButtonProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (mode === "edit") {
      router.back();
      return;
    }
    router.navigate(href);
  };
  return (
    <Button
      mode="contained"
      style={styles.button}
      onPress={handlePress}
      icon={mode === "edit" ? "content-save" : "arrow-right"}
      contentStyle={{
        flexDirection: mode === "edit" ? "row" : "row-reverse",
      }}
    >
      {mode === "edit" ? "Save Changes" : "Next"}
    </Button>
  );
};

export default NextButton;
