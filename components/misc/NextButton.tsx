import { styles } from "@/lib/themes";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Button } from "react-native-paper";

type NextButtonProps = {
  href: Href;
};

const NextButton = ({ href }: NextButtonProps) => {
  const router = useRouter();
  return (
    <Button
      mode="contained"
      style={styles.button}
      onPress={() => router.navigate(href)}
      icon={"arrow-right"}
      contentStyle={{
        flexDirection: "row-reverse",
      }}
    >
      Next
    </Button>
  );
};

export default NextButton;
