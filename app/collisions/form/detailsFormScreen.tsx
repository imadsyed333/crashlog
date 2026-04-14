import CustomDTPicker from "@/components/datetime/CustomDTPicker";
import ErrorBox from "@/components/misc/ErrorBox";
import ScreenContainer from "@/components/misc/ScreenContainer";
import { detailsSchema } from "@/lib/schemas";
import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import z from "zod";

import * as Location from "expo-location";

type FormErrors = {
  location?: String[];
  description?: String[];
};

const DetailsFormScreen = () => {
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
        router.navigate("/collisions/form/mediaListScreen");
      }
    }
  };

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        Alert.alert(
          "Permission required",
          "Permission to access location is required.",
        );
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({});

      const geocode = await Location.reverseGeocodeAsync(locationData.coords);

      updateCollisionField("location", {
        description: geocode[0]
          ? `${geocode[0].name}, ${geocode[0].city}, ${geocode[0].region}`
          : "",
        coordinates: {
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        },
      });
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <ScreenContainer
      title="Details"
      description="Provide as much detail as possible about the collision."
      backButton
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <TextInput
          error={!!formErrors.location}
          label={"Where are you?"}
          value={location.description}
          onChangeText={(text) => {
            updateCollisionField("location", {
              ...location,
              description: text,
            });
            setFormErrors({
              ...formErrors,
              location: undefined,
            });
          }}
          style={styles.input}
          mode="flat"
          right={<TextInput.Icon icon="map-marker" onPress={fetchLocation} />}
        />
        <ErrorBox errors={formErrors.location} />
        <TextInput
          error={!!formErrors.description}
          label={"What happened?"}
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

export default DetailsFormScreen;
