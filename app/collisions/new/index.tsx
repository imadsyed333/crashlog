import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

const Index = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());

  return (
    <View>
      <TextInput
        label={"Location"}
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
    </View>
  );
};

export default Index;
