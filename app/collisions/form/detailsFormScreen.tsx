import CustomDTPicker from "@/components/datetime/CustomDTPicker";
import MediaView from "@/components/media/MediaView";
import ErrorBox from "@/components/misc/ErrorBox";
import ScreenContainer from "@/components/misc/ScreenContainer";
import { detailsSchema } from "@/lib/schemas";
import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import z from "zod";

type FormErrors = {
  location?: String[];
  description?: String[];
};

const collisionDetailsFormScreen = () => {
  const { collision, updateCollisionField } = useCollisionFormStore();

  const { location, description } = collision;
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const router = useRouter();

  const { mode } = useLocalSearchParams<{ mode?: string }>();

  const handlePress = () => {
    const parse = detailsSchema.safeParse({ location, description });
    if (!parse.success) {
      const errors = z.flattenError(parse.error);
      setFormErrors(errors.fieldErrors);
    } else {
      if (mode === "edit") {
        router.back();
      } else {
        router.navigate("/collisions/form/vehicleListScreen");
      }
    }
  };

  return (
    <ScreenContainer title="Details" backButton>
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
          mode="flat"
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
          mode="flat"
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
        icon={mode === "edit" ? "content-save" : "arrow-right"}
        contentStyle={{
          flexDirection: mode === "edit" ? "row" : "row-reverse",
        }}
      >
        {mode === "edit" ? "Save Changes" : "Next"}
      </Button>
    </ScreenContainer>
  );
};

export default collisionDetailsFormScreen;
