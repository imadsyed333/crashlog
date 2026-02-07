import CustomDTPicker from "@/components/datetime/CustomDTPicker";
import MediaView from "@/components/media/MediaView";
import ErrorBox from "@/components/misc/ErrorBox";
import { detailsSchema } from "@/lib/schemas";
import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import z from "zod";

type FormErrors = {
  location?: String[];
  description?: String[];
};

const collisionDetailsFormScreen = () => {
  const insets = useSafeAreaInsets();

  const { collision, updateCollisionField } = useCollisionFormStore();

  const { location, description, date } = collision;
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const router = useRouter();

  const handlePress = () => {
    const parse = detailsSchema.safeParse({ location, description });
    if (!parse.success) {
      const errors = z.flattenError(parse.error);
      setFormErrors(errors.fieldErrors);
    } else {
      router.navigate("/collisions/form/vehicleListScreen");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
      }}
    >
      <Stack.Screen
        options={{
          title: "Collision Details",
        }}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          error={!!formErrors.location}
          label={"Location"}
          value={location}
          onChangeText={(text) => {
            updateCollisionField("location", text);
            setFormErrors({
              ...formErrors,
              location: undefined,
            });
          }}
          style={styles.input}
          mode="outlined"
        />
        <ErrorBox errors={formErrors.location} />
        <TextInput
          error={!!formErrors.description}
          label={"Description"}
          multiline={true}
          value={description}
          onChangeText={(text) => {
            updateCollisionField("description", text);
            setFormErrors({
              ...formErrors,
              description: undefined,
            });
          }}
          style={{ ...styles.input, minHeight: 100 }}
          mode="outlined"
        />
        <ErrorBox errors={formErrors.description} />
        <View
          style={{
            marginTop: 10,
          }}
        >
          <MediaView />
        </View>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <CustomDTPicker />
        </View>
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={handlePress}
        icon={"arrow-right"}
        contentStyle={{
          flexDirection: "row-reverse",
        }}
      >
        Next
      </Button>
    </View>
  );
};

export default collisionDetailsFormScreen;
